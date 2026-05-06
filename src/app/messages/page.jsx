'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const INITIAL_MESSAGES = [
  {
    id: 1, from: 'MA', sender: 'Mamadou', role: 'Grand-père',
    text: 'Que la paix soit sur vous tous, mes enfants. Pensez à appeler vos cousins ce weekend 🙏',
    time: 'Hier · 20:14', own: false, type: 'text',
  },
  {
    id: 2, from: 'KA', sender: 'Kadiatou', role: 'Mère',
    photo: true, caption: 'Réunion de famille — Dakar 1998',
    time: 'Hier · 21:02', own: false, type: 'photo',
  },
  {
    id: 3, from: 'AB', sender: 'Vous', role: '',
    text: 'Quelle belle photo ! Je me souviens de ce jour comme si c\'était hier ❤️',
    time: 'Hier · 21:15', own: true, type: 'text',
  },
]

const AVATAR_COLORS = {
  MA: { bg: '#D4C296', text: '#1B3A2F' },
  KA: { bg: '#C8A96E', text: '#1B3A2F' },
  AB: { bg: '#C8A96E', text: '#1B3A2F' },
}

export default function MessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages(m => [...m, {
      id: Date.now(), from: 'AB', sender: 'Vous', role: '',
      text: input, time: `Aujourd'hui · ${time}`, own: true, type: 'text',
    }])
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAF6EF' }}>

      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex justify-between items-end"
           style={{ background: 'linear-gradient(160deg, #1B3A2F 0%, #2D5A45 100%)' }}>
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: '#FAF6EF', fontFamily: 'Cormorant Garamond, serif' }}>
            Famille Diallo
          </h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(250,246,239,0.5)' }}>47 membres · Fil privé</p>
        </div>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
          <span className="text-xl">🔔</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 -mt-4 rounded-t-3xl overflow-y-auto px-4 py-6 pb-32 flex flex-col gap-5"
           style={{ background: '#FAF6EF' }}>
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.own ? 'items-end' : 'items-start'} gap-1.5`}>
            {!m.own && (
              <span className="text-xs ml-11" style={{ color: '#9A8878' }}>
                {m.sender} · {m.role}
              </span>
            )}
            <div className={`flex items-end gap-2 ${m.own ? 'flex-row-reverse' : 'flex-row'}`}>
              {!m.own && (
                <div
                  className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  style={{
                    width: 34, height: 34,
                    background: AVATAR_COLORS[m.from]?.bg || '#E2D4A8',
                    color: AVATAR_COLORS[m.from]?.text || '#1B3A2F',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 12,
                  }}
                >
                  {m.from}
                </div>
              )}

              {m.type === 'photo' ? (
                <div className="rounded-2xl overflow-hidden" style={{ width: 220, background: '#E2D4A8' }}>
                  <div className="flex items-center justify-center" style={{ height: 130, background: 'linear-gradient(135deg, #D4C296, #E8DFC9)', fontSize: 48 }}>
                    🏠
                  </div>
                  <p className="px-3 py-2 text-xs" style={{ color: '#9A8878' }}>{m.caption}</p>
                </div>
              ) : (
                <div
                  className="px-4 py-3 text-sm leading-relaxed"
                  style={{
                    maxWidth: 250,
                    background: m.own ? '#1B3A2F' : '#FFFFFF',
                    color: m.own ? '#FAF6EF' : '#1B3A2F',
                    borderRadius: m.own ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {m.text}
                </div>
              )}

              {m.own && (
                <div
                  className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  style={{
                    width: 34, height: 34,
                    background: '#C8A96E', color: '#1B3A2F',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: 12,
                  }}
                >
                  AB
                </div>
              )}
            </div>
            <span className={`text-xs ${m.own ? 'mr-11' : 'ml-11'}`} style={{ color: '#C8C0B4' }}>
              {m.time}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-3"
           style={{ background: '#FAF6EF', borderTop: '1px solid rgba(45,90,69,0.08)' }}>
        <button className="text-xl flex-shrink-0">📎</button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Écrire un message..."
          className="flex-1 py-3 px-4 rounded-full text-sm outline-none"
          style={{
            background: '#FFFFFF', border: '1px solid rgba(45,90,69,0.12)',
            color: '#1B3A2F', fontFamily: 'DM Sans, sans-serif',
          }}
        />
        <button
          onClick={send}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-base"
          style={{ background: '#1B3A2F' }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
