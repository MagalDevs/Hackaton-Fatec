"use client"

import type { Event } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, MapPin, AlertCircle, Video, Radio, BarChart3 } from "lucide-react"
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
  const isStatisticsPage = pathname?.includes("/statistics")
  const isOverviewPage = !isCamerasPage && !isTrackingPage && !isStatisticsPage

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="space-y-3 sm:space-y-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar para eventos</span>
            <span className="sm:hidden">Voltar</span>
          </Button>

          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
            <div className="space-y-2 flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-balance">{event.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{event.description}</p>
            </div>
            <Badge className={`${statusColors[event.status]} shrink-0`}>{statusLabels[event.status]}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="sm:hidden">
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground w-full sm:w-auto">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent shrink-0" />
              <span className="text-foreground font-medium">Prioridade {priorityLabels[event.priority]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            <Link href={`/events/${event.id}`}>
              <Button variant={isOverviewPage ? "default" : "outline"} size="sm" className="shrink-0">
                Visão Geral
              </Button>
            </Link>
            <Link href={`/events/${event.id}/cameras`}>
              <Button variant={isCamerasPage ? "default" : "outline"} size="sm" className="gap-2 shrink-0">
                <Video className="h-4 w-4" />
                Câmeras
              </Button>
            </Link>
            <Link href={`/events/${event.id}/tracking`}>
              <Button variant={isTrackingPage ? "default" : "outline"} size="sm" className="gap-2 shrink-0">
                <Radio className="h-4 w-4" />
                Rastreamento
              </Button>
            </Link>
            <Link href={`/events/${event.id}/statistics`}>
              <Button variant={isStatisticsPage ? "default" : "outline"} size="sm" className="gap-2 shrink-0">
                <BarChart3 className="h-4 w-4" />
                Estatísticas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
