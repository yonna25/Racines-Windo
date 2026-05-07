'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BaobabSVG from './BaobabSVG'

export default function SplashScreen() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      background: '#030814',
    }}>

      {/* ── Layer 1 : Baobab SVG (fond) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <BaobabSVG style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* ── Layer 2 : Blue night overlay ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: `linear-gradient(
          180deg,
          rgba(3,8,30,0.45) 0%,
          rgba(8,18,60,0.30) 20%,
          rgba(15,35,90,0.15) 40%,
          transparent 65%
        )`,
      }} />

      {/* ── Layer 3 : Top fade ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '20%',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(3,8,20,0.70) 0%, transparent 100%)',
      }} />

      {/* ── Layer 4 : Bottom dark fade ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '60%',
        zIndex: 2,
        background: `linear-gradient(
          0deg,
          rgba(3,6,18,0.98) 0%,
          rgba(5,10,30,0.94) 22%,
          rgba(8,18,55,0.82) 42%,
          rgba(12,30,80,0.50) 60%,
          transparent 100%
        )`,
      }} />

      {/* ── Layer 5 : Grain ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ── Layer 6 : WINDO label ── */}
      <div style={{
        position: 'absolute',
        top: '44px',
        left: 0, right: 0,
        zIndex: 10,
        textAlign: 'center',
        fontFamily: "'Cinzel', serif",
        fontSize: '11px',
        letterSpacing: '0.38em',
        color: 'rgba(160,200,255,0.50)',
        textShadow: '0 0 20px rgba(100,160,255,0.35)',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(-14px)',
        transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
      }}>
        W I N D O
      </div>

      {/* ── Layer 7 : Bottom content ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '0 28px 52px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* App name */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(52px, 15vw, 70px)',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.06em',
          lineHeight: 1,
          textAlign: 'center',
          margin: 0,
          textShadow: `
            0 0 60px rgba(100,160,255,0.4),
            0 0 120px rgba(60,100,200,0.2),
            0 2px 20px rgba(0,0,0,0.8)
          `,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}>
          Racines
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '16px',
          color: 'rgba(180,210,255,0.52)',
          letterSpacing: '0.08em',
          marginTop: '8px',
          textAlign: 'center',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.5s',
        }}>
          Ta lignée · Ton histoire
        </p>

        {/* Ornament */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: '20px 0 22px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.7s',
        }}>
          <span style={{ display: 'block', width: '56px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(180,210,255,0.4))' }} />
          <span style={{ display: 'block', width: '6px', height: '6px', background: '#6AAAF0', transform: 'rotate(45deg)', boxShadow: '0 0 10px rgba(106,170,240,0.7)' }} />
          <span style={{ display: 'block', width: '56px', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(180,210,255,0.4))' }} />
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            width: '100%',
            padding: '17px',
            background: 'linear-gradient(135deg, #1A50A0, #2870C8, #3A90E0)',
            borderRadius: '14px',
            border: '1px solid rgba(100,180,255,0.25)',
            fontFamily: "'Cinzel', serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#E8F4FF',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(26,80,160,0.55), 0 1px 0 rgba(255,255,255,0.15) inset',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.9s',
          }}
        >
          COMMENCER
        </button>

        {/* Sign in */}
        <button
          onClick={() => router.push('/login')}
          style={{
            marginTop: '16px',
            background: 'none',
            border: 'none',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '14px',
            color: 'rgba(180,210,255,0.30)',
            cursor: 'pointer',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 1.1s',
          }}
        >
          Déjà membre ?{' '}
          <span style={{
            color: 'rgba(106,170,240,0.60)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}>
            Se connecter
          </span>
        </button>

      </div>
    </div>
  )
}
