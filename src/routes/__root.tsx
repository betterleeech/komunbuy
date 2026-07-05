import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '@/components/Header'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'KomunBuy — Jastip & Group Buy Komunitas K-Pop dan Gadget',
      },
      {
        name: 'description',
        content:
          'KomunBuy memfasilitasi pembelian merchandise K-Pop resmi dan aksesoris gadget tren melalui sistem group order, menekan ongkos kirim internasional untuk komunitas.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body className="text-neutral-900">
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
