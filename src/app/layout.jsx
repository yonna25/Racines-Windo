import './globals.css'
export const metadata = {
  title: 'Racines — Retrace tes origines',
  description: "L'application qui relie les générations.",
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
