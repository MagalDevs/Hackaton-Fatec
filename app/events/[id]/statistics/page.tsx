import { notFound } from "next/navigation"
import { mockEvents, mockOccurrences } from "@/lib/mock-data"
import { EventHeader } from "@/components/event-header"
import { StatisticsContent } from "@/components/statistics-content"

interface StatisticsPageProps {
  params: Promise<{ id: string }>
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  const eventOccurrences = mockOccurrences.filter((occ) => occ.eventId === id)

  return (
    <div className="min-h-screen bg-background">
      <EventHeader event={event} />
      <StatisticsContent eventId={id} initialOccurrences={eventOccurrences} />
    </div>
  )
}
