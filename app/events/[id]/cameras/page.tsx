"use client";
import React, { useState } from "react";
import { mockEvents, mockCameras } from "@/lib/mock-data";
import { EventHeader } from "@/components/event-header";
import { CameraGrid } from "@/components/camera-grid";
import { CameraControls } from "@/components/camera-controls";

interface CamerasPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function CamerasPage({ params }: CamerasPageProps) {
  // Next.js may pass `params` as a Promise in this version. Use React.use to unwrap if available.
  const resolvedParams = (React as any).use
    ? (React as any).use(params)
    : params;
  const { id } = (resolvedParams as { id: string }) || ({} as { id: string });
  const event = mockEvents.find((e) => e.id === id);
  const [searchQuery, setSearchQuery] = useState("");

  if (!event) {
    // `notFound` can only be used in server components. Render a simple fallback here.
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Evento não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EventHeader event={event} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <CameraControls
          totalCameras={mockCameras.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CameraGrid
          cameras={mockCameras}
          eventId={id}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}
