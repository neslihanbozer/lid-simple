import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Leben in Deutschland Test | Einbürgerungstest',
  description: 'Kontaktieren Sie uns für Fragen, Feedback oder Unterstützung zum Leben in Deutschland Test.',
  keywords: 'Kontakt, Support, Hilfe, Feedback, Einbürgerungstest',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
