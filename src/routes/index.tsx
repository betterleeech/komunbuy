import { createFileRoute } from '@tanstack/react-router'
import { getCampaigns } from '@/server/campaigns.functions'
import { CampaignCard } from '@/components/CampaignCard'
import { SubscribeForm } from '@/components/SubscribeForm'

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: async () => {
    const campaigns = await getCampaigns()
    return { campaigns }
  },
})

const steps = [
  {
    title: '1. Pilih Batch',
    body: 'Lihat merchandise K-Pop resmi atau aksesoris gadget tren yang sedang dibuka untuk pemesanan kolektif.',
  },
  {
    title: '2. Kunci Slotmu',
    body: 'Isi form pemesanan dengan jumlah unit yang diinginkan. Kuota minimum harus tercapai sebelum batch dijalankan.',
  },
  {
    title: '3. Kami Urus Pengiriman',
    body: 'Setelah kuota terpenuhi, kami memesan secara kolektif ke platform resmi, lalu membagi ongkos kirim internasional ke seluruh peserta.',
  },
  {
    title: '4. Terima di Rumah',
    body: 'Barang dikemas ulang dan dikirim ke alamat masing-masing peserta melalui ekspedisi domestik.',
  },
]

function HomePage() {
  const { campaigns } = Route.useLoaderData()
  const kpop = campaigns.filter((c) => c.category === 'kpop')
  const gadget = campaigns.filter((c) => c.category === 'gadget')

  return (
    <div>
      <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-6xl mx-auto px-5 py-20 text-center">
          <span className="inline-block rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold text-white">
            Jastip &amp; Group Buy Berbasis Komunitas
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-black leading-tight">
            Merchandise K-Pop Resmi &amp; Gadget Tren,
            <br className="hidden md:block" />
            Lebih Murah Karena Dipesan Bareng
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-neutral-600">
            KomunBuy menjadi fasilitator pembelian dari platform resmi luar
            negeri dan supplier tepercaya, lalu menggabungkan pesanan
            komunitas menjadi satu batch untuk menekan ongkos kirim
            internasional. Kamu cukup gabung, kami yang urus sisanya.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#kpop"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
            >
              Lihat Batch K-Pop
            </a>
            <a
              href="#gadget"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold hover:border-neutral-500"
            >
              Lihat Batch Gadget
            </a>
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Cara Kerja</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-neutral-200 p-6"
            >
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kpop" className="max-w-6xl mx-auto px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Batch K-Pop</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Album, lightstick, dan merchandise fan-con resmi dari platform
              global.
            </p>
          </div>
        </div>
        {kpop.length === 0 ? (
          <p className="text-neutral-500">Belum ada batch terbuka saat ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpop.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </section>

      <section id="gadget" className="max-w-6xl mx-auto px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Batch Aksesoris Gadget</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Aksesoris gadget yang sedang tren, diimpor kolektif dari
              supplier tepercaya.
            </p>
          </div>
        </div>
        {gadget.length === 0 ? (
          <p className="text-neutral-500">Belum ada batch terbuka saat ini.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gadget.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </section>

      <section
        id="gabung"
        className="border-t border-neutral-200 bg-neutral-50"
      >
        <div className="max-w-3xl mx-auto px-5 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Jangan Sampai Ketinggalan Batch Berikutnya
          </h2>
          <p className="text-neutral-600 mb-8">
            Daftarkan WhatsApp atau Instagram kamu untuk mendapat notifikasi
            saat batch baru dibuka.
          </p>
          <SubscribeForm />
        </div>
      </section>
    </div>
  )
}
