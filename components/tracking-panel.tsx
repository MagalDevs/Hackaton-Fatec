"use client"

import { useState } from "react"
import type { Agent, Vehicle } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Users, Car, Circle, Search, Clock, MapPin } from "lucide-react"

interface TrackingPanelProps {
  agents: Agent[]
  vehicles: Vehicle[]
}

const statusColors = {
  active: "text-chart-4",
  inactive: "text-muted-foreground",
  break: "text-accent",
  maintenance: "text-accent",
}

const statusLabels = {
  active: "Ativo",
  inactive: "Inativo",
  break: "Pausa",
  maintenance: "Manutenção",
}

export function TrackingPanel({ agents, vehicles }: TrackingPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const activeAgents = agents.filter((a) => a.status === "active").length
  const activeVehicles = vehicles.filter((v) => v.status === "active").length

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.badge.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Recursos em Campo</CardTitle>
        <div className="relative pt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agents" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Agentes</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {activeAgents}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Viaturas</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {activeVehicles}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="mt-4">
            <ScrollArea className="h-[400px] sm:h-[500px] pr-4">
              <div className="space-y-3">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="border-l-4 border-l-accent">
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm sm:text-base font-semibold text-foreground">{agent.name}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{agent.badge}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Circle className={`h-2 w-2 fill-current ${statusColors[agent.status]} shrink-0`} />
                            <span className="text-xs text-muted-foreground capitalize">
                              {statusLabels[agent.status]}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="font-mono text-[10px] sm:text-xs">
                              {agent.location.lat.toFixed(4)}, {agent.location.lng.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>Atualizado {new Date(agent.lastUpdate).toLocaleTimeString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="vehicles" className="mt-4">
            <ScrollArea className="h-[400px] sm:h-[500px] pr-4">
              <div className="space-y-3">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="border-l-4 border-l-chart-4">
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm sm:text-base font-semibold text-foreground">{vehicle.plate}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground capitalize">{vehicle.type}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Circle className={`h-2 w-2 fill-current ${statusColors[vehicle.status]} shrink-0`} />
                            <span className="text-xs text-muted-foreground capitalize">
                              {statusLabels[vehicle.status]}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-3 w-3 shrink-0" />
                            <span>{vehicle.assignedAgents.length} agentes designados</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="font-mono text-[10px] sm:text-xs">
                              {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>Atualizado {new Date(vehicle.lastUpdate).toLocaleTimeString("pt-BR")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
