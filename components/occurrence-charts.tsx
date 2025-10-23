"use client"

import type { Occurrence } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface OccurrenceChartsProps {
  occurrences: Occurrence[]
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"]

const occurrenceLabels: Record<string, string> = {
  theft: "Furto",
  robbery: "Roubo",
  accident: "Acidente",
  vandalism: "Vandalismo",
  disturbance: "Perturbação",
  other: "Outro",
}

const severityLabels: Record<string, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

export function OccurrenceCharts({ occurrences }: OccurrenceChartsProps) {
  // Count by type
  const typeData = Object.entries(
    occurrences.reduce(
      (acc, occ) => {
        acc[occ.type] = (acc[occ.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([type, count]) => ({
    name: occurrenceLabels[type] || type,
    value: count,
  }))

  // Count by severity
  const severityData = Object.entries(
    occurrences.reduce(
      (acc, occ) => {
        acc[occ.severity] = (acc[occ.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([severity, count]) => ({
    name: severityLabels[severity] || severity,
    count,
  }))

  // Count resolved vs unresolved
  const statusData = [
    { name: "Resolvidas", value: occurrences.filter((o) => o.resolved).length },
    { name: "Pendentes", value: occurrences.filter((o) => !o.resolved).length },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ocorrências por Tipo</CardTitle>
          <CardDescription>Distribuição das ocorrências registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gravidade das Ocorrências</CardTitle>
          <CardDescription>Classificação por nível de gravidade</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1e223b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status de Resolução</CardTitle>
          <CardDescription>Ocorrências resolvidas vs pendentes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Geral</CardTitle>
          <CardDescription>Estatísticas do evento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total de Ocorrências</span>
            <span className="text-2xl font-bold">{occurrences.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Resolvidas</span>
            <span className="text-2xl font-bold text-green-600">{occurrences.filter((o) => o.resolved).length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Pendentes</span>
            <span className="text-2xl font-bold text-red-600">{occurrences.filter((o) => !o.resolved).length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Alta Gravidade</span>
            <span className="text-2xl font-bold text-orange-600">
              {occurrences.filter((o) => o.severity === "high").length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
