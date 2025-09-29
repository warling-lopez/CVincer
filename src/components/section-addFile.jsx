"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload } from "lucide-react"

export function AddFile() {
  const [file, setFile] = useState(null)
  const [alert, setAlert] = useState(null) // "error" | "success" | null

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setAlert("success")
    } else {
      setFile(null)
      setAlert("error")
    }
  }

  const handleUpload = () => {
    if (!file) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se ha seleccionado ningún archivo. Por favor, selecciona un archivo PDF.
          </AlertDescription>
        </Alert>
      )
      
    }
    // Aquí puedes manejar el upload (ej: enviar a backend o Supabase)
    console.log("Subiendo archivo:", file)
    setAlert("success")
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl shadow-sm bg-card max-w-md mx-auto">
      <Label htmlFor="pdf-file">Sube tu archivo PDF</Label>
      <Input
        id="pdf-file"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {file && (
        <Badge className="bg-blue-100 text-blue-700 border-blue-400">
          {file.name}
        </Badge>
      )}

      <Button onClick={handleUpload} className="flex items-center gap-2">
        <Upload className="h-4 w-4" /> Subir PDF
      </Button>

      {alert === "error" && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Solo se permiten archivos PDF. Selecciona otro archivo.
          </AlertDescription>
        </Alert>
      )}

      {alert === "success" && (
        <Alert variant="default">
          <AlertTitle>Archivo listo</AlertTitle>
          <AlertDescription>
            {file?.name} se seleccionó correctamente.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
