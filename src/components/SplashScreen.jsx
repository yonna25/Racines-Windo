'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="splash-root">

      {/* ── Background image ── */}
      <div className="splash-bg" />

      {/* ── Blue night overlay ── */}
      <div className="splash-night" />

      {/* ── Sun glow behind baobab ── */}
      <div className="splash-sun" />

      {/* ── Root amber glow ── */}
      <div className="splash-roots" />

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

        <h1 className={`splash-title ${loaded ? 'splash-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}>
          Racines
        </h1>

        <p className={`splash-tagline ${loaded ? 'splash-in-up' : 'opacity-0'}`}
           style={{ animationDelay: '0.5s' }}>
          Ta lignée · Ton histoire
        </p>

        {/* ornament */}
        <div className={`splash-ornament ${loaded ? 'splash-in-up' : 'opacity-0'}`}
             style={{ animationDelay: '0.7s' }}>
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

        /* Background baobab image */
        .splash-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/baobab.png');
          background-size: cover;
          background-position: center 20%;
        }

        /* Deep blue night overlay */
        .splash-night {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(3,8,30,0.65) 0%,
            rgba(8,18,60,0.50) 15%,
            rgba(15,35,90,0.35) 30%,
            rgba(25,55,110,0.20) 45%,
            rgba(40,70,120,0.10) 60%,
            transparent 75%
          );
        }

        /* Golden sun glow center */
        .splash-sun {
          position: absolute;
          top: 28%;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255,180,60,0.22) 0%,
            rgba(220,130,20,0.10) 45%,
            transparent 70%
          );
          filter: blur(24px);
          animation: sunPulse 5s ease-in-out infinite;
        }

        /* Orange roots glow */
        .splash-roots {
          position: absolute;
          bottom: 26%;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 120px;
          background: radial-gradient(
            ellipse,
            rgba(255,140,20,0.28) 0%,
            transparent 70%
          );
          filter: blur(14px);
          animation: rootPulse 3.5s ease-in-out infinite 1s;
        }

        /* Top dark fade */
        .splash-fade-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 22%;
          background: linear-gradient(180deg, rgba(3,8,20,0.70) 0%, transparent 100%);
        }

        /* Bottom warm-dark fade */
        .splash-fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(
            0deg,
            rgba(3,6,18,0.98) 0%,
            rgba(5,10,30,0.94) 22%,
            rgba(8,18,55,0.80) 42%,
            rgba(12,30,80,0.50) 60%,
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

        /* Animations */
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

        @keyframes sunPulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.12); }
        }

        @keyframes rootPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
