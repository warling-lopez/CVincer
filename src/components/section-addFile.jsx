"use client"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload } from "lucide-react"

export function AddFile() {
  const [file, setFile] = useState(null)
  const [alert, setAlert] = useState(null) // "error" | "success" | null
  const fileInputRef = useRef(null)

  const handleFiles = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setAlert("success")
    } else {
      setFile(null)
      setAlert("error")
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    handleFiles(droppedFile)
  }

  const handleUpload = () => {
    if (!file) {
      setAlert("error")
      return
    }
    console.log("Subiendo archivo:", file)
    setAlert("success")
  }

  return (
    <div className="max-w-md md:max-w-2/3 flex flex-col gap-4 p-4 rounded-md bg-card  mx-6">
      <Label>Sube tu archivo PDF</Label>

      {/* Drag & Drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        className="flex w-full flex-col items-center justify-center border-2 py-40 border-dashed border-blue-800/50 rounded-lg cursor-pointer hover:bg-blue-50 transition"
      >
        {!file ? (
          <p className="text-center text-blue-800/40">
            Arrastra tu PDF aquí o haz clic para seleccionar
          </p>
        ) : (
          <Badge className="bg-blue-100 text-blue-700 border-blue-400">
            {file.name}
          </Badge>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFiles(e.target.files?.[0])}
        className="hidden"
      />

      {/* Upload button (aparece solo si hay archivo) */}
      {file && (
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Subir PDF
        </Button>
      )}

      {/* Alerts */}
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
