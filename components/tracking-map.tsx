"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Agent, Vehicle } from "@/lib/types"
import { MapPin, Users, Car, RefreshCw, Maximize2 } from "lucide-react"
import { useLeaflet } from "@/hooks/use-leaflet"

interface TrackingMapProps {
  agents: Agent[]
  vehicles: Vehicle[]
  eventLocation: string
}

export function TrackingMap({ agents, vehicles, eventLocation }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const markersRef = useRef<any[]>([])
  const { leaflet: L, isLoading } = useLeaflet()

  useEffect(() => {
    if (!L || !mapRef.current || map) return

    const allLocations = [...agents.map((a) => a.location), ...vehicles.map((v) => v.location)]
    const centerLat = allLocations.reduce((sum, loc) => sum + loc.lat, 0) / allLocations.length
    const centerLng = allLocations.reduce((sum, loc) => sum + loc.lng, 0) / allLocations.length

    const mapInstance = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 14,
      zoomControl: true,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInstance)

    setMap(mapInstance)

    return () => {
      mapInstance.remove()
    }
  }, [L, agents, vehicles])

  useEffect(() => {
    if (!map || !L) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    const agentIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-accent border-2 border-background shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>`,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const vehicleIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-chart-4 border-2 border-background shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
      </div>`,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    agents.forEach((agent) => {
      const marker = L.marker([agent.location.lat, agent.location.lng], { icon: agentIcon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-semibold text-sm">${agent.name}</p>
            <p class="text-xs text-muted-foreground">Badge: ${agent.badge}</p>
            <p class="text-xs text-muted-foreground">Status: ${agent.status}</p>
            <p class="text-xs text-muted-foreground mt-1">Coordenadas: ${agent.location.lat.toFixed(4)}, ${agent.location.lng.toFixed(4)}</p>
          </div>
        `)
        .addTo(map)

      markersRef.current.push(marker)
    })

    vehicles.forEach((vehicle) => {
      const marker = L.marker([vehicle.location.lat, vehicle.location.lng], { icon: vehicleIcon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-semibold text-sm">${vehicle.plate}</p>
            <p class="text-xs text-muted-foreground">Tipo: ${vehicle.type}</p>
            <p class="text-xs text-muted-foreground">Status: ${vehicle.status}</p>
            <p class="text-xs text-muted-foreground mt-1">Coordenadas: ${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}</p>
          </div>
        `)
        .addTo(map)

      markersRef.current.push(marker)
    })

    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 15 })
    }
  }, [map, L, agents, vehicles])

  const handleRefresh = () => {
    setLastUpdate(new Date())
    // In a real app, this would fetch new data from the server
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setTimeout(() => {
      if (map) {
        map.invalidateSize(true)
        setTimeout(() => {
          map.invalidateSize(true)
        }, 100)
      }
    }, 50)
  }

  return (
    <Card className={isFullscreen ? "fixed inset-4 z-50 bg-background" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Rastreamento em Tempo Real - {eventLocation}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullscreen} className="gap-2 bg-transparent">
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? "Minimizar" : "Tela cheia"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Badge variant="outline" className="gap-1.5">
            <Users className="h-3 w-3 text-accent" />
            {agents.length} Agentes
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Car className="h-3 w-3 text-chart-4" />
            {vehicles.length} Viaturas
          </Badge>
          <Badge variant="outline" className="gap-1.5 text-xs">
            Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[500px] rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Carregando mapa...</p>
          </div>
        ) : (
          <div
            ref={mapRef}
            className={`rounded-lg overflow-hidden ${isFullscreen ? "h-[calc(100vh-12rem)]" : "h-[500px]"}`}
          />
        )}
      </CardContent>
    </Card>
  )
}
