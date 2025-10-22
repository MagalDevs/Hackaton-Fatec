"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Video, Search, Filter, Download, Settings, MonitorPlay } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CameraControlsProps {
  totalCameras: number
}

export function CameraControls({ totalCameras }: CameraControlsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <MonitorPlay className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Central de Câmeras</h2>
                <p className="text-sm text-muted-foreground">Monitoramento em tempo real</p>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <Video className="h-3 w-3" />
              {totalCameras} câmeras ativas
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar câmera por nome ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="drone">Drones</SelectItem>
                <SelectItem value="street">Câmeras de Rua</SelectItem>
                <SelectItem value="pole">Câmeras de Poste</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Configurar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
