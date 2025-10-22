import { notFound } from "next/navigation"
import { mockEvents, mockCameras } from "@/lib/mock-data"
import { EventHeader } from "@/components/event-header"
import { CameraGrid } from "@/components/camera-grid"
import { CameraControls } from "@/components/camera-controls"

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

      <main className="container mx-auto px-4 py-6 space-y-6">
        <CameraControls totalCameras={mockCameras.length} />
        <CameraGrid cameras={mockCameras} eventId={id} />
      </main>
    </div>
  )
}
