import { mockEvents } from "@/lib/mock-data"
import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { Shield, Calendar, Activity } from "lucide-react"

export default function HomePage() {
  const activeEvents = mockEvents.filter((e) => e.status === "active")
  const scheduledEvents = mockEvents.filter((e) => e.status === "scheduled")
  const currentMonth = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sistema de Monitoramento</h1>
                <p className="text-sm text-muted-foreground">Guarda Civil Municipal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Activity className="h-3 w-3 mr-1" />
                {activeEvents.length} eventos ativos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Month Header */}
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold capitalize">{currentMonth}</h2>
          </div>

          {/* Active Events */}
          {activeEvents.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Eventos em Andamento</h3>
                <Badge className="bg-accent text-accent-foreground">{activeEvents.length}</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Scheduled Events */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">Eventos Agendados</h3>
              <Badge variant="outline">{scheduledEvents.length}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scheduledEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
