'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ALL_EVENTS = [
  {
    id: 1, day: '15', month: 'MAI',   type: 'ANNIVERSAIRE', typeIcon: '🎂',
    name: 'Mamadou Diallo', sub: '84 ans · Conakry',
    dotColor: '#C8A96E', bell: true,
  },
  {
    id: 2, day: '22', month: 'JUIN',  type: 'MARIAGE', typeIcon: '💍',
    name: 'Ismaël & Sara', sub: 'Dakar, Sénégal',
    dotColor: '#4A7C65', bell: false,
  },
  {
    id: 3, day: '10', month: 'AOÛT',  type: 'RÉUNION', typeIcon: '👥',
    name: 'Grand rassemblement', sub: 'Famille Diallo · Bamako',
    dotColor: '#2D5A45', bell: true,
  },
  {
    id: 4, day: '03', month: 'SEPT',  type: 'COMMÉMORATION', typeIcon: '🕯️',
    name: 'Ibrahim Diallo', sub: 'Anniversaire du souvenir',
    dotColor: '#9A8878', bell: true,
  },
]

const TYPE_COLORS = {
  ANNIVERSAIRE: '#C8A96E',
  MARIAGE: '#4A7C65',
  RÉUNION: '#2D5A45',
  COMMÉMORATION: '#9A8878',
}

const FILTERS = ['Tous', 'Anniversaires', 'Mariages', 'Réunions']

function EventCard({ event: e, onToggleBell }) {
  return (
    <div className="rounded-2xl px-4 py-4 flex items-center gap-4"
         style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      {/* Date */}
      <div className="rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
           style={{ width: 52, height: 52, background: '#F3EDE2' }}>
        <span className="font-bold leading-none" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#1B3A2F' }}>
          {e.day}
        </span>
        <span className="text-xs mt-0.5 tracking-wide" style={{ color: '#9A8878', fontSize: 9 }}>
          {e.month}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs">{e.typeIcon}</span>
          <span className="text-xs font-bold tracking-wide" style={{ color: TYPE_COLORS[e.type] || '#C8A96E', letterSpacing: '0.08em' }}>
            {e.type}
          </span>
        </div>
        <p className="font-semibold truncate" style={{ color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif', fontSize: 17 }}>
          {e.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#9A8878' }}>{e.sub}</p>
      </div>

      {/* Bell */}
      <button onClick={() => onToggleBell(e.id)} className="text-xl flex-shrink-0">
        {e.bell ? '🔔' : '🔕'}
      </button>
    </div>
  )
}

export default function EvenementsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('Tous')
  const [events, setEvents] = useState(ALL_EVENTS)
  const [showForm, setShowForm] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: '', type: 'ANNIVERSAIRE', day: '', month: 'JAN' })

  const toggleBell = (id) => {
    setEvents(ev => ev.map(e => e.id === id ? { ...e, bell: !e.bell } : e))
  }

  const filtered = filter === 'Tous' ? events
    : filter === 'Anniversaires' ? events.filter(e => e.type === 'ANNIVERSAIRE')
    : filter === 'Mariages' ? events.filter(e => e.type === 'MARIAGE')
    : events.filter(e => e.type === 'RÉUNION')

  const addEvent = () => {
    if (!newEvent.name || !newEvent.day) return
    setEvents(ev => [...ev, {
      id: Date.now(),
      day: newEvent.day,
      month: newEvent.month,
      type: newEvent.type,
      typeIcon: newEvent.type === 'ANNIVERSAIRE' ? '🎂' : newEvent.type === 'MARIAGE' ? '💍' : '👥',
      name: newEvent.name,
      sub: '',
      dotColor: TYPE_COLORS[newEvent.type] || '#C8A96E',
      bell: true,
    }])
    setShowForm(false)
    setNewEvent({ name: '', type: 'ANNIVERSAIRE', day: '', month: 'JAN' })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-6 flex justify-between items-center"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        <h1 className="text-3xl font-semibold" style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
          Événements
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#FAF6EF' }}
        >
          +
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 -mt-4 rounded-t-3xl px-5 pt-6 pb-28" style={{ background: '#FAF6EF' }}>

        {/* Filtres */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold flex-shrink-0 transition-all"
              style={{
                background: filter === f ? '#1B3A2F' : 'transparent',
                color: filter === f ? '#FAF6EF' : '#1B3A2F',
                border: `1.5px solid ${filter === f ? '#1B3A2F' : 'rgba(45,90,69,0.2)'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="flex flex-col gap-3">
          {filtered.map(e => (
            <EventCard key={e.id} event={e} onToggleBell={toggleBell} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-10 text-sm" style={{ color: '#9A8878' }}>Aucun événement dans cette catégorie.</p>
          )}
        </div>

        {/* Bouton créer */}
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-5 py-4 rounded-2xl font-semibold text-sm"
          style={{ background: '#2D5A45', color: '#FAF6EF', fontFamily: 'DM Sans, sans-serif' }}
        >
          + Créer un événement
        </button>
      </div>

      {/* Modal créer */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full rounded-t-3xl p-6 flex flex-col gap-4" style={{ background: '#FAF6EF' }}>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1B3A2F' }}>
              Nouvel événement
            </h2>
            {[
              { label: 'Nom', key: 'name', type: 'text', placeholder: 'Ex: Anniversaire de Fatou' },
              { label: 'Jour', key: 'day', type: 'number', placeholder: '15' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs font-semibold mb-1 block" style={{ color: '#4A7C65' }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={newEvent[f.key]}
                  onChange={e => setNewEvent(n => ({ ...n, [f.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(45,90,69,0.15)', color: '#1B3A2F' }}
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: '#4A7C65' }}>Type</label>
              <select
                value={newEvent.type}
                onChange={e => setNewEvent(n => ({ ...n, type: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: '#FFFFFF', border: '1px solid rgba(45,90,69,0.15)', color: '#1B3A2F' }}
              >
                {['ANNIVERSAIRE', 'MARIAGE', 'RÉUNION', 'COMMÉMORATION'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold"
                      style={{ background: '#F3EDE2', color: '#9A8878' }}>Annuler</button>
              <button onClick={addEvent} className="flex-1 py-3 rounded-xl text-sm font-semibold"
                      style={{ background: '#1B3A2F', color: '#FAF6EF' }}>Ajouter</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="evenements" />
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
              
