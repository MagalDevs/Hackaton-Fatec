"use client"

import type { Event } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, MapPin, AlertCircle, Video, Radio } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface EventHeaderProps {
  event: Event
}

const statusColors = {
  active: "bg-accent text-accent-foreground",
  scheduled: "bg-primary text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
}

const statusLabels = {
  active: "Em Andamento",
  scheduled: "Agendado",
  completed: "Concluído",
  cancelled: "Cancelado",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  critical: "Crítica",
}

export function EventHeader({ event }: EventHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isCamerasPage = pathname?.includes("/cameras")
  const isTrackingPage = pathname?.includes("/tracking")
  const isOverviewPage = !isCamerasPage && !isTrackingPage

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para eventos
          </Button>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground text-balance">{event.name}</h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{event.description}</p>
            </div>
            <Badge className={statusColors[event.status]}>{statusLabels[event.status]}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span className="text-foreground font-medium">Prioridade {priorityLabels[event.priority]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link href={`/events/${event.id}`}>
              <Button variant={isOverviewPage ? "default" : "outline"} size="sm">
                Visão Geral
              </Button>
            </Link>
            <Link href={`/events/${event.id}/cameras`}>
              <Button variant={isCamerasPage ? "default" : "outline"} size="sm" className="gap-2">
                <Video className="h-4 w-4" />
                Câmeras
              </Button>
            </Link>
            <Link href={`/events/${event.id}/tracking`}>
              <Button variant={isTrackingPage ? "default" : "outline"} size="sm" className="gap-2">
                <Radio className="h-4 w-4" />
                Rastreamento
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
