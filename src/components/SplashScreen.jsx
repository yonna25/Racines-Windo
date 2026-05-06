'use client'
import { useEffect, useState } from 'react'
import BaobabSVG from '@/components/BaobabSVG'

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 75}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 4}s`,
  duration: `${2.5 + Math.random() * 3}s`,
}))

const FIGURES = [
  { id: 'patriarch', x: 6,  w: 28, h: 85, delay: '1.2s', path: 'M14 85 L14 40 Q14 30 17 25 Q20 20 22 18 Q24 16 22 13 Q20 10 18 12 Q14 14 13 18 Q11 23 13 28 L13 85 M13 28 Q8 35 6 42 M13 28 Q9 32 4 30 M22 40 Q26 35 30 38' },
  { id: 'grandma',   x: 13, w: 30, h: 80, delay: '1.4s', path: 'M15 80 L15 45 Q13 35 15 28 Q17 22 20 18 Q23 14 20 11 Q17 8 14 11 Q11 14 12 18 Q13 22 15 28 Q10 32 8 40 Q6 50 8 60 L8 80 M15 28 Q20 32 22 40 Q24 50 22 60 L22 80' },
  { id: 'father',    x: 23, w: 26, h: 90, delay: '1.0s', path: 'M13 90 L13 42 Q11 32 13 24 Q15 17 17 14 Q19 11 17 8 Q15 5 12 7 Q9 9 10 14 Q11 17 13 24 M13 24 Q8 30 6 38 L5 55 M13 24 Q18 30 20 38 L21 55' },
  { id: 'mother',    x: 32, w: 32, h: 82, delay: '1.6s', path: 'M12 82 L12 44 Q10 34 12 26 Q14 19 17 16 Q19 13 17 10 Q15 7 12 9 Q9 11 10 16 Q11 19 12 26 M12 26 Q7 32 6 40 L6 56 M12 26 Q17 32 18 40 L19 56 M20 30 Q26 26 28 22 Q29 18 26 16 Q23 14 21 18 Q19 22 20 26 Q20 30 22 32 L22 40' },
  { id: 'child1',    x: 46, w: 20, h: 62, delay: '1.8s', path: 'M10 62 L10 32 Q9 25 10 19 Q12 14 13 12 Q14 10 13 8 Q12 6 10 7 Q8 8 9 12 Q10 14 10 19 M10 19 Q6 23 5 29 L5 40 M10 19 Q14 23 15 29 L16 40' },
  { id: 'child2',    x: 55, w: 18, h: 52, delay: '2.0s', path: 'M9 52 L9 27 Q8 21 9 16 Q11 12 12 10 Q13 8 12 6 Q11 4 9 5 Q7 6 8 10 Q9 12 9 16 M9 16 Q6 19 5 24 L5 33 M9 16 Q12 19 13 24 L14 33' },
  { id: 'toddler',   x: 62, w: 14, h: 40, delay: '2.2s', path: 'M7 40 L7 21 Q6 16 7 12 Q8 9 9 8 Q10 6 9 5 Q8 3 7 4 Q5 5 6 8 Q7 9 7 12 M7 12 Q4 15 4 19 L4 27 M7 12 Q10 15 10 19 L11 27' },
]

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading')
  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #1A0A3A 0%, #3D1A5A 15%, #7A2E1A 40%, #C96A10 65%, #E8901A 80%, #D4720A 90%, #1A0804 100%)',
      }}
    >
      {/* Grain overlay */}
      <div className="grain" />
      <div className="geo-pattern" />

      {/* Étoiles */}
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

      {/* Lune */}
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
      {/* Petite étoile brillante */}
      <div
        className="absolute rounded-full"
        style={{
          top: '14%', left: '30%',
          width: 6, height: 6,
          background: '#FFF5B0',
          boxShadow: '0 0 8px rgba(255,245,176,0.8)',
        }}
      />

      {/* Icône app */}
      <div
        className="absolute flex items-center justify-center rounded-2xl"
        style={{
          top: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 72, height: 72,
          background: 'linear-gradient(135deg, #E8A820, #C8800A)',
          boxShadow: '0 8px 32px rgba(232,168,32,0.4)',
          animation: 'fadeUp 1s ease 0.3s both',
          fontSize: 38,
        }}
      >
        🌳
      </div>

      {/* Baobab SVG */}
      <div
        className="absolute"
        style={{ bottom: '22%', left: '50%', transform: 'translateX(-50%)', width: 260, opacity: 0.92 }}
      >
        <BaobabSVG color="#0D0602" className="w-full h-auto drop-shadow-2xl" />
      </div>

      {/* Silhouettes personnages */}
      <div className="absolute bottom-[21%] left-0 right-0" style={{ height: 90 }}>
        {FIGURES.map(f => (
          <div
            key={f.id}
            className="absolute bottom-0"
            style={{ left: `${f.x}%`, width: f.w, height: f.h, animation: `fadeUp 0.8s ease ${f.delay} both` }}
          >
            <svg viewBox={`0 0 ${f.w} ${f.h}`} fill="none" className="w-full h-full">
              <path
                d={f.path}
                stroke="#0D0602"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#0D0602"
                fillOpacity="0.15"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Sol / herbe */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '22%', background: 'linear-gradient(180deg, #2A1A06 0%, #1A0804 100%)' }}
      >
        {[5, 12, 22, 35, 48, 58, 70, 80, 90].map((x, i) => (
          <div
            key={i}
            className="absolute bottom-full"
            style={{
              left: `${x}%`, width: 1, height: 8 + (i % 3) * 4,
              background: '#3A2A08', borderRadius: 2,
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 8}deg)`,
            }}
          />
        ))}
      </div>

      {/* Texte + CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 z-50"
        style={{
          background: 'linear-gradient(0deg, rgba(26,8,4,0.97) 0%, rgba(26,8,4,0.75) 55%, transparent 100%)',
          paddingTop: 60,
        }}
      >
        {/* Titre */}
        <p
          className="font-display font-bold tracking-wide mb-2"
          style={{
            fontSize: 64,
            color: '#FFFFFF',
            fontFamily: 'Cormorant Garamond, serif',
            lineHeight: 1,
            animation: 'fadeUp 1s ease 0.5s both',
          }}
        >
          Racines
        </p>

        {/* Sous-titre */}
        <p
          className="font-display italic text-center text-base font-light mb-4 px-8"
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Cormorant Garamond, serif',
            animation: 'fadeUp 1s ease 0.7s both',
            letterSpacing: '0.04em',
          }}
        >
          Ta lignée · Ton histoire · Ta mémoire
        </p>

        {/* Séparateur diamant */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ animation: 'fadeUp 1s ease 0.9s both' }}
        >
          <div className="h-px w-16" style={{ background: 'rgba(200,160,48,0.4)' }} />
          <div style={{ color: '#C8A030', fontSize: 10 }}>♦</div>
          <div className="h-px w-16" style={{ background: 'rgba(200,160,48,0.4)' }} />
        </div>

        {/* Bouton ou loader */}
        {phase === 'ready' ? (
          <button
            onClick={onComplete}
            className="w-4/5 py-4 rounded-full font-sans font-black tracking-[0.2em] uppercase text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #E8A820, #C8800A)',
              color: '#1A0804',
              border: 'none',
              boxShadow: '0 4px 28px rgba(232,168,32,0.45)',
              animation: 'fadeUp 0.7s ease both',
            }}
          >
            Commencer
          </button>
        ) : (
          <div
            className="relative w-40 h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(200,169,110,0.15)', animation: 'fadeUp 1s ease 1.1s both' }}
          >
            <div className="loader-bar absolute inset-0" />
          </div>
        )}

        {/* Déjà membre */}
        <p
          className="font-sans text-xs mt-5"
          style={{ color: 'rgba(255,255,255,0.4)', animation: 'fadeUp 1s ease 1.2s both' }}
        >
          Déjà membre ?{' '}
          <span
            className="underline cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  )
          }
          
