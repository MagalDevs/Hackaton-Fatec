import { notFound } from "next/navigation"
import { mockEvents, mockAgents, mockVehicles } from "@/lib/mock-data"
import { EventHeader } from "@/components/event-header"
import { EventMap } from "@/components/event-map"
import { TrackingPanel } from "@/components/tracking-panel"

interface TrackingPageProps {
  params: Promise<{ id: string }>
}

export default async function TrackingPage({ params }: TrackingPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <EventHeader event={event} />

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventMap agents={mockAgents} vehicles={mockVehicles} eventLocation={event.location} />
          </div>
          <div>
            <TrackingPanel agents={mockAgents} vehicles={mockVehicles} />
          </div>
        </div>
      </main>
    </div>
  )
}
