import { mockEvents } from "@/lib/mock-data"
import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Activity } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const activeEvents = mockEvents.filter((e) => e.status === "active")
  const scheduledEvents = mockEvents.filter((e) => e.status === "scheduled")
  const currentMonth = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/same.png"
                alt="Logo do Sistema de Monitoramento"
                width={300}
                height={150}
                className="w-48 sm:w-64 md:w-[300px] h-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs sm:text-sm">
                <Activity className="h-3 w-3 mr-1" />
                {activeEvents.length} eventos ativos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Month Header */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold capitalize">{currentMonth}</h2>
          </div>

          {/* Active Events */}
          {activeEvents.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-semibold">Eventos em Andamento</h3>
                <Badge className="bg-accent text-accent-foreground">{activeEvents.length}</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Scheduled Events */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-semibold">Eventos Agendados</h3>
              <Badge variant="outline">{scheduledEvents.length}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
