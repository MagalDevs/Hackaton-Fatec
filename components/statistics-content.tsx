"use client"

import { useState } from "react"
import type { Occurrence } from "@/lib/types"
import { OccurrenceForm } from "@/components/occurrence-form"
import { OccurrenceCharts } from "@/components/occurrence-charts"
import { OccurrenceList } from "@/components/occurrence-list"

interface StatisticsContentProps {
  eventId: string
  initialOccurrences: Occurrence[]
}

export function StatisticsContent({ eventId, initialOccurrences }: StatisticsContentProps) {
  const [occurrences, setOccurrences] = useState<Occurrence[]>(initialOccurrences)

  const handleAddOccurrence = (newOccurrence: Occurrence) => {
    setOccurrences([...occurrences, newOccurrence])
  }

  const handleToggleResolved = (occurrenceId: string) => {
    setOccurrences(occurrences.map((occ) => (occ.id === occurrenceId ? { ...occ, resolved: !occ.resolved } : occ)))
  }

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <OccurrenceCharts occurrences={occurrences} />
          <OccurrenceList occurrences={occurrences} onToggleResolved={handleToggleResolved} />
        </div>

        <div>
          <OccurrenceForm eventId={eventId} onAddOccurrence={handleAddOccurrence} />
        </div>
      </div>
    </main>
  )
}
