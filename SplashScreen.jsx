'use client'

import { useEffect, useState } from 'react'
import BaobabSVG from '@/components/BaobabSVG'

// ── Étoiles générées une fois ──────────────────────────────────────────────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top:     `${Math.random() * 75}%`,
  left:    `${Math.random() * 100}%`,
  size:    Math.random() * 2 + 1,
  delay:   `${Math.random() * 4}s`,
  duration:`${2.5 + Math.random() * 3}s`,
}))

// ── Silhouettes familiales ─────────────────────────────────────────────────
// Chaque silhouette : position x (%), largeur, hauteur, délai animation
const FIGURES = [
  // Patriarche (bâton)
  { id: 'patriarch', x: 6,  w: 28, h: 85, delay: '1.2s',
    path: 'M14 85 L14 40 Q14 30 17 25 Q20 20 22 18 Q24 16 22 13 Q20 10 18 12 Q14 14 13 18 Q11 23 13 28 L13 85 M13 28 Q8 35 6 42 M13 28 Q9 32 4 30 M22 40 Q26 35 30 38 M4 85 Q7 75 13 85' },
  // Grand-mère (voile)
  { id: 'grandma',   x: 13, w: 30, h: 80, delay: '1.4s',
    path: 'M15 80 L15 45 Q13 35 15 28 Q17 22 20 18 Q23 14 20 11 Q17 8 14 11 Q11 14 12 18 Q13 22 15 28 Q10 32 8 40 Q6 50 8 60 L8 80 M15 28 Q20 32 22 40 Q24 50 22 60 L22 80 M8 18 Q14 14 20 18' },
  // Père
  { id: 'father',    x: 23, w: 26, h: 90, delay: '1.0s',
    path: 'M13 90 L13 42 Q11 32 13 24 Q15 17 17 14 Q19 11 17 8 Q15 5 12 7 Q9 9 10 14 Q11 17 13 24 M13 24 Q8 30 6 38 L5 55 M13 24 Q18 30 20 38 L21 55' },
  // Mère + bébé
  { id: 'mother',    x: 32, w: 32, h: 82, delay: '1.6s',
    path: 'M12 82 L12 44 Q10 34 12 26 Q14 19 17 16 Q19 13 17 10 Q15 7 12 9 Q9 11 10 16 Q11 19 12 26 M12 26 Q7 32 6 40 L6 56 M12 26 Q17 32 18 40 L19 56 M20 30 Q26 26 28 22 Q29 18 26 16 Q23 14 21 18 Q19 22 20 26 Q20 30 22 32 L22 40' },
  // Enfant 1
  { id: 'child1',    x: 46, w: 20, h: 62, delay: '1.8s',
    path: 'M10 62 L10 32 Q9 25 10 19 Q12 14 13 12 Q14 10 13 8 Q12 6 10 7 Q8 8 9 12 Q10 14 10 19 M10 19 Q6 23 5 29 L5 40 M10 19 Q14 23 15 29 L16 40' },
  // Enfant 2 (plus petit)
  { id: 'child2',    x: 55, w: 18, h: 52, delay: '2.0s',
    path: 'M9 52 L9 27 Q8 21 9 16 Q11 12 12 10 Q13 8 12 6 Q11 4 9 5 Q7 6 8 10 Q9 12 9 16 M9 16 Q6 19 5 24 L5 33 M9 16 Q12 19 13 24 L14 33' },
  // Tout-petit
  { id: 'toddler',   x: 62, w: 14, h: 40, delay: '2.2s',
    path: 'M7 40 L7 21 Q6 16 7 12 Q8 9 9 8 Q10 6 9 5 Q8 3 7 4 Q5 5 6 8 Q7 9 7 12 M7 12 Q4 15 4 19 L4 27 M7 12 Q10 15 10 19 L11 27' },
]

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading') // 'loading' | 'ready'

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden select-none"
         style={{ background: 'linear-gradient(180deg, #0D0818 0%, #1A1028 18%, #2C1A0E 50%, #4A2E12 68%, #7A4A1A 80%, #C47A20 90%, #E8A030 100%)' }}>

      {/* ── Grain ── */}
      <div className="grain" />

      {/* ── Motif géométrique ── */}
      <div className="geo-pattern" />

      {/* ── Étoiles ── */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            opacity: 0.7,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* ── Lune ── */}
      <div
        className="absolute rounded-full"
        style={{
          top: '8%', left: '72%',
          width: 52, height: 52,
          background: 'radial-gradient(circle at 35% 35%, #FFF8DC, #F0D870 60%, #D4A830)',
          boxShadow: '0 0 24px rgba(240,216,112,0.5), 0 0 60px rgba(240,216,112,0.15)',
          animation: 'moonGlow 4s ease-in-out infinite',
        }}
      />
      {/* Cratères lune */}
      <div className="absolute rounded-full bg-yellow-200/20"
           style={{ top: 'calc(8% + 10px)', left: 'calc(72% + 28px)', width: 10, height: 10 }} />
      <div className="absolute rounded-full bg-yellow-200/15"
           style={{ top: 'calc(8% + 25px)', left: 'calc(72% + 12px)', width: 7, height: 7 }} />

      {/* ── Vénus ── */}
      <div className="absolute rounded-full"
           style={{
             top: '14%', left: '30%',
             width: 6, height: 6,
             background: '#FFF5B0',
             boxShadow: '0 0 8px rgba(255,245,176,0.8)',
           }} />

      {/* ── Horizon lumineux ── */}
      <div className="absolute bottom-0 left-0 right-0"
           style={{
             height: '45%',
             background: 'linear-gradient(0deg, rgba(232,160,48,0.18) 0%, transparent 100%)',
             pointerEvents: 'none',
           }} />

      {/* ── Baobab ── */}
      <div className="absolute"
           style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', width: 260, opacity: 0.92 }}>
        <BaobabSVG color="#0D0602" className="w-full h-auto drop-shadow-2xl" />
      </div>

      {/* ── Silhouettes familiales ── */}
      <div className="absolute bottom-[21%] left-0 right-0" style={{ height: 90 }}>
        {FIGURES.map(f => (
          <div
            key={f.id}
            className="absolute bottom-0"
            style={{
              left: `${f.x}%`,
              width: f.w,
              height: f.h,
              animation: `fadeUp 0.8s ease ${f.delay} both`,
            }}
          >
            <svg viewBox={`0 0 ${f.w} ${f.h}`} fill="none" xmlns="http://www.w3.org/2000/svg"
                 className="w-full h-full">
              <path d={f.path} stroke="#0D0602" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" fill="#0D0602" fillOpacity="0.15"/>
            </svg>
          </div>
        ))}
      </div>

      {/* ── Sol ── */}
      <div className="absolute bottom-0 left-0 right-0"
           style={{ height: '22%', background: 'linear-gradient(180deg, #2A1A06 0%, #1A0E04 100%)' }}>
        {/* Herbes */}
        {[5,12,22,35,48,58,70,80,90].map((x, i) => (
          <div key={i} className="absolute bottom-full"
               style={{ left: `${x}%`, width: 1, height: 8 + (i % 3) * 4,
                        background: '#3A2A08', borderRadius: 2, transform: `rotate(${(i%2===0?-1:1)*8}deg)` }} />
        ))}
      </div>

      {/* ── Contenu bas ── */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-12 z-50"
           style={{ background: 'linear-gradient(0deg, rgba(26,14,4,0.95) 0%, rgba(26,14,4,0.7) 60%, transparent 100%)',
                    paddingTop: 48 }}>

        {/* Logo text */}
        <p
          className="font-display text-5xl font-light tracking-[0.3em] uppercase mb-1"
          style={{ color: '#E2C99A', animation: 'fadeUp 1s ease 0.5s both' }}
        >
          Racines
        </p>

        {/* Ligne décorative */}
        <div className="flex items-center gap-3 mb-3"
             style={{ animation: 'fadeUp 1s ease 0.7s both' }}>
          <div className="h-px w-12" style={{ background: 'rgba(200,169,110,0.35)' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(200,169,110,0.5)' }} />
          <div className="h-px w-12" style={{ background: 'rgba(200,169,110,0.35)' }} />
        </div>

        {/* Tagline */}
        <p
          className="font-display italic text-sm font-light tracking-widest mb-8"
          style={{ color: 'rgba(200,169,110,0.55)', animation: 'fadeUp 1s ease 0.9s both' }}
        >
          Retrace tes origines
        </p>

        {/* CTA */}
        {phase === 'ready' ? (
          <button
            onClick={onComplete}
            className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              color: '#C8A96E',
              borderColor: 'rgba(200,169,110,0.4)',
              background: 'rgba(200,169,110,0.06)',
              boxShadow: '0 0 24px rgba(200,169,110,0.1)',
              animation: 'fadeUp 0.7s ease both',
            }}
          >
            Commencer
          </button>
        ) : (
          /* Loader */
          <div className="relative w-40 h-0.5 rounded-full overflow-hidden"
               style={{ background: 'rgba(200,169,110,0.15)', animation: 'fadeUp 1s ease 1.1s both' }}>
            <div className="loader-bar absolute inset-0" />
          </div>
        )}

        {/* Version */}
        <p className="font-sans text-xs mt-6"
           style={{ color: 'rgba(200,169,110,0.2)', letterSpacing: '0.15em',
                    animation: 'fadeUp 1s ease 1.3s both' }}>
          v1.0.0
        </p>
      </div>
    </div>
  )
}
