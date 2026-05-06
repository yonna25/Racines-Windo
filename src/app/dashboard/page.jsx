'use client'
import { useState } from 'react'

const STATS = [
  { value: '47', label: 'MEMBRES' },
  { value: '4',  label: 'GÉNÉR.' },
  { value: '3',  label: 'ÉVÉNEM.' },
]

const CARDS = [
  { icon: '🌳', title: 'Mon Arbre',   sub: '47 membres',    href: '/arbre' },
  { icon: '💬', title: 'Messages',    sub: '3 nouveaux',    href: '/messages' },
  { icon: '📅', title: 'Événements',  sub: 'Ce mois-ci',    href: '/evenements' },
  { icon: '🖼️', title: 'Galerie',     sub: '128 souvenirs', href: '/galerie' },
]

const EVENTS = [
  { type: 'Anniversaire', name: 'Mamadou',          date: '15 mai 2026', countdown: 'J-13', dot: '#C8A96E' },
  { type: 'Mariage',      name: 'Ismaël & Sara',    date: '22 juin 2026', countdown: 'J-47', dot: '#4A7C65' },
  { type: 'Réunion',      name: 'Grand rassemblement', date: '10 août 2026', countdown: 'J-96', dot: '#2D5A45' },
]

const NAV = [
  { icon: '🏠', label: 'Accueil',    active: true },
  { icon: '🌳', label: 'Arbre',      active: false },
  { icon: '💬', label: 'Messages',   active: false },
  { icon: '📅', label: 'Événements', active: false },
  { icon: '👤', label: 'Profil',     active: false },
]

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState(0)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF', fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── Header vert ── */}
      <div className="relative px-5 pt-12 pb-16"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        {/* Pattern géométrique */}
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C8A96E 0, #C8A96E 1px, transparent 1px, transparent 12px)' }} />

        <div className="relative flex justify-between items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-1"
               style={{ color: 'rgba(200,169,110,0.7)', fontFamily: 'DM Sans, sans-serif' }}>
              BIENVENUE
            </p>
            <h1 className="text-3xl font-semibold" style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
              Famille Diallo
            </h1>
          </div>
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
               style={{ background: '#E2C99A', color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif' }}>
            A
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-3 mt-6">
          {STATS.map(s => (
            <div key={s.label} className="rounded-2xl px-3 py-4 text-center"
                 style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}>
              <p className="text-3xl font-semibold" style={{ color: '#C8A96E', fontFamily: 'Cormorant Garamond, serif' }}>
                {s.value}
              </p>
              <p className="text-xs tracking-widest mt-1" style={{ color: 'rgba(250,246,239,0.6)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Corps blanc arrondi ── */}
      <div className="flex-1 -mt-6 rounded-t-3xl px-5 pt-6 pb-24"
           style={{ background: '#FAF6EF' }}>

        {/* Accès rapide */}
        <p className="text-xs tracking-[0.2em] uppercase mb-4"
           style={{ color: '#4A7C65', fontFamily: 'DM Sans, sans-serif' }}>
          ACCÈS RAPIDE
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {CARDS.map(c => (
            <button key={c.title}
                    className="rounded-2xl p-4 text-left transition-all active:scale-95"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(45,90,69,0.08)',
                             boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                   style={{ background: '#F3EDE2' }}>
                {c.icon}
              </div>
              <p className="font-semibold text-base mb-1" style={{ color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>
                {c.title}
              </p>
              <p className="text-xs" style={{ color: '#4A7C65' }}>{c.sub}</p>
            </button>
          ))}
        </div>

        {/* Prochains événements */}
        <p className="text-xs tracking-[0.2em] uppercase mb-4"
           style={{ color: '#4A7C65' }}>
          PROCHAINS ÉVÉNEMENTS
        </p>
        <div className="flex flex-col gap-3">
          {EVENTS.map(e => (
            <div key={e.name} className="rounded-2xl px-4 py-4 flex items-center justify-between"
                 style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: e.dot }} />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#4A7C65' }}>{e.type}</p>
                  <p className="font-semibold" style={{ color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}>
                    {e.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9A8878' }}>{e.date}</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: '#F3EDE2', color: '#C8A96E' }}>
                {e.countdown}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nav bar ── */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center px-2 py-3"
           style={{ background: '#FFFFFF', borderTop: '1px solid rgba(45,90,69,0.08)',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        {NAV.map((n, i) => (
          <button key={n.label} onClick={() => setActiveNav(i)}
                  className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
                  style={{ background: activeNav === i ? '#F3EDE2' : 'transparent' }}>
            <span className="text-xl">{n.icon}</span>
            <span className="text-xs" style={{ color: activeNav === i ? '#1B3A2F' : '#9A8878',
                                               fontWeight: activeNav === i ? 600 : 400 }}>
              {n.label}
            </span>
            {activeNav === i && (
              <div className="w-1 h-1 rounded-full" style={{ background: '#C8A96E' }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
      }
