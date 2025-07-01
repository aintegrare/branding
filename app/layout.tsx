import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brand Explorer - Descubra Sua Identidade de Marca',
  description: 'Uma plataforma inovadora para explorar e definir seus arquétipos de marca, persona, ethos e buyer persona através de uma experiência imersiva de descoberta.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}