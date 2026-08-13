Updated scope decisions (v1)

9 vs 18 hole selection happens at round start, before tracking begins — this is now a first-class part of the round-tracking flow, not an edge case.
9-hole rounds count toward stat tracking (FIR%, GIR%, avg putts) same as 18-hole rounds.
9-hole rounds do NOT count toward the handicap differential pool until paired.
Pairing rule: a pending 9 auto-pairs with the next 9-hole round submitted — no user choice, FIFO by submission order. Simple, no UI needed for it.
Pending 9s are visible to the user in their own "Pending" tab/section, not hidden.
The actual combination/pairing algorithm itself is deferred to v2. For now, 9-hole rounds simply sit excluded from the handicap pool — no combination math gets written yet.
Schema changes (holes_played, pending/eligible status) are intentionally deferred until you're building the actual save/persistence workflow (Milestone 2), rather than designed in the abstract right now. Good call — that's a decision better made with the real save flow in front of you than speculatively now.


Milestone 3 changes:
Where things stand and what's next
Before we move to Milestone 1, one loose thread from the JSDoc conversation: you asked "should I fix the function" and we concluded — correctly, I think — that the windowing logic belongs upstream in the Supabase query, not in differentialAvg itself. That means there's an implicit to-do sitting in your Milestone 3 scope now: make sure ORDER BY date_played DESC LIMIT 20 actually gets written when you build that query, or this whole conversation was just documentation of a bug you're planning to introduce anyway. Worth jotting that down somewhere (even just a comment in your project notes) so it isn't lost between now and Milestone 3.