'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ── Données ───────────────────────────────────────────────────────
const MEMBERS = {
  ibrahim:  { ini: 'IB', name: 'Ibrahim',  role: 'Arrière-GP',  photo: null, color: '#D4C296', text: '#1B3A2F' },
  fatou:    { ini: 'FA', name: 'Fatou',    role: 'Arrière-GM',  photo: null, color: '#D4C296', text: '#1B3A2F' },
  mamadou:  { ini: 'MA', name: 'Mamadou',  role: 'Grand-père',  photo: null, color: '#2D5A45', text: '#FAF6EF' },
  aminata:  { ini: 'AM', name: 'Aminata',  role: 'Grand-mère',  photo: null, color: '#2D5A45', text: '#FAF6EF' },
  abdoul:   { ini: 'AB', name: 'Abdoul',   role: 'Père · Vous', photo: null, color: '#C8A96E', text: '#1B3A2F', isYou: true },
  kadiatou: { ini: 'KA', name: 'Kadiatou', role: 'Mère',        photo: null, color: '#C8A96E', text: '#1B3A2F' },
  ismael:   { ini: 'IS', name: 'Ismaël',   role: 'Fils',        photo: null, color: '#E2D4A8', text: '#1B3A2F' },
  soumba:   { ini: 'SO', name: 'Soumba',   role: 'Fille',       photo: null, color: '#E2D4A8', text: '#1B3A2F' },
  bamba:    { ini: 'BA', name: 'Bamba',    role: 'Fils',        photo: null, color: '#E2D4A8', text: '#1B3A2F' },
}

// ── Layout (canvas 340 × 620) ─────────────────────────────────────
const R = 32   // rayon de chaque cercle
const W = 340  // largeur canvas
const POSITIONS = {
  ibrahim:  { x: 90,  y: 72 },
  fatou:    { x: 250, y: 72 },
  mamadou:  { x: 90,  y: 218 },
  aminata:  { x: 250, y: 218 },
  abdoul:   { x: 90,  y: 374 },
  kadiatou: { x: 250, y: 374 },
  ismael:   { x: 52,  y: 520 },
  soumba:   { x: 170, y: 520 },
  bamba:    { x: 292, y: 520 },
}

// ── Feuille SVG (dessinée dans le SVG global) ─────────────────────
// cx/cy = centre du nœud, toutes les feuilles autour
const LEAF_OFFSETS = [
  { dx: -R - 14, dy: -R + 4,  rotate: -50, size: 11 },
  { dx:  R + 10, dy: -R + 2,  rotate:  40, size: 11 },
  { dx: -R - 16, dy:  6,      rotate: -80, size:  9 },
  { dx:  R + 12, dy:  8,      rotate:  70, size:  9 },
  { dx: -6,      dy: -R - 12, rotate:   5, size:  8 },
]

function LeafShape({ cx, cy, color }) {
  return (
    <>
      {LEAF_OFFSETS.map((l, i) => {
        const lx = cx + l.dx
        const ly = cy + l.dy
        const s = l.size
        return (
          <g key={i} transform={`translate(${lx},${ly}) rotate(${l.rotate})`}>
            <path
              d={`M0,0 C${s*0.35},-${s*0.9} ${s},-${s} ${s*0.55},-${s*1.8}
                 C${s*0.1},-${s} -${s*0.35},-${s*0.9} 0,0 Z`}
              fill={color}
              opacity="0.88"
            />
            <line
              x1="0" y1="0"
              x2={s * 0.55} y2={-s * 1.8}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="0.5"
            />
          </g>
        )
      })}
    </>
  )
}

// ── Branches organiques SVG ───────────────────────────────────────
function TreeBranches() {
  const P = POSITIONS
  const branchColor = '#3D6B55'
  const coupleColor = '#C8A96E'
  const strokeW = 1.8

  // Midpoints couples (entre les deux membres)
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
  const m1 = mid(P.ibrahim, P.fatou)    // gen1 milieu
  const m2 = mid(P.mamadou, P.aminata)  // gen2 milieu
  const m3 = mid(P.abdoul, P.kadiatou)  // gen3 milieu

  return (
    <g>
      {/* ── Lignes couple (tirets dorés) ── */}
      {[
        [P.ibrahim, P.fatou],
        [P.mamadou, P.aminata],
        [P.abdoul, P.kadiatou],
      ].map(([a, b], i) => (
        <line
          key={i}
          x1={a.x + R} y1={a.y}
          x2={b.x - R} y2={b.y}
          stroke={coupleColor}
          strokeWidth="1.4"
          strokeDasharray="5 3"
          opacity="0.7"
        />
      ))}

      {/* ── Branche gen1 → gen2 (courbe bezier) ── */}
      <path
        d={`M ${m1.x} ${m1.y + R}
            C ${m1.x} ${m1.y + R + 40}
              ${m2.x} ${m2.y - R - 40}
              ${m2.x} ${m2.y - R}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW}
      />

      {/* ── Branche gen2 → gen3 ── */}
      <path
        d={`M ${m2.x} ${m2.y + R}
            C ${m2.x} ${m2.y + R + 40}
              ${m3.x} ${m3.y - R - 40}
              ${m3.x} ${m3.y - R}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW}
      />

      {/* ── Tronc gen3 → enfants (ramification organique) ── */}
      {/* Tronc principal vers le bas */}
      <path
        d={`M ${m3.x} ${m3.y + R}
            C ${m3.x} ${m3.y + R + 30}
              ${m3.x} ${m3.y + R + 50}
              ${m3.x} ${m3.y + R + 60}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW + 0.4}
      />
      {/* Branche gauche → Ismaël */}
      <path
        d={`M ${m3.x} ${m3.y + R + 60}
            C ${m3.x - 20} ${m3.y + R + 85}
              ${P.ismael.x + 10} ${P.ismael.y - R - 20}
              ${P.ismael.x} ${P.ismael.y - R}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW}
      />
      {/* Branche centrale → Soumba */}
      <path
        d={`M ${m3.x} ${m3.y + R + 60}
            C ${m3.x} ${m3.y + R + 90}
              ${P.soumba.x} ${P.soumba.y - R - 30}
              ${P.soumba.x} ${P.soumba.y - R}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW}
      />
      {/* Branche droite → Bamba */}
      <path
        d={`M ${m3.x} ${m3.y + R + 60}
            C ${m3.x + 20} ${m3.y + R + 85}
              ${P.bamba.x - 10} ${P.bamba.y - R - 20}
              ${P.bamba.x} ${P.bamba.y - R}`}
        fill="none" stroke={branchColor} strokeWidth={strokeW}
      />
    </g>
  )
}

// ── Nœud membre (positionné en absolu) ───────────────────────────
function MemberNode({ id, member, cx, cy, leafColor, onClick }) {
  const size = R * 2

  return (
    <div
      style={{
        position: 'absolute',
        left: cx - R,
        top:  cy - R,
        width: size,
        height: size,
        zIndex: 2,
      }}
    >
      <button
        onClick={() => onClick(id)}
        className="group"
        style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          border: `3px solid ${member.isYou ? '#FAF6EF' : member.color}`,
          background: member.photo ? '#000' : member.color,
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: member.isYou
            ? `0 0 0 4px #FAF6EF, 0 0 0 7px #C8A96E, 0 8px 24px rgba(0,0,0,0.18)`
            : `0 4px 16px rgba(0,0,0,0.14)`,
          transition: 'transform 0.15s',
        }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.93)'}
        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {member.photo ? (
          <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: R * 0.6,
            fontWeight: 700,
            color: member.text,
            userSelect: 'none',
          }}>
            {member.ini}
          </span>
        )}
      </button>
    </div>
  )
}

// ── Label sous nœud ───────────────────────────────────────────────
function MemberLabel({ member, cx, cy }) {
  return (
    <div style={{
      position: 'absolute',
      top: cy + R + 6,
      left: cx - 40,
      width: 80,
      textAlign: 'center',
      zIndex: 2,
      pointerEvents: 'none',
    }}>
      <p style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 12.5, color: '#1B3A2F', lineHeight: 1.25 }}>
        {member.name}
      </p>
      <p style={{ margin: 0, marginTop: 1, fontSize: 10, color: member.isYou ? '#C8A96E' : '#9A8878', fontStyle: member.isYou ? 'italic' : 'normal' }}>
        {member.role}
      </p>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
export default function ArbrePage() {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)

  const go = (id) => router.push(`/arbre/${id}`)

  const CANVAS_H = 640
  const leafColorFor = (id) => {
    if (['abdoul', 'kadiatou'].includes(id)) return '#C8A96E'
    if (['mamadou', 'aminata'].includes(id)) return '#4A8C6A'
    return '#2D5A45'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FAF6EF', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg,#1B3A2F 0%,#2D5A45 100%)', padding: '48px 20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, margin: 0 }}>Mon Arbre</h1>
        <button style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', fontSize: 18, cursor: 'pointer' }}>⚙️</button>
      </div>

      {/* Arbre scrollable */}
      <div style={{ flex: 1, background: '#FAF6EF', borderRadius: '24px 24px 0 0', marginTop: -16, overflowY: 'auto', paddingBottom: 120 }}>
        <div style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.25s',
          paddingTop: 24,
        }}>
          {/* Canvas positionné */}
          <div style={{
            position: 'relative',
            width: W,
            height: CANVAS_H,
            margin: '0 auto',
          }}>

            {/* SVG pour branches + feuilles (couche basse) */}
            <svg
              width={W}
              height={CANVAS_H}
              style={{ position: 'absolute', inset: 0, overflow: 'visible', zIndex: 1 }}
            >
              {/* Branches organiques */}
              <TreeBranches />

              {/* Feuilles sur chaque nœud */}
              {Object.entries(POSITIONS).map(([id, pos]) => (
                <LeafShape
                  key={id}
                  cx={pos.x}
                  cy={pos.y}
                  color={leafColorFor(id)}
                />
              ))}
            </svg>

            {/* Nœuds membres (couche haute) */}
            {Object.entries(MEMBERS).map(([id, member]) => {
              const pos = POSITIONS[id]
              return (
                <div key={id}>
                  <MemberNode id={id} member={member} cx={pos.x} cy={pos.y} onClick={go} />
                  <MemberLabel member={member} cx={pos.x} cy={pos.y} />
                </div>
              )
            })}

            {/* Boutons ajouter (ancêtres inconnus) */}
            {[{ x: 90, y: 72 - 150 }, { x: 250, y: 72 - 150 }].map((pos, i) => (
              pos.y > 0 && null
            ))}
          </div>
        </div>

        {/* Contrôles zoom */}
        <div style={{ display: 'flex', gap: 12, padding: '0 24px 8px' }}>
          {[['🔍 Zoom −', -0.15], ['🔎 Zoom +', 0.15]].map(([label, delta]) => (
            <button
              key={label}
              onClick={() => setZoom(z => Math.min(1.5, Math.max(0.45, z + delta)))}
              style={{
                flex: 1, padding: '12px 0', borderRadius: 16,
                border: '1px solid #D4C296', background: '#FFFFFF',
                color: '#1B3A2F', fontWeight: 600, fontSize: 13,
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* BottomNav */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 8px 6px',
        background: '#FFFFFF',
        borderTop: '1px solid rgba(45,90,69,0.08)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}>
        {[
          { key: 'accueil',    icon: '🏠', label: 'Accueil',   href: '/dashboard' },
          { key: 'arbre',      icon: '🌳', label: 'Arbre',      href: '/arbre' },
          { key: 'messages',   icon: '💬', label: 'Messages',   href: '/messages' },
          { key: 'evenements', icon: '📅', label: 'Événements', href: '/evenements' },
          { key: 'profil',     icon: '👤', label: 'Profil',     href: '/galerie' },
        ].map(t => {
          const active = t.key === 'arbre'
          return (
            <button
              key={t.key}
              onClick={() => router.push(t.href)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '4px 10px', borderRadius: 10,
                background: active ? '#F3EDE2' : 'transparent',
                border: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ fontSize: 10, color: active ? '#1B3A2F' : '#9A8878', fontWeight: active ? 600 : 400 }}>
                {t.label}
              </span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C8A96E' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
    }
      
