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
    <div className="splash-root">

      {/* ── Baobab SVG full background ── */}
      <div className="splash-baobab">
        <BaobabSVG style={{ width: '100%', height: '100%' }} />
      </div>

      {/* ── Blue night overlay ── */}
      <div className="splash-night" />

      {/* ── Top fade ── */}
      <div className="splash-fade-top" />

      {/* ── Bottom fade ── */}
      <div className="splash-fade-bottom" />

      {/* ── Grain texture ── */}
      <div className="splash-grain" />

      {/* ── WINDO label top ── */}
      <div className={`splash-windo ${loaded ? 'splash-in-down' : 'opacity-0'}`}>
        W I N D O
      </div>

      {/* ── Bottom content ── */}
      <div className="splash-content">

        <h1
          className={`splash-title ${loaded ? 'splash-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Racines
        </h1>

        <p
          className={`splash-tagline ${loaded ? 'splash-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          Ta lignée · Ton histoire
        </p>

        {/* Ornament divider */}
        <div
          className={`splash-ornament ${loaded ? 'splash-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.7s' }}
        >
          <span className="orn-line" />
          <span className="orn-diamond" />
          <span className="orn-line orn-line-rev" />
        </div>

        <button
          className={`splash-cta ${loaded ? 'splash-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.9s' }}
          onClick={() => router.push('/dashboard')}
        >
          COMMENCER
        </button>

        <button
          className={`splash-signin ${loaded ? 'splash-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '1.1s' }}
          onClick={() => router.push('/login')}
        >
          Déjà membre ? <span>Se connecter</span>
        </button>

      </div>

      <style jsx>{`

        .splash-root {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #030814;
          font-family: 'Cinzel', serif;
        }

        /* BaobabSVG plein écran */
        .splash-baobab {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .splash-baobab svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Blue night overlay */
        .splash-night {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(3,8,30,0.45) 0%,
            rgba(8,18,60,0.30) 20%,
            rgba(15,35,90,0.15) 40%,
            transparent 65%
          );
        }

        /* Top dark fade */
        .splash-fade-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 20%;
          background: linear-gradient(180deg, rgba(3,8,20,0.65) 0%, transparent 100%);
        }

        /* Bottom dark-blue fade */
        .splash-fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 58%;
          background: linear-gradient(
            0deg,
            rgba(3,6,18,0.98) 0%,
            rgba(5,10,30,0.94) 22%,
            rgba(8,18,55,0.80) 42%,
            rgba(12,30,80,0.48) 60%,
            transparent 100%
          );
        }

        /* Film grain */
        .splash-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* WINDO top label */
        .splash-windo {
          position: absolute;
          top: 44px;
          left: 0; right: 0;
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.38em;
          color: rgba(160,200,255,0.45);
          text-shadow: 0 0 20px rgba(100,160,255,0.3);
          z-index: 10;
        }

        /* Bottom content block */
        .splash-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 28px 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
        }

        /* App name */
        .splash-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 15vw, 72px);
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.06em;
          line-height: 1;
          text-align: center;
          text-shadow:
            0 0 60px rgba(100,160,255,0.4),
            0 0 120px rgba(60,100,200,0.2),
            0 2px 20px rgba(0,0,0,0.8);
        }

        /* Tagline */
        .splash-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 16px;
          color: rgba(180,210,255,0.5);
          letter-spacing: 0.08em;
          margin-top: 8px;
          text-align: center;
        }

        /* Ornament divider */
        .splash-ornament {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0 22px;
        }

        .orn-line {
          display: block;
          width: 56px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(180,210,255,0.4));
        }

        .orn-line-rev {
          background: linear-gradient(270deg, transparent, rgba(180,210,255,0.4));
        }

        .orn-diamond {
          display: block;
          width: 6px;
          height: 6px;
          background: #6AAAF0;
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(106,170,240,0.7);
        }

        /* CTA button */
        .splash-cta {
          width: 100%;
          padding: 17px;
          background: linear-gradient(135deg, #1A50A0, #2870C8, #3A90E0);
          border-radius: 14px;
          border: 1px solid rgba(100,180,255,0.25);
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 500;
          color: #E8F4FF;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow:
            0 8px 32px rgba(26,80,160,0.55),
            0 1px 0 rgba(255,255,255,0.15) inset;
        }

        .splash-cta:hover {
          background: linear-gradient(135deg, #2060B8, #3080D8, #4AA0F0);
          transform: translateY(-1px);
          box-shadow: 0 12px 40px rgba(26,80,160,0.65), 0 1px 0 rgba(255,255,255,0.15) inset;
        }

        .splash-cta:active {
          transform: scale(0.97) translateY(0);
        }

        /* Sign in link */
        .splash-signin {
          margin-top: 16px;
          background: none;
          border: none;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(180,210,255,0.28);
          cursor: pointer;
          transition: color 0.2s;
        }

        .splash-signin span {
          color: rgba(106,170,240,0.55);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .splash-signin:hover {
          color: rgba(180,210,255,0.5);
        }

        /* ── Animations ── */
        .splash-in-down {
          animation: fadeInDown 1s cubic-bezier(0.16,1,0.3,1) both;
        }

        .splash-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

      `}</style>
    </div>
  )
}
