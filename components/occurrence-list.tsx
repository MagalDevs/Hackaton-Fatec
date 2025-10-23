"use client"

import type { Occurrence } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, MapPin } from "lucide-react"

interface OccurrenceListProps {
  occurrences: Occurrence[]
  onToggleResolved: (occurrenceId: string) => void
}

const occurrenceLabels: Record<string, string> = {
  theft: "Furto",
  robbery: "Roubo",
  accident: "Acidente",
  vandalism: "Vandalismo",
  disturbance: "Perturbação",
  other: "Outro",
}

const severityColors = {
  low: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  high: "bg-red-500/10 text-red-500 border-red-500/20",
}

const severityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

export function OccurrenceList({ occurrences, onToggleResolved }: OccurrenceListProps) {
  const sortedOccurrences = [...occurrences].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Ocorrências</CardTitle>
        <CardDescription>Todas as ocorrências registradas neste evento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedOccurrences.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhuma ocorrência registrada ainda</p>
          ) : (
            sortedOccurrences.map((occurrence) => (
              <div key={occurrence.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{occurrenceLabels[occurrence.type]}</Badge>
                      <Badge className={severityColors[occurrence.severity]}>
                        {severityLabels[occurrence.severity]}
                      </Badge>
                      {occurrence.resolved ? (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Resolvida
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                          <Circle className="h-3 w-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </div>
                    <p className="text-foreground font-medium">{occurrence.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleResolved(occurrence.id)}
                    className={occurrence.resolved ? "text-muted-foreground" : "text-green-600"}
                  >
                    {occurrence.resolved ? "Marcar Pendente" : "Marcar Resolvida"}
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{occurrence.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(occurrence.time).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span>Reportado por: {occurrence.reportedBy}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
