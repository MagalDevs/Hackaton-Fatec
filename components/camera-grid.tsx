"use client"

import { useState } from "react"
import type { Camera } from "@/lib/types"
import { CameraFeed } from "@/components/camera-feed"
import { Button } from "@/components/ui/button"
import { Grid3x3, Grid2x2, Maximize2 } from "lucide-react"

interface CameraGridProps {
  cameras: Camera[]
  eventId: string
}

export function CameraGrid({ cameras, eventId }: CameraGridProps) {
  const [gridLayout, setGridLayout] = useState<"2x2" | "3x3" | "4x4">("2x2")
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)

  const gridClasses = {
    "2x2": "grid-cols-1 md:grid-cols-2",
    "3x3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "4x4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  if (selectedCamera) {
    const camera = cameras.find((c) => c.id === selectedCamera)
    if (camera) {
      return (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedCamera(null)} className="gap-2">
            Voltar para grade
          </Button>
          <CameraFeed camera={camera} isFullscreen={true} />
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Visualização de Câmeras</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={gridLayout === "2x2" ? "default" : "outline"}
            size="sm"
            onClick={() => setGridLayout("2x2")}
            className="gap-2"
          >
            <Grid2x2 className="h-4 w-4" />
            2x2
          </Button>
          <Button
            variant={gridLayout === "3x3" ? "default" : "outline"}
            size="sm"
            onClick={() => setGridLayout("3x3")}
            className="gap-2"
          >
            <Grid3x3 className="h-4 w-4" />
            3x3
          </Button>
          <Button
            variant={gridLayout === "4x4" ? "default" : "outline"}
            size="sm"
            onClick={() => setGridLayout("4x4")}
            className="gap-2"
          >
            <Grid3x3 className="h-4 w-4" />
            4x4
          </Button>
        </div>
      </div>

      <div className={`grid gap-4 ${gridClasses[gridLayout]}`}>
        {cameras.map((camera) => (
          <div key={camera.id} className="relative group">
            <CameraFeed camera={camera} />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity gap-2"
              onClick={() => setSelectedCamera(camera.id)}
            >
              <Maximize2 className="h-4 w-4" />
              Expandir
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
