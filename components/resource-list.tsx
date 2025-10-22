import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Camera, Agent, Vehicle } from "@/lib/types"
import { Video, User, Car, Circle } from "lucide-react"

interface ResourceListProps {
  title: string
  items: Camera[] | Agent[] | Vehicle[]
  type: "camera" | "agent" | "vehicle"
}

const statusColors = {
  online: "text-chart-4",
  offline: "text-destructive",
  maintenance: "text-accent",
  active: "text-chart-4",
  inactive: "text-muted-foreground",
  break: "text-accent",
}

const statusLabels = {
  online: "Online",
  offline: "Offline",
  maintenance: "Manutenção",
  active: "Ativo",
  inactive: "Inativo",
  break: "Pausa",
}

export function ResourceList({ title, items, type }: ResourceListProps) {
  const getIcon = () => {
    switch (type) {
      case "camera":
        return Video
      case "agent":
        return User
      case "vehicle":
        return Car
    }
  }

  const Icon = getIcon()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
          <Badge variant="outline" className="ml-auto">
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {items.map((item) => {
            if (type === "camera") {
              const camera = item as Camera
              return (
                <div
                  key={camera.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{camera.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{camera.type}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className={`h-2 w-2 fill-current ${statusColors[camera.status]}`} />
                    <span className="text-xs text-muted-foreground">{statusLabels[camera.status]}</span>
                  </div>
                </div>
              )
            }

            if (type === "agent") {
              const agent = item as Agent
              return (
                <div
                  key={agent.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.badge}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className={`h-2 w-2 fill-current ${statusColors[agent.status]}`} />
                    <span className="text-xs text-muted-foreground capitalize">{statusLabels[agent.status]}</span>
                  </div>
                </div>
              )
            }

            if (type === "vehicle") {
              const vehicle = item as Vehicle
              return (
                <div
                  key={vehicle.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{vehicle.plate}</p>
                    <p className="text-xs text-muted-foreground capitalize">{vehicle.type}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className={`h-2 w-2 fill-current ${statusColors[vehicle.status]}`} />
                    <span className="text-xs text-muted-foreground capitalize">{statusLabels[vehicle.status]}</span>
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </CardContent>
    </Card>
  )
}
