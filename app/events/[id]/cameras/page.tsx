import { notFound } from "next/navigation"
import { mockEvents, mockCameras } from "@/lib/mock-data"
import { EventHeader } from "@/components/event-header"
import { CamerasContent } from "@/components/cameras-content"

interface CamerasPageProps {
  params: Promise<{ id: string }>
}

export default async function CamerasPage({ params }: CamerasPageProps) {
  const { id } = await params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <EventHeader event={event} />
      <CamerasContent cameras={mockCameras} eventId={id} />
    </div>
  )
}
