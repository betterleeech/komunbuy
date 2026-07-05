import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { joinCampaign } from '@/server/campaigns.functions'
import { formatIDR } from '@/lib/format'

interface JoinFormProps {
  campaignId: number
  unitPrice: number
  serviceFee: number
  disabled: boolean
}

export function JoinForm({
  campaignId,
  unitPrice,
  serviceFee,
  disabled,
}: JoinFormProps) {
  const joinFn = useServerFn(joinCampaign)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  )
  const [error, setError] = useState('')

  const total = (unitPrice + serviceFee) * quantity

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await joinFn({ data: { campaignId, name, contact, quantity, note } })
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-700">
        <p className="font-semibold">Pesanan kamu sudah tercatat!</p>
        <p className="text-sm mt-1">
          Kami akan menghubungi kamu di {contact} untuk konfirmasi pembayaran
          setelah kuota batch terpenuhi.
        </p>
      </div>
    )
  }

  if (disabled) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-neutral-600 text-sm">
        Batch ini sudah tidak menerima pesanan baru.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nama</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama lengkap"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Kontak (WhatsApp / Instagram)
        </label>
        <input
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="08xx-xxxx-xxxx atau @username"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Jumlah unit</label>
        <input
          required
          type="number"
          min={1}
          max={50}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-32 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Catatan (opsional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Misal: request versi/warna tertentu"
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-neutral-900"
        />
      </div>
      <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3">
        <span className="text-sm text-neutral-600">Estimasi total</span>
        <span className="font-bold">{formatIDR(total)}</span>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700 disabled:opacity-60"
      >
        {status === 'loading' ? 'Memproses...' : 'Kunci Slot Sekarang'}
      </button>
    </form>
  )
}
