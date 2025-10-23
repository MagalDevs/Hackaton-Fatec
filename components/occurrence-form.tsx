"use client"

import type React from "react"

import { useState } from "react"
import type { Occurrence, OccurrenceType } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface OccurrenceFormProps {
  eventId: string
  onAddOccurrence: (occurrence: Occurrence) => void
}

const occurrenceTypes: { value: OccurrenceType; label: string }[] = [
  { value: "theft", label: "Furto" },
  { value: "robbery", label: "Roubo" },
  { value: "accident", label: "Acidente" },
  { value: "vandalism", label: "Vandalismo" },
  { value: "disturbance", label: "Perturbação" },
  { value: "other", label: "Outro" },
]

const severityLevels = [
  { value: "low", label: "Baixa" },
  { value: "medium", label: "Média" },
  { value: "high", label: "Alta" },
]

export function OccurrenceForm({ eventId, onAddOccurrence }: OccurrenceFormProps) {
  const [type, setType] = useState<OccurrenceType>("theft")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")
  const [reportedBy, setReportedBy] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newOccurrence: Occurrence = {
      id: `occ-${Date.now()}`,
      eventId,
      type,
      description,
      location,
      time: new Date().toISOString(),
      severity,
      reportedBy,
      resolved: false,
    }

    onAddOccurrence(newOccurrence)

    // Reset form
    setDescription("")
    setLocation("")
    setReportedBy("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Ocorrência</CardTitle>
        <CardDescription>Adicione uma nova ocorrência ao evento</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Ocorrência</Label>
            <Select value={type} onValueChange={(value) => setType(value as OccurrenceType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {occurrenceTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a ocorrência..."
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Setor A - Portão 3"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Gravidade</Label>
            <Select value={severity} onValueChange={(value) => setSeverity(value as "low" | "medium" | "high")}>
              <SelectTrigger id="severity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportedBy">Reportado por (Matrícula)</Label>
            <Input
              id="reportedBy"
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              placeholder="Ex: GC-1001"
              required
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Registrar Ocorrência
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
