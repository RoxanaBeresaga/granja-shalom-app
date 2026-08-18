import { useState } from 'react'
import { WA_LINK, WA_NUMBER } from '../data/contact'

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.6 4.4 1.8 6.3L4 29l8-2.1c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.7 1.2 1.3-4.6-.3-.4a9.7 9.7 0 01-1.5-5.3c0-5.4 4.5-9.8 10.6-9.8s10.6 4.4 10.6 9.8-4.5 9.8-10.6 9.8zm5.8-7.3c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.4-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.8 2 .8 2.7.9 3.7.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}

export default function WhatsAppFab({ bottom }: { bottom: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ bottom }}
      className="absolute right-4 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-300"
    >
      {open && (
        <div className="animate-pop w-60 rounded-2xl rounded-br-md bg-white p-4 shadow-xl ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-2">
            <span className="font-display text-sm font-bold text-shalom-forest">
              Granja Shalom
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="-mr-1 -mt-1 text-shalom-ink/40 transition-colors hover:text-shalom-ink"
            >
              ✕
            </button>
          </div>
          <p className="mt-1 text-sm leading-snug text-shalom-ink/75">
            ¿Tenés dudas sobre tu caja? Escribinos y te ayudamos. 🥬
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1eb457]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {WA_NUMBER}
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contactar por WhatsApp"
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.7)] ring-1 ring-black/5 transition-all hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className={`h-8 w-8 transition-transform ${open ? 'rotate-6' : ''}`} />
      </button>
    </div>
  )
}

