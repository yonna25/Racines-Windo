'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MEMBERS = {
  ibrahim:  { ini: 'IB', name: 'Ibrahim',  role: 'Arrière-GP',  gen: 1, photo: null },
  fatou:    { ini: 'FA', name: 'Fatou',    role: 'Arrière-GM',  gen: 1, photo: null },
  mamadou:  { ini: 'MA', name: 'Mamadou',  role: 'Grand-père',  gen: 2, photo: null },
  aminata:  { ini: 'AM', name: 'Aminata',  role: 'Grand-mère',  gen: 2, photo: null },
  abdoul:   { ini: 'AB', name: 'Abdoul',   role: 'Père · Vous', gen: 3, photo: null, isYou: true },
  kadiatou: { ini: 'KA', name: 'Kadiatou', role: 'Mère',        gen: 3, photo: null },
  ismael:   { ini: 'IS', name: 'Ismaël',   role: 'Fils',        gen: 4, photo: null },
  soumba:   { ini: 'SO', name: 'Soumba',   role: 'Fille',       gen: 4, photo: null },
  bamba:    { ini: 'BA', name: 'Bamba',    role: 'Fils',        gen: 4, photo: null },
}

const GEN_STYLE = {
  1: { ring: '#D4C296', bg: '#EDE0BC', text: '#1B3A2F' },
  2: { ring: '#2D5A45', bg: '#2D5A45', text: '#FAF6EF' },
  3: { ring: '#C8A96E', bg: '#C8A96E', text: '#1B3A2F' },
  4: { ring: '#9AB89A', bg: '#EDE0BC', text: '#1B3A2F' },
}

// Feuille SVG individuelle
function Leaf({ x, y, rotate, color, size }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <path
        d={`M0,0 C${size*0.3},-${size*0.8} ${size*0.9},-${size*0.9} ${size*0.5},-${size*1.6}
           C${size*0.1},-${size*0.9} -${size*0.3},-${size*0.8} 0,0 Z`}
        fill={color}
        opacity="0.9"
      />
      <line
        x1="0" y1="0" x2={size*0.5} y2={-size*1.6}
        stroke={color === '#C8A96E' ? '#A07830' : '#1B3A2F'}
        strokeWidth="0.5" opacity="0.35"
      />
    </g>
  )
}

// Nœud avec photo ou initiales + feuilles optionnelles
function MemberNode({ id, member, size = 60, leaves = false, onClick }) {
  const style = GEN_STYLE[member.gen]
  const leafColor = member.isYou ? '#C8A96E' : '#2D5A45'
  const total = size + 24

  return (
    <button
      onClick={() => onClick(id)}
      className="flex flex-col items-center group"
      style={{ gap: 6, minWidth: total }}
    >
      <div style={{ position: 'relative', width: total, height: total, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Feuilles SVG */}
        {leaves && (
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
            viewBox={`0 0 ${total} ${total}`}
          >
            <Leaf x={total*0.12} y={total*0.18} rotate={-45} color={leafColor} size={size*0.27} />
            <Leaf x={total*0.88} y={total*0.14} rotate={35}  color={leafColor} size={size*0.23} />
            <Leaf x={total*0.05} y={total*0.58} rotate={-75} color={leafColor} size={size*0.21} />
            <Leaf x={total*0.95} y={total*0.52} rotate={65}  color={leafColor} size={size*0.21} />
            <Leaf x={total*0.5}  y={total*0.04} rotate={5}   color={leafColor} size={size*0.18} />
          </svg>
        )}

        {/* Cercle photo */}
        <div
          className="rounded-full overflow-hidden flex items-center justify-center transition-transform group-active:scale-95"
          style={{
            width: size, height: size,
            border: `3px solid ${style.ring}`,
            background: member.photo ? '#000' : style.bg,
            boxShadow: member.isYou
              ? `0 0 0 3px #FAF6EF, 0 0 0 6px ${style.ring}, 0 6px 20px rgba(0,0,0,0.15)`
              : '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          {member.photo ? (
            <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: size * 0.28, fontWeight: 700, color: style.text }}>
              {member.ini}
            </span>
          )}
        </div>
      </div>

      {/* Nom */}
      <div className="text-center" style={{ maxWidth: total }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 13, color: '#1B3A2F', lineHeight: 1.2, margin: 0 }}>
          {member.name}
        </p>
        <p style={{ fontSize: 10, color: member.isYou ? '#C8A96E' : '#9A8878', fontStyle: member.isYou ? 'italic' : 'normal', margin: 0, marginTop: 1 }}>
          {member.role}
        </p>
      </div>
    </button>
  )
}

// Bouton + Ajouter
function AddNode({ size = 48 }) {
  const total = size + 24
  return (
    <div className="flex flex-col items-center" style={{ gap: 6, minWidth: total }}>
      <div style={{ width: total, height: total, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: size, height: size,
            border: '2px dashed #C8A96E',
            background: 'rgba(200,169,110,0.06)',
            color: '#C8A96E',
            fontSize: size * 0.38,
            fontWeight: 300,
          }}
        >
          +
        </div>
      </div>
      <p style={{ fontSize: 10, color: '#C8A96E', margin: 0 }}>Ajouter</p>
    </div>
  )
}

// Tiret couple horizontal
function CoupleLine() {
  return (
    <svg width="28" height="8" style={{ alignSelf: 'center', marginBottom: 34, flexShrink: 0 }}>
      <line x1="2" y1="4" x2="26" y2="4" stroke="#C8A96E" strokeWidth="1.5" strokeDasharray="4 2" />
    </svg>
  )
}

// Branche verticale + horizontale en T (SVG)
function Branch({ fromX, toXs, color = '#2D5A45' }) {
  const allX = [fromX, ...toXs]
  const minX = Math.min(...allX)
  const maxX = Math.max(...allX)
  const W = 340
  const H = 48
  const midY = H * 0.52

  return (
    <svg width={W} height={H} style={{ display: 'block', overflow: 'visible' }}>
      {/* Descente depuis parent */}
      <line x1={fromX} y1={0} x2={fromX} y2={midY} stroke={color} strokeWidth="1.5" />
      {/* Horizontale */}
      {toXs.length > 1 && (
        <line x1={Math.min(fromX, ...toXs)} y1={midY} x2={Math.max(fromX, ...toXs)} y2={midY} stroke={color} strokeWidth="1.5" />
      )}
      {/* Montée vers chaque enfant */}
      {toXs.map((x, i) => (
        <line key={i} x1={x} y1={midY} x2={x} y2={H} stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export default function ArbrePage() {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)

  const go = (id) => router.push(`/arbre/${id}`)

  // Positions X centres des nœuds (dans un conteneur de 340px centré)
  const W = 340
  const cx = W / 2

  // Tailles nœuds par gen (size + 24 = total width)
  const sz1 = 56, tw1 = sz1 + 24   // gen1
  const sz2 = 64, tw2 = sz2 + 24   // gen2
  const sz3 = 70, tw3 = sz3 + 24   // gen3
  const sz4 = 52, tw4 = sz4 + 24   // gen4
  const gap = 28 // gap entre tiret couple

  // Centres X couples
  const c1L = cx - gap/2 - tw1/2, c1R = cx + gap/2 + tw1/2
  const c2L = cx - gap/2 - tw2/2, c2R = cx + gap/2 + tw2/2
  const c3L = cx - gap/2 - tw3/2, c3R = cx + gap/2 + tw3/2
  const c4a = cx - tw4 - 12, c4b = cx, c4c = cx + tw4 + 12

  const midCouple = (l, r) => (l + r) / 2

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg,#1B3A2F 0%,#2D5A45 100%)', padding: '48px 20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, margin: 0 }}>Mon Arbre</h1>
        <button style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', fontSize: 18, cursor: 'pointer' }}>⚙️</button>
      </div>

      {/* Contenu */}
      <div style={{ flex: 1, background: '#FAF6EF', borderRadius: '24px 24px 0 0', marginTop: -16, overflowY: 'auto', paddingBottom: 120 }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.25s', paddingTop: 28 }}>
          <div style={{ width: W, margin: '0 auto' }}>

            {/* GEN 1 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <MemberNode id="ibrahim" member={MEMBERS.ibrahim} size={sz1} onClick={go} />
              <CoupleLine />
              <MemberNode id="fatou"   member={MEMBERS.fatou}   size={sz1} onClick={go} />
            </div>

            <Branch fromX={midCouple(c1L, c1R)} toXs={[midCouple(c2L, c2R)]} />

            {/* GEN 2 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <MemberNode id="mamadou" member={MEMBERS.mamadou} size={sz2} leaves onClick={go} />
              <CoupleLine />
              <MemberNode id="aminata" member={MEMBERS.aminata} size={sz2} leaves onClick={go} />
            </div>

            <Branch fromX={midCouple(c2L, c2R)} toXs={[midCouple(c3L, c3R)]} />

            {/* GEN 3 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <MemberNode id="abdoul"   member={MEMBERS.abdoul}   size={sz3} leaves onClick={go} />
              <CoupleLine />
              <MemberNode id="kadiatou" member={MEMBERS.kadiatou} size={sz3} leaves onClick={go} />
            </div>

            <Branch fromX={midCouple(c3L, c3R)} toXs={[c4a, c4b, c4c]} />

            {/* GEN 4 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12 }}>
              <MemberNode id="ismael" member={MEMBERS.ismael} size={sz4} onClick={go} />
              <MemberNode id="soumba" member={MEMBERS.soumba} size={sz4} onClick={go} />
              <MemberNode id="bamba"  member={MEMBERS.bamba}  size={sz4} onClick={go} />
            </div>

            {/* Boutons ajouter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20 }}>
              <AddNode size={44} />
              <AddNode size={44} />
            </div>

          </div>
        </div>

        {/* Zoom */}
        <div style={{ display: 'flex', gap: 12, padding: '12px 24px 0' }}>
          {[['🔍 Zoom −', -0.15], ['🔎 Zoom +', 0.15]].map(([label, delta]) => (
            <button
              key={label}
              onClick={() => setZoom(z => Math.min(1.5, Math.max(0.5, z + delta)))}
              style={{ flex: 1, padding: '12px 0', borderRadius: 16, border: '1px solid #D4C296', background: '#FFF', color: '#1B3A2F', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* BottomNav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 8px 4px', background: '#FFFFFF', borderTop: '1px solid rgba(45,90,69,0.08)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        {[
          { key: 'accueil',    icon: '🏠', label: 'Accueil',     href: '/dashboard' },
          { key: 'arbre',      icon: '🌳', label: 'Arbre',        href: '/arbre' },
          { key: 'messages',   icon: '💬', label: 'Messages',     href: '/messages' },
          { key: 'evenements', icon: '📅', label: 'Événements',   href: '/evenements' },
          { key: 'profil',     icon: '👤', label: 'Profil',       href: '/galerie' },
        ].map(t => {
          const active = t.key === 'arbre'
          return (
            <button key={t.key} onClick={() => router.push(t.href)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 12px', borderRadius: 10, background: active ? '#F3EDE2' : 'transparent', border: 'none', cursor: 'pointer' }}>
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
