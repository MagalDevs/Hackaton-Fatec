"use client";

import { useState } from "react";
import type { Camera } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Circle, Play, Pause, RotateCw } from "lucide-react";

interface CameraFeedProps {
  camera: Camera;
  isFullscreen?: boolean;
}

export function CameraFeed({ camera, isFullscreen = false }: CameraFeedProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const cameraTypeLabels = {
    drone: "Drone",
    street: "Câmera de Rua",
    pole: "Câmera de Poste",
  };

  const statusColors = {
    online: "bg-chart-4 text-chart-4",
    offline: "bg-destructive text-destructive",
    maintenance: "bg-accent text-accent",
  };

  const statusLabels = {
    online: "Online",
    offline: "Offline",
    maintenance: "Manutenção",
  };

  return (
    <Card className={isFullscreen ? "h-[calc(100vh-16rem)]" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{camera.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {cameraTypeLabels[camera.type]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1.5">
              <Circle
                className={`h-2 w-2 fill-current ${
                  statusColors[camera.status]
                }`}
              />
              {statusLabels[camera.status]}
            </Badge>
            {isRecording && (
              <Badge className="bg-destructive text-destructive-foreground gap-1.5 animate-pulse">
                <Circle className="h-2 w-2 fill-current" />
                REC
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Camera Feed Display */}
        <div
          className={`relative bg-muted rounded-lg overflow-hidden ${
            isFullscreen ? "h-[calc(100vh-24rem)]" : "aspect-video"
          }`}
        >
          {camera.status === "online" ? (
            <>
              {/* Simulated camera feed with placeholder */}
              <img
                src={camera.streamUrl}
                alt={camera.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay with camera info */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-mono">
                  {new Date().toLocaleString("pt-BR")}
                </div>
                <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-mono">
                  {camera.id.toUpperCase()}
                </div>
              </div>

              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4">
                  <div className="bg-destructive/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2">
                    <Circle className="h-3 w-3 fill-current text-destructive-foreground animate-pulse" />
                    <span className="text-xs font-semibold text-destructive-foreground">
                      GRAVANDO
                    </span>
                  </div>
                </div>
              )}

              {/* Paused overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-background/90 p-6 rounded-full">
                    <Pause className="h-12 w-12 text-foreground" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-3">
                <VideoOff className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  {camera.status === "offline"
                    ? "Câmera offline"
                    : "Câmera em manutenção"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        {camera.status === "online" && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Reproduzir
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <RotateCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className="gap-2"
            >
              <Video className="h-4 w-4" />
              {isRecording ? "Parar Gravação" : "Iniciar Gravação"}
            </Button>
          </div>
        )}

        {/* Camera Location Info */}
        <div className="text-xs text-muted-foreground font-mono">
          Localização: {camera.location.lat.toFixed(6)},{" "}
          {camera.location.lng.toFixed(6)}
        </div>
      </CardContent>
    </Card>
  );
}
