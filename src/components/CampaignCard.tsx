import { Link } from '@tanstack/react-router'
import { formatDeadline, formatIDR } from '@/lib/format'

export interface CampaignSummary {
  id: number
  slug: string
  category: string
  title: string
  summary: string
  image: string
  origin: string
  unitPrice: number
  serviceFee: number
  moq: number
  committed: number
  deadline: string | Date
  status: string
}

const statusLabel: Record<string, string> = {
  open: 'Terbuka',
  locked: 'Kuota Terpenuhi',
  closed: 'Ditutup',
}

const statusColor: Record<string, string> = {
  open: 'bg-emerald-100 text-emerald-700',
  locked: 'bg-amber-100 text-amber-700',
  closed: 'bg-neutral-200 text-neutral-600',
}

export function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
  const progress = Math.min(
    100,
    Math.round((campaign.committed / campaign.moq) * 100),
  )

  return (
    <Link
      to="/batch/$slug"
      params={{ slug: campaign.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[campaign.status] ?? 'bg-neutral-200 text-neutral-600'}`}
        >
          {statusLabel[campaign.status] ?? campaign.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {campaign.origin}
        </div>
        <h3 className="text-lg font-bold leading-snug">{campaign.title}</h3>
        <p className="line-clamp-2 text-sm text-neutral-600">
          {campaign.summary}
        </p>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">
              {formatIDR(campaign.unitPrice + campaign.serviceFee)}
            </span>
            <span className="text-xs text-neutral-500">/ unit</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-neutral-900"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>
              {campaign.committed}/{campaign.moq} unit terkumpul
            </span>
            <span>Batas {formatDeadline(campaign.deadline)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
