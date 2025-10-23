import { notFound } from "next/navigation"
import { mockEvents, mockCameras, mockAgents, mockVehicles } from "@/lib/mock-data"
import { EventHeader } from "@/components/event-header"
import { EventMap } from "@/components/event-map"
import { EventStats } from "@/components/event-stats"
import { ResourceList } from "@/components/resource-list"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <EventHeader event={event} />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <EventStats event={event} />

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventMap
              cameras={mockCameras}
              agents={mockAgents}
              vehicles={mockVehicles}
              eventLocation={event.location}
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <ResourceList title="Câmeras" items={mockCameras} type="camera" />
            <ResourceList title="Agentes" items={mockAgents} type="agent" />
            <ResourceList title="Viaturas" items={mockVehicles} type="vehicle" />
          </div>
        </div>
      </main>
    </div>
  )
}
