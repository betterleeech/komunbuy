import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { getCampaign } from '@/server/campaigns.functions'
import { JoinForm } from '@/components/JoinForm'
import { formatDeadline, formatIDR } from '@/lib/format'

export const Route = createFileRoute('/batch/$slug')({
  component: CampaignDetailPage,
  loader: async ({ params }) => {
    const campaign = await getCampaign({ data: { slug: params.slug } })
    if (!campaign) {
      throw notFound()
    }
    return { campaign }
  },
})

function CampaignDetailPage() {
  const { campaign } = Route.useLoaderData()
  const progress = Math.min(
    100,
    Math.round((campaign.committed / campaign.moq) * 100),
  )
  const remaining = Math.max(0, campaign.moq - campaign.committed)

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <Link to="/" className="inline-block mb-6 text-sm text-neutral-500 hover:text-neutral-900">
        &larr; Kembali ke semua batch
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            {campaign.description}
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            {campaign.origin}
          </div>
          <h1 className="mt-2 text-3xl font-black leading-tight">
            {campaign.title}
          </h1>

          <div className="mt-6 rounded-2xl border border-neutral-200 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Harga barang</span>
              <span>{formatIDR(campaign.unitPrice)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-neutral-600">Biaya layanan (per unit)</span>
              <span>{formatIDR(campaign.serviceFee)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 font-bold">
              <span>Total per unit</span>
              <span>{formatIDR(campaign.unitPrice + campaign.serviceFee)}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-neutral-900"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              <span>
                {campaign.committed}/{campaign.moq} unit terkumpul
                {remaining > 0 &&
                  ` · ${remaining} unit lagi untuk mencapai kuota`}
              </span>
              <span>Batas pemesanan {formatDeadline(campaign.deadline)}</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold mb-4">Kunci Slotmu di Batch Ini</h2>
            <JoinForm
              campaignId={campaign.id}
              unitPrice={campaign.unitPrice}
              serviceFee={campaign.serviceFee}
              disabled={campaign.status !== 'open'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
