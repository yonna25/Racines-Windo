'use client'
import { useRouter, useParams } from 'next/navigation'

const MEMBERS = {
  ibrahim:  { ini: 'IB', name: 'Ibrahim Diallo',  role: 'ARRIÈRE-GP · GÉNÉRATION I',   bg: '#E2D4A8', text: '#1B3A2F', birth: '—',            origin: 'Conakry, Guinée', job: '—',           bio: '"Fondateur de notre lignée..."' },
  fatou:    { ini: 'FA', name: 'Fatou Diallo',    role: 'ARRIÈRE-GM · GÉNÉRATION I',   bg: '#E2D4A8', text: '#1B3A2F', birth: '—',            origin: 'Conakry, Guinée', job: '—',           bio: '"Gardienne de la mémoire..."' },
  mamadou:  { ini: 'MA', name: 'Mamadou Diallo',  role: 'GRAND-PÈRE · GÉNÉRATION II',  bg: '#2D5A45', text: '#FAF6EF', birth: '14 mars 1942', origin: 'Conakry, Guinée', job: 'Agriculteur', bio: '"Pilier de notre famille depuis toujours..."' },
  aminata:  { ini: 'AM', name: 'Aminata Diallo',  role: 'GRAND-MÈRE · GÉNÉRATION II',  bg: '#2D5A45', text: '#FAF6EF', birth: '3 juillet 1945', origin: 'Dakar, Sénégal', job: 'Commerçante', bio: '"Celle qui nous a tout appris..."' },
  abdoul:   { ini: 'AB', name: 'Abdoul Diallo',   role: 'PÈRE · GÉNÉRATION III',       bg: '#C8A96E', text: '#1B3A2F', birth: '22 juin 1968', origin: 'Bamako, Mali',    job: 'Enseignant',  bio: '"Père de trois enfants, fier de ses racines."' },
  kadiatou: { ini: 'KA', name: 'Kadiatou Diallo', role: 'MÈRE · GÉNÉRATION III',       bg: '#D4C296', text: '#1B3A2F', birth: '10 avril 1972', origin: 'Abidjan, CI',    job: 'Infirmière',  bio: '"Le cœur de notre foyer."' },
  ismael:   { ini: 'IS', name: 'Ismaël Diallo',   role: 'FILS · GÉNÉRATION IV',        bg: '#E2D4A8', text: '#1B3A2F', birth: '5 jan. 1995',  origin: 'Dakar, Sénégal', job: 'Ingénieur',   bio: '"Passionné de musique et de code."' },
  soumba:   { ini: 'SO', name: 'Soumba Diallo',   role: 'FILLE · GÉNÉRATION IV',       bg: '#E2D4A8', text: '#1B3A2F', birth: '18 mars 1998', origin: 'Dakar, Sénégal', job: 'Architecte',  bio: '"Bâtisseuse de demain."' },
  bamba:    { ini: 'BA', name: 'Bamba Diallo',    role: 'FILS · GÉNÉRATION IV',        bg: '#E2D4A8', text: '#1B3A2F', birth: '2 oct. 2001',  origin: 'Dakar, Sénégal', job: 'Étudiant',    bio: '"La relève de la famille."' },
}

const RELATED = {
  mamadou:  ['IB', 'FA', 'AM', 'AB'],
  aminata:  ['IB', 'FA', 'MA', 'AB'],
  abdoul:   ['MA', 'AM', 'KA', 'IS'],
  kadiatou: ['MA', 'AM', 'AB', 'SO'],
  ismael:   ['AB', 'KA', 'SO', 'BA'],
  soumba:   ['AB', 'KA', 'IS', 'BA'],
  bamba:    ['AB', 'KA', 'IS', 'SO'],
  ibrahim:  ['FA', 'MA'],
  fatou:    ['IB', 'MA'],
}

const ALL = Object.entries(MEMBERS).map(([id, m]) => ({ id, ...m }))

export default function ProfilMembre() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id || 'mamadou'
  const m = MEMBERS[id] || MEMBERS['mamadou']
  const related = (RELATED[id] || []).map(ini => ALL.find(x => x.ini === ini)).filter(Boolean)

  const infos = [
    { icon: '🎂', label: 'Naissance', value: m.birth },
    { icon: '📍', label: 'Origine',   value: m.origin },
    { icon: '💼', label: 'Profession', value: m.job },
    { icon: '📖', label: 'Bio',       value: m.bio, italic: true },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF' }}>

      {/* Header */}
      <div className="relative px-5 pt-12 pb-10 flex flex-col items-center"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        <button
          onClick={() => router.back()}
          className="absolute left-4 top-12 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        >
          <span style={{ color: '#FAF6EF' }}>‹</span>
        </button>
        <div
          className="rounded-full flex items-center justify-center font-bold mb-4"
          style={{
            width: 90, height: 90,
            background: m.bg, color: m.text,
            fontFamily: 'Cormorant Garamond, serif', fontSize: 28,
            border: '3px solid rgba(200,169,110,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {m.ini}
        </div>
        <h1 className="text-2xl font-bold text-center mb-1"
            style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
          {m.name}
        </h1>
        <p className="text-xs tracking-widest" style={{ color: 'rgba(200,169,110,0.8)' }}>
          {m.role}
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 -mt-5 rounded-t-3xl px-5 pt-6 pb-28" style={{ background: '#FAF6EF' }}>

        {/* Informations */}
        <div className="rounded-2xl overflow-hidden mb-4"
             style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <p className="px-4 pt-4 pb-2 text-xs tracking-[0.2em] uppercase font-semibold"
             style={{ color: '#C8A96E' }}>
            INFORMATIONS
          </p>
          {infos.map((info, i) => (
            <div key={info.label}
                 className="px-4 py-3 flex items-start gap-3"
                 style={{ borderTop: i > 0 ? '1px solid rgba(45,90,69,0.06)' : 'none' }}>
              <span className="text-base mt-0.5">{info.icon}</span>
              <span className="text-sm w-24 flex-shrink-0" style={{ color: '#9A8878' }}>{info.label}</span>
              <span className="text-sm font-semibold flex-1"
                    style={{ color: '#1B3A2F', fontStyle: info.italic ? 'italic' : 'normal', fontFamily: 'Cormorant Garamond, serif', fontSize: 15 }}>
                {info.value}
              </span>
            </div>
          ))}
        </div>

        {/* Liens familiaux */}
        {related.length > 0 && (
          <div className="rounded-2xl p-4"
               style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-4"
               style={{ color: '#C8A96E' }}>
              LIENS FAMILIAUX
            </p>
            <div className="flex gap-4 flex-wrap">
              {related.map(r => (
                <button
                  key={r.id}
                  onClick={() => router.push(`/arbre/${r.id}`)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="rounded-full flex items-center justify-center font-bold"
                    style={{
                      width: 52, height: 52,
                      background: r.bg, color: r.text,
                      fontFamily: 'Cormorant Garamond, serif', fontSize: 16,
                      border: '2px solid rgba(200,169,110,0.25)',
                    }}
                  >
                    {r.ini}
                  </div>
                  <span className="text-xs" style={{ color: '#9A8878' }}>{r.ini === 'IB' ? 'Ibrahim' : r.ini === 'FA' ? 'Fatou' : r.ini === 'MA' ? 'Mamadou' : r.ini === 'AM' ? 'Aminata' : r.ini === 'AB' ? 'Abdoul' : r.ini === 'KA' ? 'Kadiatou' : r.ini === 'IS' ? 'Ismaël' : r.ini === 'SO' ? 'Soumba' : 'Bamba'}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav active="arbre" />
    </div>
  )
}

function BottomNav({ active }) {
  const router = useRouter()
  const tabs = [
    { key: 'accueil',    icon: '🏠', label: 'Accueil',   href: '/dashboard' },
    { key: 'arbre',      icon: '🌳', label: 'Arbre',      href: '/arbre' },
    { key: 'messages',   icon: '💬', label: 'Messages',   href: '/messages' },
    { key: 'evenements', icon: '📅', label: 'Événements', href: '/evenements' },
    { key: 'profil',     icon: '👤', label: 'Profil',     href: '/galerie' },
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
                        
