# Project Summary: Golf Scorecard & Handicap Tracker

## The idea
A mobile app where a golfer photographs their scorecard after a round, enters
per-hole data (score, putts, FIR, GIR), and the app automatically tracks stats
and calculates their handicap index over time — no manual spreadsheet tracking
needed.

## Stack
- **Frontend:** React Native + Expo (stretch goal — new to the developer)
- **Language:** TypeScript (stretch goal — shared types between client and backend)
- **Backend:** Node/Express (existing comfort zone) — used specifically for
  domain logic like the handicap calculation, not general CRUD
- **Database/Auth/Storage:** Supabase (existing comfort zone) — handles auth,
  Postgres data, and scorecard photo storage, with Row Level Security locking
  data to each user

## Key scoping decisions (already made, don't re-litigate)
- **MVP is manual data entry, not OCR.** The photo is captured/stored, but
  per-hole data entry is a fast manual form. OCR-assisted pre-fill is an
  explicit v2 stretch goal. This was the single biggest technical risk
  identified early, and was deliberately de-risked out of v1.
- **PCC (Playing Conditions Calculation) is hardcoded to 0.** It requires
  pooled same-day scoring data across a course that only the official WHS
  system has access to. This is a documented, explicit simplification
  (should be noted in the README / an in-app disclaimer).
- **Course rating/slope are user-entered per course/tee** — no third-party
  course API in v1, to stay independent of external API cost/reliability.
- **9-hole round combination logic is deferred** to a later version.

## Milestones (vertical slices — app should always be demoable)
1. Hardcoded single round, no auth/DB — manual 18-hole entry screen, see
   computed FIR%/GIR%/avg putts on screen. Proves core calc + UI flow.
2. Persistence — Supabase DB, save/load real rounds, round history list.
3. Handicap calculation wired in for real (module already built — see below).
4. Auth — Supabase auth, data scoped per user.
5. Photo capture — camera/upload, photo stored alongside the round (still
   manual data entry).
6. Polish — trends dashboard, charts, stretch: OCR pre-fill.

## Database schema (finalized — see schema.sql)
`profiles` → `courses` → `tees` (rating/slope live here, since they vary by
tee, not by course) → `rounds` → `holes`.

Notable schema decisions:
- `holes.fir` is **nullable** (FIR doesn't apply on par-3s); `holes.gir` is
  **not null** (GIR applies on every hole). This bakes the domain rule into
  the schema itself rather than relying on application code to remember it.
- `rounds.total_score` and `rounds.score_differential` are denormalized
  (computed at save time) for fast list-view reads, since the handicap calc
  repeatedly needs historical differentials.
- Row Level Security is enabled on all user-data tables — `rounds`/`holes`
  are scoped to `auth.uid()` (holes via a join through rounds, since holes
  has no direct user_id column); `courses`/`tees` are shared/readable by any
  authenticated user, writable mainly by creator.

**schema.sql (attached/downloaded) contains the full, ready-to-run SQL,
including all RLS policies.**

## Handicap algorithm — status: verified correct
Two functions, already written and reviewed line-by-line against the
**official USGA/R&A WHS rules** (fetched directly from primary sources, not
paraphrased blog posts):

- `scoreDifferential(slopeRating, grossScore, courseRating)` — computes
  `113/slope × (gross score − course rating − PCC)`, with PCC hardcoded to 0.
  Throws on invalid slope (must be 55–155 inclusive) or implausible input.
- `differentialAvg(differentials: number[])` — implements the full official
  WHS sliding-scale table for 3–20+ rounds. Verified band-by-band against the
  primary rule table:

  | Rounds | Differentials used | Adjustment |
  |---|---|---|
  | 3 | Lowest 1 | −2.0 |
  | 4 | Lowest 1 | −1.0 |
  | 5 | Lowest 1 | 0 |
  | 6 | Lowest 2 (avg) | −1.0 |
  | 7–8 | Lowest 2 (avg) | 0 |
  | 9–11 | Lowest 3 (avg) | 0 |
  | 12–14 | Lowest 4 (avg) | 0 |
  | 15–16 | Lowest 5 (avg) | 0 |
  | 17–18 | Lowest 6 (avg) | 0 |
  | 19 | Lowest 7 (avg) | 0 |
  | 20 | Lowest 8 (avg) | 0 |

  **Important:** there is NO `0.96` multiplier in the current WHS formula —
  that was a leftover from the pre-2020 handicap system. Multiple secondary
  sources incorrectly still cite it; the primary USGA rule text does not.
  This was caught by verifying against the primary source, not a calculator
  site — good to remember if extending this logic further.

Two bugs already found and fixed during development (worth knowing so they
aren't reintroduced):
- A broken `.sort((a,b) => a + b)` comparator that "passed" testing only
  because the test array happened to already be sorted ascending — a good
  reminder to always test sort logic with shuffled/unsorted input.
- Mutable module-level global array (`roundsArray`) was removed in favor of
  pure functions with no side effects.

## Remaining to-dos on the algorithm (not yet done)
1. Fix two stale test comments (`testArrayFourteen` expected `2.4`, should be
   `2.5`; `testArrayTwenty` expected `4.3`, should be `4.5` — both were stale
   from before the `0.96` multiplier was removed).
2. Make error handling consistent — `differentialAvg` currently `return`s an
   `Error` object for `< 3` rounds, while `scoreDifferential` `throw`s.
   Standardize on `throw` for both.
3. Convert the `console.log` manual checks into real Jest unit tests — one
   per band in the table above, plus boundary edges (19 vs. 20 rounds).
4. Add a JSDoc note on `differentialAvg` documenting that it expects the
   caller to have already filtered to the **most recent 20 rounds** — the
   function itself does not do this windowing. The Supabase query that
   fetches rounds will need `ORDER BY date_played DESC LIMIT 20`.

## Next milestone to start
Scaffold the Expo project for **Milestone 1**: a single screen with manual
18-hole entry (par, score, putts, FIR, GIR per hole), no auth/DB yet, that
displays computed FIR%/GIR%/avg putts using the already-built (and soon to
be Jest-tested) handicap module.
