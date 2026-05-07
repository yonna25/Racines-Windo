'use client'

export default function BaobabSVG({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 400 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        {/* Golden sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0A020" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#D06010" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A03000" stopOpacity="0" />
        </radialGradient>

        {/* Halo ring gradient */}
        <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="#D4920A" stopOpacity="0" />
          <stop offset="95%" stopColor="#F0B830" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F0B830" stopOpacity="0" />
        </radialGradient>

        {/* Root glow gradient */}
        <radialGradient id="rootGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#D45A00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B2500" stopOpacity="0" />
        </radialGradient>

        {/* Root line gradient */}
        <linearGradient id="rootLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9500" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF5500" stopOpacity="0.2" />
        </linearGradient>

        {/* Trunk gradient */}
        <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A0A02" />
          <stop offset="50%" stopColor="#2A1208" />
          <stop offset="100%" stopColor="#1A0A02" />
        </linearGradient>

        {/* Sky/background gradient */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#030814" />
          <stop offset="35%" stopColor="#060F28" />
          <stop offset="60%" stopColor="#0A1840" />
          <stop offset="80%" stopColor="#0D1530" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>

        {/* Ground gradient */}
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A0805" />
          <stop offset="100%" stopColor="#050302" />
        </linearGradient>

        {/* Glow filter for roots */}
        <filter id="rootGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft glow filter */}
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Star filter */}
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── SKY BACKGROUND ── */}
      <rect width="400" height="600" fill="url(#skyGrad)" />

      {/* ── STARS ── */}
      {[
        [40,30,0.6],[80,18,0.4],[130,8,0.7],[180,22,0.5],[240,12,0.6],
        [290,28,0.4],[340,16,0.7],[370,35,0.5],[20,55,0.4],[100,48,0.6],
        [160,40,0.3],[220,50,0.5],[300,44,0.4],[360,52,0.6],[60,75,0.3],
        [140,68,0.5],[260,72,0.4],[320,65,0.6],[380,78,0.3],[10,90,0.4],
      ].map(([x, y, op], i) => (
        <circle
          key={i} cx={x} cy={y} r={op > 0.5 ? 1.2 : 0.8}
          fill="white" opacity={op}
          filter="url(#starGlow)"
        />
      ))}

      {/* ── MOUNTAINS SILHOUETTE ── */}
      <path
        d="M0 310 L60 240 L100 265 L150 210 L200 245 L250 200 L300 235 L340 215 L400 250 L400 320 L0 320 Z"
        fill="#080C1A"
        opacity="0.85"
      />
      <path
        d="M0 330 L50 280 L90 295 L140 265 L180 280 L230 255 L280 270 L330 258 L370 272 L400 265 L400 340 L0 340 Z"
        fill="#060A14"
        opacity="0.9"
      />

      {/* ── GROUND ── */}
      <path
        d="M0 340 Q100 332 200 336 Q300 340 400 334 L400 600 L0 600 Z"
        fill="url(#groundGrad)"
      />

      {/* ── SUN GLOW ── */}
      <ellipse cx="200" cy="300" rx="110" ry="100" fill="url(#sunGlow)">
        <animate attributeName="rx" values="110;125;110" dur="5s" repeatCount="indefinite" />
        <animate attributeName="ry" values="100;115;100" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite" />
      </ellipse>

      {/* ── HALO RING ── */}
      <circle cx="200" cy="260" r="145" fill="none" stroke="#D4920A" strokeWidth="1" opacity="0.5">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="260" r="148" fill="none" stroke="#F0B830" strokeWidth="0.5" opacity="0.25" />

      {/* ── BAOBAB TRUNK ── */}
      {/* Main trunk body - wide baobab trunk */}
      <path
        d="M155 338 Q148 310 152 280 Q155 255 158 235 Q162 215 165 195 Q168 180 170 165 Q172 155 174 145 Q176 135 178 125 Q180 115 182 105 Q184 95 186 85 L200 80 L214 85 Q216 95 218 105 Q220 115 222 125 Q224 135 226 145 Q228 155 230 165 Q232 180 235 195 Q238 215 242 235 Q245 255 248 280 Q252 310 245 338 Q230 345 200 347 Q170 345 155 338 Z"
        fill="url(#trunkGrad)"
      />

      {/* Trunk texture lines */}
      <path d="M175 200 Q172 240 170 280 Q168 310 168 335" stroke="#0A0402" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M200 180 Q200 220 200 260 Q200 300 200 340" stroke="#0A0402" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M225 200 Q228 240 230 280 Q232 310 232 335" stroke="#0A0402" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* ── BRANCHES ── */}
      {/* Left main branch */}
      <path d="M174 145 Q155 125 130 110 Q110 98 85 95" stroke="#100804" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M85 95 Q65 90 45 85" stroke="#100804" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M85 95 Q70 105 52 108" stroke="#100804" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M130 110 Q115 95 100 88" stroke="#100804" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M100 88 Q88 80 75 76" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M100 88 Q90 96 78 100" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Left upper branch */}
      <path d="M178 125 Q158 105 138 92 Q118 80 95 74" stroke="#100804" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M95 74 Q78 68 62 62" stroke="#100804" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M62 62 Q50 58 38 52" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M62 62 Q54 68 44 72" stroke="#100804" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M95 74 Q80 82 66 86" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Right main branch */}
      <path d="M226 145 Q245 125 270 110 Q290 98 315 95" stroke="#100804" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d="M315 95 Q335 90 355 85" stroke="#100804" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M315 95 Q330 105 348 108" stroke="#100804" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M270 110 Q285 95 300 88" stroke="#100804" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M300 88 Q312 80 325 76" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M300 88 Q310 96 322 100" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Right upper branch */}
      <path d="M222 125 Q242 105 262 92 Q282 80 305 74" stroke="#100804" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M305 74 Q322 68 338 62" stroke="#100804" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M338 62 Q350 58 362 52" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M338 62 Q346 68 356 72" stroke="#100804" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M305 74 Q320 82 334 86" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Center top branches */}
      <path d="M186 85 Q178 65 168 48 Q158 35 148 24" stroke="#100804" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M148 24 Q138 14 128 8" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M148 24 Q142 32 134 38" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />

      <path d="M200 80 Q200 58 200 38 Q200 22 200 10" stroke="#100804" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M200 10 Q192 2 182 -2" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M200 10 Q208 2 218 -2" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />

      <path d="M214 85 Q222 65 232 48 Q242 35 252 24" stroke="#100804" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M252 24 Q262 14 272 8" stroke="#100804" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M252 24 Q258 32 266 38" stroke="#100804" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Small twigs */}
      <path d="M45 85 Q36 78 28 74" stroke="#100804" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M45 85 Q38 92 30 96" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M355 85 Q364 78 372 74" stroke="#100804" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M355 85 Q362 92 370 96" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M52 108 Q44 116 36 120" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M348 108 Q356 116 364 120" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M66 86 Q58 92 50 98" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M334 86 Q342 92 350 98" stroke="#100804" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* ── TRUNK BASE / ROOTS TRANSITION ── */}
      <path
        d="M148 338 Q140 345 130 352 Q115 360 100 365 Q80 370 60 368"
        stroke="#1A0804" strokeWidth="8" strokeLinecap="round" fill="none"
      />
      <path
        d="M252 338 Q260 345 270 352 Q285 360 300 365 Q320 370 340 368"
        stroke="#1A0804" strokeWidth="8" strokeLinecap="round" fill="none"
      />

      {/* ── GROUND LINE ── */}
      <path d="M0 342 Q100 336 200 340 Q300 344 400 338" stroke="#2A1008" strokeWidth="2" fill="none" opacity="0.6" />

      {/* ── GLOWING ROOTS ── */}
      {/* Root glow base */}
      <ellipse cx="200" cy="400" rx="160" ry="80" fill="url(#rootGlow)" opacity="0.6">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Main root — center down */}
      <path
        d="M200 345 Q200 370 200 400 Q200 430 200 460 Q200 490 200 520"
        stroke="#FF8C00" strokeWidth="3" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.9"
      >
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Root left 1 */}
      <path
        d="M185 355 Q170 375 155 395 Q135 420 110 440 Q85 460 55 475"
        stroke="#FF7000" strokeWidth="2.5" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.85"
      >
        <animate attributeName="opacity" values="0.6;0.95;0.6" dur="3s" repeatCount="indefinite" begin="0.3s" />
      </path>

      {/* Root left 2 */}
      <path
        d="M175 360 Q155 385 130 408 Q100 435 65 455 Q35 472 10 485"
        stroke="#E86000" strokeWidth="2" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.75"
      >
        <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.5s" repeatCount="indefinite" begin="0.7s" />
      </path>

      {/* Root left 3 — wide */}
      <path
        d="M165 370 Q140 400 110 425 Q75 455 35 478 Q15 490 0 498"
        stroke="#D05000" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.65"
      >
        <animate attributeName="opacity" values="0.4;0.75;0.4" dur="4s" repeatCount="indefinite" begin="1s" />
      </path>

      {/* Root right 1 */}
      <path
        d="M215 355 Q230 375 245 395 Q265 420 290 440 Q315 460 345 475"
        stroke="#FF7000" strokeWidth="2.5" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.85"
      >
        <animate attributeName="opacity" values="0.6;0.95;0.6" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </path>

      {/* Root right 2 */}
      <path
        d="M225 360 Q245 385 270 408 Q300 435 335 455 Q365 472 390 485"
        stroke="#E86000" strokeWidth="2" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.75"
      >
        <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3.5s" repeatCount="indefinite" begin="0.9s" />
      </path>

      {/* Root right 3 — wide */}
      <path
        d="M235 370 Q260 400 290 425 Q325 455 365 478 Q385 490 400 498"
        stroke="#D05000" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#rootGlowFilter)" opacity="0.65"
      >
        <animate attributeName="opacity" values="0.4;0.75;0.4" dur="4s" repeatCount="indefinite" begin="1.2s" />
      </path>

      {/* Sub-roots left */}
      <path d="M155 395 Q140 415 125 435 Q108 455 88 470" stroke="#C04800" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.6" />
      <path d="M110 440 Q95 458 78 472 Q60 486 40 495" stroke="#B04000" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.5" />
      <path d="M130 408 Q118 428 105 448 Q90 468 72 482" stroke="#B84500" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.5" />

      {/* Sub-roots right */}
      <path d="M245 395 Q260 415 275 435 Q292 455 312 470" stroke="#C04800" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.6" />
      <path d="M290 440 Q305 458 322 472 Q340 486 360 495" stroke="#B04000" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.5" />
      <path d="M270 408 Q282 428 295 448 Q310 468 328 482" stroke="#B84500" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.5" />

      {/* Center root splits */}
      <path d="M200 420 Q188 445 175 465 Q160 485 142 500" stroke="#D06000" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.7" />
      <path d="M200 420 Q212 445 225 465 Q240 485 258 500" stroke="#D06000" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.7" />
      <path d="M200 460 Q195 480 190 500 Q185 520 182 540" stroke="#C05500" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.55" />
      <path d="M200 460 Q205 480 210 500 Q215 520 218 540" stroke="#C05500" strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#rootGlowFilter)" opacity="0.55" />

      {/* Deep root tips glow dots */}
      {[
        [55,475],[10,485],[142,500],[182,540],[218,540],[258,500],[345,475],[390,485]
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#FF8C00" opacity="0.4" filter="url(#softGlow)">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.2}s`} />
        </circle>
      ))}

    </svg>
  )
        }
      
