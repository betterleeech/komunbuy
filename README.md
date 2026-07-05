# KomunBuy

KomunBuy is a community-based group-buy ("jastip") storefront for niche reseller
businesses — think official K-Pop merchandise imported from global fan platforms
sourced from overseas suppliers. Instead of holding inventory, the site facilitates
collective ordering: buyers commit to a batch, once the minimum order quantity (MOQ)
is reached the operator places one bulk order and splits the international shipping
cost across everyone, then repackages and ships domestically.

## What it does

- Lists open "batches" (group-buy campaigns) grouped by category — K-Pop and Gadget
- Each batch shows unit price, a per-item service fee, MOQ progress, and an order
  deadline
- Visitors can join a batch by submitting their name, contact, and desired quantity
- Visitors can subscribe for notifications about future batches

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- Tailwind CSS 4
- Netlify Database (managed Postgres) via Drizzle ORM for campaigns, orders, and
  subscribers
- Deployed on Netlify

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on port 3000 by default (or via `netlify dev` for full Netlify
feature emulation, including the database).

Database schema lives in `db/schema.ts`. After changing it, generate a migration with:

```bash
npx drizzle-kit generate
```

Migrations are applied automatically by Netlify at deploy time — do not run
`drizzle-kit migrate` or `push` yourself.
