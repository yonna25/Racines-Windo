'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const GRID_ITEMS = [
  { id: 1, label: 'Maison familiale\nConakry, 1985', emoji: '🏡', bg: '#D4C296', wide: true, tall: true },
  { id: 2, label: '1992',     emoji: '👨‍👩‍👧‍👦', bg: '#2D5A45', textColor: '#FAF6EF' },
  { id: 3, label: 'Récolte',  emoji: '🌾', bg: '#E2D4A8' },
  { id: 4, label: 'Fête',     emoji: '💃', bg: '#C8A96E' },
  { id: 5, label: 'Doc.',     emoji: '📜', bg: '#1B3A2F', textColor: '#FAF6EF' },
  { id: 6, label: '1978',     emoji: '✨', bg: '#3D6B55', textColor: '#FAF6EF' },
]

const AUDIO = {
  title: "L'histoire de notre famille",
  sub: 'Racontée par Mamadou · 2023',
}

export default function GaleriePage() {
  const router = useRouter()
  const [playing, setPlaying] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-6 flex justify-between items-center"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        <h1 className="text-3xl font-semibold" style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
          Galerie Héritage
        </h1>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
          <span className="text-lg">🔍</span>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 -mt-4 rounded-t-3xl px-4 pt-6 pb-28 overflow-y-auto" style={{ background: '#FAF6EF' }}>

        {/* Grille masonry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto', gap: 8 }}>
          {GRID_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="relative overflow-hidden rounded-2xl flex flex-col items-start justify-end transition-transform active:scale-95"
              style={{
                background: item.bg,
                gridColumn: item.wide ? '1' : 'auto',
                gridRow: item.tall ? 'span 2' : 'auto',
                minHeight: item.wide ? 200 : 95,
                padding: 12,
              }}
            >
              <span style={{ fontSize: item.wide ? 40 : 28, position: 'absolute', top: 14, left: item.wide ? 14 : '50%', transform: item.wide ? 'none' : 'translateX(-50%)' }}>
                {item.emoji}
              </span>
              <span className="relative z-10 text-left font-semibold leading-tight"
                    style={{ fontSize: 11, color: item.textColor || '#1B3A2F', whiteSpace: 'pre-line' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Card audio */}
        <div className="mt-4 rounded-2xl px-4 py-4 flex items-center gap-4"
             style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <span className="text-3xl">📖</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold" style={{ color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
              {AUDIO.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#9A8878' }}>{AUDIO.sub}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying(p => !p)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#1B3A2F', color: '#FAF6EF', fontSize: 14 }}
            >
              {playing ? '⏸' : '▶'}
            </button>
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: '#F3EDE2', color: '#C8A96E' }}>
              Audio
            </span>
          </div>
        </div>

        {/* Bouton ajouter */}
        <button className="w-full mt-4 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{ background: '#E2D4A8', color: '#C8A96E', fontFamily: 'DM Sans, sans-serif' }}>
          📷 Ajouter un souvenir
        </button>

        {/* Slogan bas de page */}
        <div className="mt-10 text-center pb-4">
          <p className="font-display text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1B3A2F' }}>
            Racines — <em>Votre héritage, votre fierté</em>
          </p>
          <p className="text-xs mt-2" style={{ color: '#9A8878', letterSpacing: '0.05em' }}>
            Connaître ses racines, unir les générations
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="rounded-3xl p-8 flex flex-col items-center gap-4 mx-6"
            style={{ background: selected.bg, minWidth: 260 }}
            onClick={e => e.stopPropagation()}
          >
            <span style={{ fontSize: 64 }}>{selected.emoji}</span>
            <p className="font-bold text-center" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: selected.textColor || '#1B3A2F', whiteSpace: 'pre-line' }}>
              {selected.label}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-2 px-6 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(0,0,0,0.15)', color: selected.textColor || '#1B3A2F' }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <BottomNav active="profil" />
    </div>
  )
}

function BottomNav({ active }) {
  const router = useRouter()
  const tabs = [
    { key: 'accueil',    icon: '🏠', label: 'Accueil',   href: '/dashboard' },
    { key: 'arbre',      icon: '🌳', label: 'Arbre',      href: '/arbre' },
    { key: 'messages',   icon: '💬', label: 'Messages',   href: '/messages' },
    { key: 'evenements', icon: '📅', label: 'Événements', href: '/evenements' },
    { key: 'profil',     icon: '👤', label: 'Profil',     href: '/galerie' },
  ]
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 py-3"
         style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,90,69,0.08)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => router.push(t.href)}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl"
                style={{ background: active === t.key ? '#F3EDE2' : 'transparent' }}>
          <span className="text-xl">{t.icon}</span>
          <span className="text-xs" style={{ color: active === t.key ? '#1B3A2F' : '#9A8878', fontWeight: active === t.key ? 600 : 400 }}>
            {t.label}
          </span>
          {active === t.key && <div className="w-1 h-1 rounded-full" style={{ background: '#C8A96E' }} />}
        </button>
      ))}
    </div>
  )
              }
              
