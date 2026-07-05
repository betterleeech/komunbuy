import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { eq, sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { campaigns, orders, subscribers } from '../../db/schema.js'

export const getCampaigns = createServerFn().handler(async () => {
  return db.select().from(campaigns).orderBy(campaigns.deadline)
})

export const getCampaign = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const result = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.slug, data.slug))
    return result[0] || null
  })

const JoinOrderSchema = z.object({
  campaignId: z.number().int().positive(),
  name: z.string().min(2).max(120),
  contact: z.string().min(4).max(120),
  quantity: z.number().int().positive().max(50),
  note: z.string().max(500).optional(),
})

export const joinCampaign = createServerFn({ method: 'POST' })
  .inputValidator(JoinOrderSchema)
  .handler(async ({ data }) => {
    const [campaign] = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, data.campaignId))

    if (!campaign) {
      throw new Error('Campaign tidak ditemukan')
    }
    if (campaign.status !== 'open') {
      throw new Error('Batch ini sudah ditutup untuk pemesanan baru')
    }

    const [order] = await db
      .insert(orders)
      .values({
        campaignId: data.campaignId,
        name: data.name,
        contact: data.contact,
        quantity: data.quantity,
        note: data.note ?? '',
      })
      .returning()

    const [updated] = await db
      .update(campaigns)
      .set({ committed: sql`${campaigns.committed} + ${data.quantity}` })
      .where(eq(campaigns.id, data.campaignId))
      .returning()

    return { order, campaign: updated }
  })

const SubscribeSchema = z.object({
  contact: z.string().min(4).max(120),
  interest: z.enum(['kpop', 'gadget', 'both']).default('both'),
})

export const subscribeInterest = createServerFn({ method: 'POST' })
  .inputValidator(SubscribeSchema)
  .handler(async ({ data }) => {
    const [sub] = await db
      .insert(subscribers)
      .values({ contact: data.contact, interest: data.interest })
      .onConflictDoUpdate({
        target: subscribers.contact,
        set: { interest: data.interest },
      })
      .returning()
    return sub
  })
