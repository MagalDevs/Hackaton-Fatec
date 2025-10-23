import type { Event } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Video, Car } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: Event
}

const statusColors = {
  active: "bg-accent text-accent-foreground",
  scheduled: "bg-primary text-primary-foreground",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
}

const priorityColors = {
  low: "border-muted-foreground",
  medium: "border-primary",
  high: "border-accent",
  critical: "border-destructive",
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

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card
        className={`hover:bg-accent/5 transition-colors cursor-pointer border-l-4 ${priorityColors[event.priority]}`}
      >
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
            <CardTitle className="text-base sm:text-lg leading-relaxed">{event.name}</CardTitle>
            <Badge className={`${statusColors[event.status]} shrink-0`}>{statusLabels[event.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Users className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{event.assignedAgents}</span>
              <span className="text-muted-foreground">agentes</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Video className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{event.cameras}</span>
              <span className="text-muted-foreground">câmeras</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Car className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">{event.vehicles}</span>
              <span className="text-muted-foreground">viaturas</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-xs text-muted-foreground">
            <span>Público estimado: {event.attendees.toLocaleString("pt-BR")}</span>
            <Badge variant="outline" className="text-xs shrink-0">
              Prioridade {priorityLabels[event.priority]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
