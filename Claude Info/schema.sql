-- ============================================================
-- Golf Scorecard & Handicap Tracker — Database Schema
-- Target: Supabase (Postgres)
-- ============================================================

-- ------------------------------------------------------------
-- profiles
-- Extends Supabase's built-in auth.users with app-specific data.
-- handicap_index is a DENORMALIZED/calculated field — it is
-- recomputed by application logic (see differentialAvg), not
-- entered directly by the user.
-- ------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  handicap_index numeric(4,1),
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- courses
-- Minimal, user-contributed course data for MVP.
-- No third-party course API in v1 — deliberate scoping decision
-- to avoid external API cost/rate-limit/reliability dependency.
-- ------------------------------------------------------------
create table courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- tees
-- A course has many tees; rating/slope belong HERE, not on
-- courses, because they vary by tee played (blue/white/red...).
-- The handicap formula reads rating/slope from the specific tee.
-- ------------------------------------------------------------
create table tees (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade not null,
  name text not null,               -- e.g. "Blue", "White"
  course_rating numeric(4,1) not null,
  slope_rating int not null check (slope_rating between 55 and 155),
  par int not null
);

-- ------------------------------------------------------------
-- rounds
-- One row per round played.
-- total_score and score_differential are denormalized (computed
-- at save time) for fast list-view reads, since recomputing from
-- 18 hole rows every time would be wasteful — especially since
-- handicap calc repeatedly reads historical differentials.
-- ------------------------------------------------------------
create table rounds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  tee_id uuid references tees(id) not null,
  date_played date not null,
  photo_url text,                   -- Supabase Storage reference
  total_score int,
  score_differential numeric(5,2),
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- holes
-- 18 rows per round (or 9 for a 9-hole round — combination logic
-- for 9-hole rounds is deferred to a later version).
--
-- fir is NULLABLE: FIR doesn't apply on par-3 holes.
-- gir is NOT NULL: GIR applies on every hole regardless of par.
-- This encodes the domain rule directly in the schema rather than
-- relying on application code to remember it.
-- ------------------------------------------------------------
create table holes (
  id uuid primary key default gen_random_uuid(),
  round_id uuid references rounds(id) on delete cascade not null,
  hole_number int not null check (hole_number between 1 and 18),
  par int not null check (par between 3 and 5),
  score int not null check (score > 0),
  putts int not null check (putts >= 0),
  fir boolean,      -- nullable: not applicable on par-3s
  gir boolean not null,
  unique (round_id, hole_number)
);

-- ============================================================
-- Row Level Security (RLS)
-- Required — Supabase exposes tables directly to the client.
-- Without RLS, any authenticated user could query another
-- user's rounds/holes.
-- ============================================================

-- ---------------- rounds ----------------
alter table rounds enable row level security;

create policy "Users can view their own rounds"
  on rounds for select
  using (auth.uid() = user_id);

create policy "Users can insert their own rounds"
  on rounds for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own rounds"
  on rounds for update
  using (auth.uid() = user_id);

create policy "Users can delete their own rounds"
  on rounds for delete
  using (auth.uid() = user_id);

-- ---------------- holes ----------------
-- holes has no user_id column directly — ownership is checked
-- through the parent round.
alter table holes enable row level security;

create policy "Users can view holes on their own rounds"
  on holes for select
  using (
    exists (
      select 1 from rounds
      where rounds.id = holes.round_id
      and rounds.user_id = auth.uid()
    )
  );

create policy "Users can insert holes on their own rounds"
  on holes for insert
  with check (
    exists (
      select 1 from rounds
      where rounds.id = holes.round_id
      and rounds.user_id = auth.uid()
    )
  );

create policy "Users can update holes on their own rounds"
  on holes for update
  using (
    exists (
      select 1 from rounds
      where rounds.id = holes.round_id
      and rounds.user_id = auth.uid()
    )
  );

create policy "Users can delete holes on their own rounds"
  on holes for delete
  using (
    exists (
      select 1 from rounds
      where rounds.id = holes.round_id
      and rounds.user_id = auth.uid()
    )
  );

-- ---------------- courses / tees ----------------
-- Shared, mostly-read data: any authenticated user should be
-- able to view any course/tee; only the creator can modify.
alter table courses enable row level security;

create policy "Any authenticated user can view courses"
  on courses for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can create courses"
  on courses for insert
  with check (auth.role() = 'authenticated');

create policy "Only creator can update their course"
  on courses for update
  using (auth.uid() = created_by);

alter table tees enable row level security;

create policy "Any authenticated user can view tees"
  on tees for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can create tees"
  on tees for insert
  with check (auth.role() = 'authenticated');

-- ---------------- profiles ----------------
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);
