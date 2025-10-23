"use client"

import { useState } from "react"
import { CameraGrid } from "@/components/camera-grid"
import { CameraControls } from "@/components/camera-controls"
import type { Camera } from "@/lib/types"

interface CamerasContentProps {
  cameras: Camera[]
  eventId: string
}

export function CamerasContent({ cameras, eventId }: CamerasContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <CameraControls totalCameras={cameras.length} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CameraGrid cameras={cameras} eventId={eventId} searchQuery={searchQuery} />
    </main>
  )
}
