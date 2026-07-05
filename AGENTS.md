# AGENTS.md

Overview of this codebase for AI agents and developers.

## Project Overview

KomunBuy is a community group-buy ("jastip") site. It facilitates collective
purchasing of official K-Pop merchandise and trending gadget accessories: buyers
commit to an open "batch" (campaign), and once a minimum order quantity is reached,
the operator does one bulk order and splits shipping costs domestically. There is no
payment processing built in — orders are recorded and buyers are expected to be
contacted directly for payment once a batch's MOQ is met.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (utility classes only, no component library) |
| Database | Netlify Database (Postgres) via Drizzle ORM |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── db
│   ├── schema.ts        # Drizzle table definitions: campaigns, orders, subscribers
│   └── index.ts         # Drizzle client (Netlify Database adapter)
├── drizzle.config.ts    # Drizzle Kit config; migrations output to netlify/database/migrations
├── netlify/database/migrations/   # Auto-applied by Netlify at deploy time
├── src
│   ├── components
│   │   ├── Header.tsx          # Site nav
│   │   ├── CampaignCard.tsx    # Batch summary card used on the home page
│   │   ├── JoinForm.tsx        # Order form on a batch detail page
│   │   └── SubscribeForm.tsx   # Email/WA notification opt-in on the home page
│   ├── lib
│   │   └── format.ts           # IDR currency + date formatting helpers
│   ├── server
│   │   └── campaigns.functions.ts  # Server functions: getCampaigns, getCampaign,
│   │                                 joinCampaign, subscribeInterest
│   ├── routes
│   │   ├── __root.tsx           # Root layout: Header, meta tags
│   │   ├── index.tsx            # Home page: hero, how-it-works, campaign lists
│   │   └── batch/$slug.tsx      # Batch detail + join form
│   ├── router.tsx
│   └── styles.css
```

## Key Concepts

### Data model (`db/schema.ts`)

- `campaigns` — one row per group-buy batch. Tracks `unitPrice`, `serviceFee` (the
  margin/service charge, kept separate from item cost for transparency),
  `moq` (minimum order quantity to unlock the batch), `committed` (running total of
  ordered units), `deadline`, and `status` (`open` | `locked` | `closed`).
- `orders` — one row per buyer order against a campaign. Inserting an order also
  increments `campaigns.committed` in the same server function (`joinCampaign`).
- `subscribers` — contact + interest category for batch-announcement opt-ins.

### Server functions (`src/server/campaigns.functions.ts`)

All database access goes through TanStack Start server functions — route loaders and
components never import `db` directly. `joinCampaign` rejects orders against a
campaign whose `status` isn't `open`.

### Routing

File-based routing via TanStack Router. `/batch/$slug` loads a single campaign by
slug and 404s (via `notFound()`) if missing.

## Database Workflow

1. Edit `db/schema.ts`
2. Run `npx drizzle-kit generate` to create a migration in
   `netlify/database/migrations/`
3. Never run `drizzle-kit push` or `migrate` — Netlify applies migrations
   automatically on deploy
4. Never edit an already-applied migration file; roll forward with a new one instead

## Conventions

- Components: PascalCase, one per file
- Server-only logic: `*.functions.ts` suffix, imported by both loaders and components
- Import paths use the `@/` alias for `src/*`
- Currency values are stored as integers (IDR, no decimals) and formatted with
  `formatIDR()` from `src/lib/format.ts`
- Copy is in Indonesian (Bahasa Indonesia), matching the target community audience
