"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Camera, Agent, Vehicle } from "@/lib/types"
import { MapPin, Video, User, Car, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeaflet } from "@/hooks/use-leaflet"

interface EventMapProps {
  cameras: Camera[]
  agents: Agent[]
  vehicles: Vehicle[]
  eventLocation: string
}

export function EventMap({ cameras, agents, vehicles, eventLocation }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const markersRef = useRef<any[]>([])
  const { leaflet: L, isLoading } = useLeaflet()

  // Função para inicializar o mapa
  const initializeMap = () => {
    if (!L || !mapRef.current || map) return

    const safeCameras = cameras || []
    const safeAgents = agents || []
    const safeVehicles = vehicles || []

    // Calculate center from all markers
    const allLocations = [
      ...safeCameras.map((c) => c.location),
      ...safeAgents.map((a) => a.location),
      ...safeVehicles.map((v) => v.location),
    ]

    const centerLat =
      allLocations.length > 0 ? allLocations.reduce((sum, loc) => sum + loc.lat, 0) / allLocations.length : -23.5505
    const centerLng =
      allLocations.length > 0 ? allLocations.reduce((sum, loc) => sum + loc.lng, 0) / allLocations.length : -46.6333

    const mapInstance = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: allLocations.length > 0 ? 14 : 12,
      zoomControl: true,
    })

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInstance)

    setMap(mapInstance)

    return mapInstance
  }

  // Efeito para inicializar o mapa
  useEffect(() => {
    const mapInstance = initializeMap()

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [L]) // Removemos as dependências desnecessárias

  // Efeito para adicionar/atualizar marcadores
  useEffect(() => {
    if (!map || !L) return

    const safeCameras = cameras || []
    const safeAgents = agents || []
    const safeVehicles = vehicles || []

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Custom icons
    const cameraIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-chart-3 border-2 border-background shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 7-3 3-3-3"/><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1.3a.2.2 0 0 0-.2-.2 1.8 1.8 0 0 1 0-3.6.2.2 0 0 0 .2-.2V7.3a.3.3 0 0 0-.3-.3 1.8 1.8 0 1 1 0-3.6Z"/></svg>
      </div>`,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

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

    // Add camera markers
    safeCameras.forEach((camera) => {
      const marker = L.marker([camera.location.lat, camera.location.lng], { icon: cameraIcon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-semibold text-sm">${camera.name}</p>
            <p class="text-xs text-muted-foreground mt-1">Status: ${camera.status === "online" ? "Online" : "Offline"}</p>
          </div>
        `)
        .addTo(map)

      markersRef.current.push(marker)
    })

    // Add agent markers
    safeAgents.forEach((agent) => {
      const marker = L.marker([agent.location.lat, agent.location.lng], { icon: agentIcon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-semibold text-sm">${agent.name}</p>
            <p class="text-xs text-muted-foreground">Badge: ${agent.badge}</p>
            <p class="text-xs text-muted-foreground">Status: ${agent.status}</p>
          </div>
        `)
        .addTo(map)

      markersRef.current.push(marker)
    })

    // Add vehicle markers
    safeVehicles.forEach((vehicle) => {
      const marker = L.marker([vehicle.location.lat, vehicle.location.lng], { icon: vehicleIcon })
        .bindPopup(`
          <div class="p-2">
            <p class="font-semibold text-sm">${vehicle.plate}</p>
            <p class="text-xs text-muted-foreground">Tipo: ${vehicle.type}</p>
            <p class="text-xs text-muted-foreground">Status: ${vehicle.status}</p>
          </div>
        `)
        .addTo(map)

      markersRef.current.push(marker)
    })

    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 15 })
    }
  }, [map, L, cameras, agents, vehicles])

  // Efeito específico para lidar com mudanças de tamanho/tela cheia
  useEffect(() => {
    if (!map) return

    // Função para invalidar o tamanho do mapa
    const invalidateMapSize = () => {
      setTimeout(() => {
        map.invalidateSize(true)
        // Força um redesenho adicional
        setTimeout(() => {
          map.invalidateSize(true)
          // Centraliza o mapa novamente após o redimensionamento
          if (markersRef.current.length > 0 && L) {
            const group = L.featureGroup(markersRef.current)
            map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 15 })
          }
        }, 150)
      }, 50)
    }

    invalidateMapSize()

    // Adiciona listener para redimensionamento da janela
    const handleResize = () => {
      invalidateMapSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [map, isFullscreen, L]) // Adicionamos isFullscreen como dependência

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const cameraCount = cameras?.length || 0
  const agentCount = agents?.length || 0
  const vehicleCount = vehicles?.length || 0

  return (
    <Card className={isFullscreen ? "fixed inset-4 z-50 bg-background" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Mapa do Evento - {eventLocation}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={toggleFullscreen} className="gap-2 bg-transparent">
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4" />
                Minimizar
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                Tela cheia
              </>
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Badge variant="outline" className="gap-1.5">
            <Video className="h-3 w-3 text-chart-3" />
            {cameraCount} Câmeras
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <User className="h-3 w-3 text-accent" />
            {agentCount} Agentes
          </Badge>
          <Badge variant="outline" className="gap-1.5">
            <Car className="h-3 w-3 text-chart-4" />
            {vehicleCount} Viaturas
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
            className={`rounded-lg overflow-hidden bg-muted/30 ${
              isFullscreen ? "h-[calc(100vh-12rem)]" : "h-[500px]"
            }`}
          />
        )}
      </CardContent>
    </Card>
  )
}
