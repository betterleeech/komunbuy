import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core'

export const campaigns = pgTable('campaigns', {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  category: text().notNull(), // 'kpop' | 'gadget'
  title: text().notNull(),
  summary: text().notNull(),
  description: text().notNull(),
  image: text().notNull(),
  origin: text().notNull(), // e.g. "Weverse / Withmuu (Korea)"
  unitPrice: integer('unit_price').notNull(), // in IDR
  serviceFee: integer('service_fee').notNull(), // in IDR, per item
  moq: integer().notNull(), // minimum order quantity to unlock the batch
  committed: integer().notNull().default(0), // units already ordered
  deadline: timestamp().notNull(),
  status: text().notNull().default('open'), // 'open' | 'locked' | 'closed'
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial().primaryKey(),
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id),
  name: text().notNull(),
  contact: text().notNull(), // whatsapp / instagram handle
  quantity: integer().notNull(),
  note: text().default(''),
  createdAt: timestamp('created_at').defaultNow(),
})

export const subscribers = pgTable('subscribers', {
  id: serial().primaryKey(),
  contact: text().notNull().unique(),
  interest: text().notNull().default(''), // 'kpop' | 'gadget' | 'both'
  createdAt: timestamp('created_at').defaultNow(),
})
