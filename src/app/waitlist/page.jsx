"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail } from "lucide-react";
import SupabaseSessionHandler from "@/components/SupabaseSessionHandler";

export default function WaitlistCard() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      setIsRegistered(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setIsRegistered(false);
    setFormData({ name: '', email: '' });
  };

  if (isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center px-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
            </div>
            <CardTitle className="text-xl sm:text-2xl">¡Gracias por registrarte!</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Te has unido exitosamente a nuestra lista de espera
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4 px-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">Información enviada a:</span>
              </div>
              <p className="text-green-800 font-semibold mt-1 text-sm sm:text-base break-all">{formData.email}</p>
            </div>
            <div className="text-sm text-gray-600 space-y-2 px-2">
              <p>
                Toda la información sobre la demo y próximas actualizaciones 
                será enviada al correo que proporcionaste.
              </p>
              <p className="font-medium">
                ¡Mantente atento a tu bandeja de entrada!
              </p>
            </div>
          </CardContent>
          <CardFooter className="px-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetForm}
            >
              Registrar otro correo
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <SupabaseSessionHandler />
      <Card className="w-full max-w-md mx-auto">
          <CardHeader className="px-6">
            <CardTitle className="text-lg sm:text-xl">Únete a la Lista de Espera</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Regístrate para recibir información exclusiva sobre la demo y ser el primero en acceder
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Nombre completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 px-6">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full sm:flex-1 order-2 sm:order-1"
              onClick={() => setFormData({ name: '', email: '' })}
            >
              Limpiar
            </Button>
            <Button 
              onClick={handleSubmit}
              className="w-full bg-chart-3 sm:flex-1 order-1 sm:order-2"
              disabled={!formData.name.trim() || !formData.email.trim()}
            >
              Unirme a la lista
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
}