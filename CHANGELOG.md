# Changelog

## Production polish pass — 2026-07-13

Focused polish across UX, accessibility, responsiveness, and form validation.
No changes to authentication logic, database schema, or existing behavior.

### Landing page (`src/routes/index.tsx`)
- Added a "Skip to content" link for keyboard users, targeted at a new `<main id="main">` landmark wrapping all page sections (single `<main>` per page, WCAG landmark compliance).
- Added `aria-label="Primary"` to the top nav.
- Hero `<h1>` now scales from `32px` on small phones (320–375px) up to `52px` on desktop, preventing overflow on narrow screens.
- Hid the redundant "Sign in" button on very small widths so the header no longer wraps.

### Auth page (`src/routes/auth.tsx`)
- Added Zod validation with distinct `signinSchema` / `signupSchema`.
- Inline field-level error messages with `aria-invalid`, `aria-describedby`, and `role="alert"` for screen readers.
- Password placeholder now reflects the mode ("At least 8 characters" only for signup).
- Removed HTML5 `required`/`minLength` in favor of the richer Zod messaging; added `noValidate` to the form.
- Fixed the mode-switch button — added `type="button"` so it can no longer accidentally submit the form.
- Errors clear automatically when switching between sign-in and sign-up.

### Applications (`src/routes/_authenticated/applications.tsx`)
- Header rebuilt with the responsive `grid-cols-[minmax(0,1fr)_auto]` + `min-w-0` + `shrink-0` pattern so long titles truncate cleanly at 320px instead of pushing the Add button off-screen.
- Title scales `text-xl` → `text-2xl` at `sm`.
- "Add application" collapses to "Add" on the smallest widths.

### Dashboard (`src/routes/_authenticated/dashboard.tsx`)
- Same responsive header treatment as Applications (truncate + shrink-0 CTA).
- CTA copy tightened to fit tight widths.

### Existing production-quality features (verified, unchanged)
- Loading skeletons on Dashboard KPIs, funnel, status distribution, upcoming deadlines, recent activity.
- Loading skeletons on Applications list and Resume history.
- Empty states on Dashboard (no applications), Applications (no results / no filters match), Resume (no saved comparisons).
- Error states with retry on Dashboard and Applications queries.
- Delete confirmation dialog on Applications with descriptive body.
- Accessible icon-only buttons across the sidebar footer and Applications row (aria-label + title).
- Focus-visible rings on the sidebar logo link, mode-switch links, and history cards.
- Route-level protection via `_authenticated/route.tsx` beforeLoad.

### Quality checks
- `tsgo --noEmit` — passes with zero errors.
- No changes to Supabase client, auth middleware, or migrations.
- No changes to `applications`, `profiles`, or `resume_analyses` table shapes.
- All existing CRUD, search, filter, sort, and analytics flows preserved.
