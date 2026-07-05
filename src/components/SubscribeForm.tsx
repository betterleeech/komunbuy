import { useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { subscribeInterest } from '@/server/campaigns.functions'

export function SubscribeForm() {
  const subscribeFn = useServerFn(subscribeInterest)
  const [contact, setContact] = useState('')
  const [interest, setInterest] = useState<'kpop' | 'gadget' | 'both'>('both')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await subscribeFn({ data: { contact, interest } })
      setStatus('done')
      setContact('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 text-sm">
        Terima kasih! Kamu akan dihubungi saat batch baru dibuka.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
    >
      <input
        required
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="No. WhatsApp atau @username Instagram"
        className="w-full sm:w-72 rounded-full border border-neutral-300 px-5 py-3 text-sm outline-none focus:border-neutral-900"
      />
      <select
        value={interest}
        onChange={(e) => setInterest(e.target.value as typeof interest)}
        className="rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
      >
        <option value="both">K-Pop & Gadget</option>
        <option value="kpop">K-Pop saja</option>
        <option value="gadget">Gadget saja</option>
      </select>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700 disabled:opacity-60"
      >
        {status === 'loading' ? 'Mengirim...' : 'Daftar'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">Gagal mendaftar, coba lagi.</p>
      )}
    </form>
  )
}
