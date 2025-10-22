import type { Event } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Video, Car, UserCheck } from "lucide-react";

interface EventStatsProps {
  event: Event;
}

export function EventStats({ event }: EventStatsProps) {
  const stats = [
    {
      label: "Público Estimado",
      value: event.attendees.toLocaleString("pt-BR"),
      icon: Users,
      color: "white",
    },
    {
      label: "Agentes Designados",
      value: event.assignedAgents,
      icon: UserCheck,
      color: "text-accent",
    },
    {
      label: "Câmeras Ativas",
      value: event.cameras,
      icon: Video,
      color: "text-chart-3",
    },
    {
      label: "Viaturas em Campo",
      value: event.vehicles,
      icon: Car,
      color: "text-chart-4",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
