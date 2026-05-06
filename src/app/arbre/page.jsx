'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TREE = [
  // [id, initiales, nom, rôle, couleur bg, couleur texte, génération, colonne]
  { id: 'ibrahim',  ini: 'IB', name: 'Ibrahim',  role: 'Arrière-GP',  bg: '#E2D4A8', text: '#1B3A2F', gen: 1, col: 0 },
  { id: 'fatou',    ini: 'FA', name: 'Fatou',    role: 'Arrière-GM',  bg: '#E2D4A8', text: '#1B3A2F', gen: 1, col: 1 },
  { id: 'mamadou',  ini: 'MA', name: 'Mamadou',  role: 'Grand-père',  bg: '#2D5A45', text: '#FAF6EF', gen: 2, col: 0 },
  { id: 'aminata',  ini: 'AM', name: 'Aminata',  role: 'Grand-mère',  bg: '#2D5A45', text: '#FAF6EF', gen: 2, col: 1 },
  { id: 'abdoul',   ini: 'AB', name: 'Abdoul',   role: 'Père · Vous', bg: '#C8A96E', text: '#1B3A2F', gen: 3, col: 0 },
  { id: 'kadiatou', ini: 'KA', name: 'Kadiatou', role: 'Mère',        bg: '#D4C296', text: '#1B3A2F', gen: 3, col: 1 },
  { id: 'ismael',   ini: 'IS', name: 'Ismaël',   role: 'Fils',        bg: '#E2D4A8', text: '#1B3A2F', gen: 4, col: 0 },
  { id: 'soumba',   ini: 'SO', name: 'Soumba',   role: 'Fille',       bg: '#E2D4A8', text: '#1B3A2F', gen: 4, col: 1 },
  { id: 'bamba',    ini: 'BA', name: 'Bamba',    role: 'Fils',        bg: '#E2D4A8', text: '#1B3A2F', gen: 4, col: 2 },
]

function Avatar({ member, size = 54, onClick }) {
  return (
    <button
      onClick={() => onClick(member.id)}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
        style={{
          width: size, height: size,
          background: member.bg, color: member.text,
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: size * 0.3,
          border: '2px solid rgba(200,169,110,0.3)',
        }}
      >
        {member.ini}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold leading-tight" style={{ color: '#1B3A2F', fontFamily: 'Cormorant Garamond, serif', fontSize: 13 }}>
          {member.name}
        </p>
        <p className="text-xs leading-tight" style={{ color: member.role.includes('Vous') ? '#C8A96E' : '#9A8878', fontStyle: member.role.includes('Vous') ? 'italic' : 'normal', fontSize: 10 }}>
          {member.role}
        </p>
      </div>
    </button>
  )
}

function HLine() {
  return <div style={{ width: 32, height: 1, background: '#D4C296', flexShrink: 0, alignSelf: 'flex-start', marginTop: 26 }} />
}

function VLine() {
  return <div style={{ width: 1, height: 32, background: '#D4C296', margin: '0 auto' }} />
}

export default function ArbrePage() {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)

  const gen = (n) => TREE.filter(m => m.gen === n)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-6 flex justify-between items-center"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        <h1 className="text-3xl font-semibold" style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
          Mon Arbre
        </h1>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
          <span className="text-lg">⚙️</span>
        </button>
      </div>

      {/* Arbre */}
      <div className="flex-1 -mt-4 rounded-t-3xl overflow-auto pb-28"
           style={{ background: '#FAF6EF' }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s', paddingTop: 32, paddingBottom: 16 }}>

          {/* Génération 1 */}
          <div className="flex justify-center items-start gap-2">
            <Avatar member={gen(1)[0]} onClick={id => router.push(`/arbre/${id}`)} />
            <HLine />
            <Avatar member={gen(1)[1]} onClick={id => router.push(`/arbre/${id}`)} />
          </div>
          <VLine />

          {/* Génération 2 */}
          <div className="flex justify-center items-start gap-2">
            <Avatar member={gen(2)[0]} onClick={id => router.push(`/arbre/${id}`)} />
            <HLine />
            <Avatar member={gen(2)[1]} onClick={id => router.push(`/arbre/${id}`)} />
          </div>
          <VLine />

          {/* Génération 3 */}
          <div className="flex justify-center items-start gap-2">
            <Avatar member={gen(3)[0]} onClick={id => router.push(`/arbre/${id}`)} />
            <HLine />
            <Avatar member={gen(3)[1]} onClick={id => router.push(`/arbre/${id}`)} />
          </div>
          <VLine />

          {/* Génération 4 */}
          <div className="flex justify-center items-start gap-6">
            {gen(4).map(m => (
              <Avatar key={m.id} member={m} size={48} onClick={id => router.push(`/arbre/${id}`)} />
            ))}
          </div>
        </div>

        {/* Zoom */}
        <div className="flex gap-3 px-6 mt-4">
          {[['🔍 Zoom −', -0.15], ['🔎 Zoom +', 0.15]].map(([label, delta]) => (
            <button
              key={label}
              onClick={() => setZoom(z => Math.min(1.4, Math.max(0.5, z + delta)))}
              className="flex-1 py-3 rounded-2xl font-semibold text-sm"
              style={{ border: '1px solid #D4C296', background: '#FFFFFF', color: '#1B3A2F', fontFamily: 'DM Sans, sans-serif' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="arbre" />
    </div>
  )
}

function BottomNav({ active }) {
  const router = useRouter()
  const tabs = [
    { key: 'accueil',    icon: '🏠', label: 'Accueil',     href: '/dashboard' },
    { key: 'arbre',      icon: '🌳', label: 'Arbre',        href: '/arbre' },
    { key: 'messages',   icon: '💬', label: 'Messages',     href: '/messages' },
    { key: 'evenements', icon: '📅', label: 'Événements',   href: '/evenements' },
    { key: 'profil',     icon: '👤', label: 'Profil',       href: '/galerie' },
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
