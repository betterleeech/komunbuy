import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white text-sm">
            KB
          </span>
          KomunBuy
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral-600">
          <a href="#kpop" className="hover:text-neutral-900">
            K-Pop
          </a>
          <a href="#gadget" className="hover:text-neutral-900">
            Gadget
          </a>
          <a href="#cara-kerja" className="hover:text-neutral-900">
            Cara Kerja
          </a>
          <a
            href="#gabung"
            className="rounded-full bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700"
          >
            Gabung Batch
          </a>
        </nav>
      </div>
    </header>
  )
}
