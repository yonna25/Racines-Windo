'use client'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/SplashScreen'

export default function Home() {
  const router = useRouter()
  return <SplashScreen onComplete={() => router.push('/dashboard')} />
}
