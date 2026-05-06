'use client'
import { useState } from 'react'
import SplashScreen from '@/components/SplashScreen'

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  if (!splashDone) return <SplashScreen onComplete={() => setSplashDone(true)} />
  return (
    <main className="flex items-center justify-center h-screen" style={{ background: '#0E1A15' }}>
      <p className="font-display text-2xl tracking-widest" style={{ color: '#C8A96E' }}>
        Dashboard — à venir
      </p>
    </main>
  )
}
