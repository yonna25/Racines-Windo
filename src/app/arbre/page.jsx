'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ── Membres ───────────────────────────────────────────────────────
const MEMBERS = {
  ibrahim:  { ini: 'IB', name: 'Ibrahim',  role: 'Arrière-GP',  photo: null, ring: '#D4C296', bg: '#EDE0BC', text: '#1B3A2F' },
  fatou:    { ini: 'FA', name: 'Fatou',    role: 'Arrière-GM',  photo: null, ring: '#D4C296', bg: '#EDE0BC', text: '#1B3A2F' },
  mamadou:  { ini: 'MA', name: 'Mamadou',  role: 'Grand-père',  photo: null, ring: '#2D5A45', bg: '#2D5A45', text: '#FAF6EF' },
  aminata:  { ini: 'AM', name: 'Aminata',  role: 'Grand-mère',  photo: null, ring: '#2D5A45', bg: '#2D5A45', text: '#FAF6EF' },
  abdoul:   { ini: 'AB', name: 'Abdoul',   role: 'Père · Vous', photo: null, ring: '#C8A96E', bg: '#C8A96E', text: '#1B3A2F', isYou: true },
  kadiatou: { ini: 'KA', name: 'Kadiatou', role: 'Mère',        photo: null, ring: '#C8A96E', bg: '#C8A96E', text: '#1B3A2F' },
  ismael:   { ini: 'IS', name: 'Ismaël',   role: 'Fils',        photo: null, ring: '#9AB89A', bg: '#EDE0BC', text: '#1B3A2F' },
  soumba:   { ini: 'SO', name: 'Soumba',   role: 'Fille',       photo: null, ring: '#9AB89A', bg: '#EDE0BC', text: '#1B3A2F' },
  bamba:    { ini: 'BA', name: 'Bamba',    role: 'Fils',        photo: null, ring: '#9AB89A', bg: '#EDE0BC', text: '#1B3A2F' },
}

// ── Positions absolues (canvas 340 × 640) ────────────────────────
const R  = 30   // rayon cercle
const CW = 340  // canvas width
const NODES = {
  ibrahim:  { x: 82,  y: 78  },
  fatou:    { x: 258, y: 78  },
  mamadou:  { x: 82,  y: 225 },
  aminata:  { x: 258, y: 225 },
  abdoul:   { x: 82,  y: 378 },
  kadiatou: { x: 258, y: 378 },
  ismael:   { x: 50,  y: 520 },
  soumba:   { x: 170, y: 520 },
  bamba:    { x: 292, y: 520 },
}

// ── Grandes feuilles éparpillées (style référence) ────────────────
const LEAVES = [
  // Haut gauche
  { x: 14,  y: 28,  r: -35, s: 26, c: '#2D5A45' },
  { x: 38,  y: 10,  r:  -8, s: 22, c: '#3D6B55' },
  { x: 60,  y: 28,  r:  22, s: 18, c: '#4A7C65' },
  // Haut droite
  { x: 278, y: 12,  r:  25, s: 26, c: '#2D5A45' },
  { x: 306, y: 35,  r:  55, s: 22, c: '#3D6B55' },
  { x: 258, y: 40,  r: -18, s: 18, c: '#4A7C65' },
  // Milieu gauche
  { x: 8,   y: 205, r: -62, s: 24, c: '#2D5A45' },
  { x: 18,  y: 242, r: -30, s: 18, c: '#3D6B55' },
  // Milieu droite
  { x: 322, y: 198, r:  55, s: 24, c: '#2D5A45' },
  { x: 312, y: 238, r:  78, s: 18, c: '#3D6B55' },
  // Entre gen2 et gen3
  { x: 150, y: 300, r:   5, s: 16, c: '#4A7C65' },
  { x: 178, y: 316, r:  32, s: 13, c: '#3D6B55' },
  // Bas gauche
  { x: 10,  y: 368, r: -68, s: 22, c: '#2D5A45' },
  { x: 22,  y: 408, r: -42, s: 16, c: '#3D6B55' },
  // Bas droite
  { x: 320, y: 362, r:  62, s: 22, c: '#2D5A45' },
  { x: 308, y: 402, r:  82, s: 16, c: '#3D6B55' },
  // Autour enfants
  { x: 18,  y: 510, r: -52, s: 18, c: '#2D5A45' },
  { x: 306, y: 506, r:  58, s: 18, c: '#2D5A45' },
  { x: 142, y: 585, r:   8, s: 15, c: '#3D6B55' },
  { x: 198, y: 582, r:  38, s: 15, c: '#4A7C65' },
]

// Forme feuille SVG
function Leaf({ x, y, r, s, c }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      <path
        d={`M0,0
           C${s*0.38},-${s*0.75} ${s*0.95},-${s*1.1} ${s*0.52},-${s*2}
           C${s*0.08},-${s*1.1} -${s*0.38},-${s*0.75} 0,0 Z`}
        fill={c}
        opacity="0.9"
      />
      {/* Nervure centrale */}
      <line x1="0" y1="0" x2={s*0.52} y2={-s*2}
            stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
    </g>
  )
}

// ── Connecteurs orthogonaux ───────────────────────────────────────
function Branches() {
  const N = NODES
  const stroke = '#3D6B55'
  const sw = 1.6

  // Points clés
  const g1mid = 170  // x milieu couple gen1
  const g2mid = 170  // x milieu couple gen2
  const g3mid = 170  // x milieu couple gen3

  const junc12 = 152  // y jonction gen1→gen2
  const junc23 = 302  // y jonction gen2→gen3
  const junc34 = 458  // y jonction gen3→enfants

  return (
    <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">

      {/* Barres couple (tirets dorés) */}
      <line x1={N.ibrahim.x+R}  y1={N.ibrahim.y}  x2={N.fatou.x-R}    y2={N.fatou.y}    stroke="#C8A96E" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <line x1={N.mamadou.x+R}  y1={N.mamadou.y}  x2={N.aminata.x-R}  y2={N.aminata.y}  stroke="#C8A96E" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />
      <line x1={N.abdoul.x+R}   y1={N.abdoul.y}   x2={N.kadiatou.x-R} y2={N.kadiatou.y} stroke="#C8A96E" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.75" />

      {/* Gen1 → Gen2 (Mamadou) */}
      <polyline points={`${g1mid},${N.ibrahim.y+R} ${g1mid},${junc12} ${N.mamadou.x},${junc12} ${N.mamadou.x},${N.mamadou.y-R}`} />

      {/* Gen2 → Gen3 (Abdoul) */}
      <polyline points={`${g2mid},${N.mamadou.y+R} ${g2mid},${junc23} ${N.abdoul.x},${junc23} ${N.abdoul.x},${N.abdoul.y-R}`} />

      {/* Gen3 → Enfants */}
      {/* Tronc */}
      <line x1={g3mid} y1={N.abdoul.y+R} x2={g3mid} y2={junc34} />
      {/* Barre horizontale */}
      <line x1={N.ismael.x} y1={junc34} x2={N.bamba.x} y2={junc34} />
      {/* Montées vers chaque enfant */}
      <line x1={N.ismael.x}  y1={junc34} x2={N.ismael.x}  y2={N.ismael.y-R} />
      <line x1={N.soumba.x}  y1={junc34} x2={N.soumba.x}  y2={N.soumba.y-R} />
      <line x1={N.bamba.x}   y1={junc34} x2={N.bamba.x}   y2={N.bamba.y-R} />

    </g>
  )
}

// ── Nœud ─────────────────────────────────────────────────────────
function Node({ id, member, onClick }) {
  const pos = NODES[id]
  const size = R * 2

  return (
    <div style={{ position: 'absolute', left: pos.x - R, top: pos.y - R, zIndex: 3 }}>
      {/* Cercle */}
      <button
        onClick={() => onClick(id)}
        style={{
          width: size, height: size, borderRadius: '50%',
          border: `3px solid ${member.ring}`,
          background: member.photo ? '#000' : member.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', overflow: 'hidden',
          boxShadow: member.isYou
            ? `0 0 0 4px #FAF6EF, 0 0 0 7px ${member.ring}, 0 6px 20px rgba(0,0,0,0.2)`
            : `0 4px 16px rgba(0,0,0,0.13)`,
          transition: 'transform 0.12s',
        }}
        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {member.photo
          ? <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: R * 0.62, fontWeight: 700, color: member.text, userSelect: 'none' }}>{member.ini}</span>
        }
      </button>

      {/* Label */}
      <div style={{ position: 'absolute', top: size + 5, left: '50%', transform: 'translateX(-50%)', width: 72, textAlign: 'center', pointerEvents: 'none' }}>
        <p style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 12, color: '#1B3A2F', lineHeight: 1.2 }}>
          {member.name}
        </p>
        <p style={{ margin: 0, marginTop: 1, fontSize: 9.5, color: member.isYou ? '#C8A96E' : '#9A8878', fontStyle: member.isYou ? 'italic' : 'normal' }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function ArbrePage() {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FAF6EF', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg,#1B3A2F 0%,#2D5A45 100%)', padding: '48px 20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, margin: 0 }}>Mon Arbre</h1>
        <button style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', fontSize: 18, cursor: 'pointer' }}>⚙️</button>
      </div>

      {/* Arbre */}
      <div style={{ flex: 1, background: '#FAF6EF', borderRadius: '24px 24px 0 0', marginTop: -16, overflowY: 'auto', paddingBottom: 120 }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.25s', paddingTop: 20 }}>

          {/* Canvas positionné */}
          <div style={{ position: 'relative', width: CW, height: 645, margin: '0 auto' }}>

            {/* Couche SVG : feuilles + branches */}
            <svg width={CW} height={645} style={{ position: 'absolute', inset: 0, overflow: 'visible', zIndex: 1 }}>
              {/* Grandes feuilles éparpillées */}
              {LEAVES.map((l, i) => <Leaf key={i} {...l} />)}
              {/* Connecteurs */}
              <Branches />
            </svg>

            {/* Nœuds */}
            {Object.entries(MEMBERS).map(([id, m]) => (
              <Node key={id} id={id} member={m} onClick={id => router.push(`/arbre/${id}`)} />
            ))}

          </div>
        </div>

        {/* Zoom */}
        <div style={{ display: 'flex', gap: 12, padding: '4px 24px 8px' }}>
          {[['🔍 Zoom −', -0.15], ['🔎 Zoom +', 0.15]].map(([label, delta]) => (
            <button key={label}
              onClick={() => setZoom(z => Math.min(1.5, Math.max(0.45, z + delta)))}
              style={{ flex: 1, padding: '12px 0', borderRadius: 16, border: '1px solid #D4C296', background: '#FFF', color: '#1B3A2F', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* BottomNav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 8px 6px', background: '#FFFFFF', borderTop: '1px solid rgba(45,90,69,0.08)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'accueil',    icon: '🏠', label: 'Accueil',   href: '/dashboard' },
          { key: 'arbre',      icon: '🌳', label: 'Arbre',      href: '/arbre' },
          { key: 'messages',   icon: '💬', label: 'Messages',   href: '/messages' },
          { key: 'evenements', icon: '📅', label: 'Événements', href: '/evenements' },
          { key: 'profil',     icon: '👤', label: 'Profil',     href: '/galerie' },
        ].map(t => {
          const active = t.key === 'arbre'
          return (
            <button key={t.key} onClick={() => router.push(t.href)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 10px', borderRadius: 10, background: active ? '#F3EDE2' : 'transparent', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ fontSize: 10, color: active ? '#1B3A2F' : '#9A8878', fontWeight: active ? 600 : 400 }}>{t.label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C8A96E' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
   }
  
