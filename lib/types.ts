export type EventStatus = "active" | "scheduled" | "completed" | "cancelled"
export type EventPriority = "low" | "medium" | "high" | "critical"

export interface Event {
  id: string
  name: string
  description: string
  location: string
  date: string
  startTime: string
  endTime: string
  status: EventStatus
  priority: EventPriority
  attendees: number
  assignedAgents: number
  cameras: number
  vehicles: number
}

export interface Camera {
  id: string
  name: string
  type: "drone" | "street" | "pole"
  status: "online" | "offline" | "maintenance"
  location: {
    lat: number
    lng: number
  }
  streamUrl?: string
}

export interface Agent {
  id: string
  name: string
  badge: string
  status: "active" | "inactive" | "break"
  location: {
    lat: number
    lng: number
  }
  lastUpdate: string
}

export interface Vehicle {
  id: string
  plate: string
  type: "patrol" | "motorcycle" | "van"
  status: "active" | "inactive" | "maintenance"
  location: {
    lat: number
    lng: number
  }
  assignedAgents: string[]
  lastUpdate: string
}

export type OccurrenceType = "theft" | "robbery" | "accident" | "vandalism" | "disturbance" | "other"

export interface Occurrence {
  id: string
  eventId: string
  type: OccurrenceType
  description: string
  location: string
  time: string
  severity: "low" | "medium" | "high"
  reportedBy: string
  resolved: boolean
}
