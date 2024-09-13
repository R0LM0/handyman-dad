// src/app/page.js
"use client"; // Marcar este componente como Client Component

import { useEffect, useState } from 'react';
import PublicLayout from '../components/layouts/PublicLayout';
import PrivateLayout from '../components/layouts/PrivateLayout';
import HandymanLandingPage from './handyman/pages'; // Importar la página de Handyman
import cookie from 'js-cookie'; // Usaremos js-cookie para leer las cookies en el cliente

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Verificamos si la cookie de autenticación existe
    const token = cookie.get('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false); // Finalizamos la carga
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar pantalla de carga mientras verificamos la autenticación
  }

  return isAuthenticated ? (
    <PrivateLayout>
      {/* Contenido privado aquí */}
      <div>
        <h2>Bienvenido al dashboard</h2>
      </div>
    </PrivateLayout>
  ) : (
    <PublicLayout>
      {/* Página pública */}
      <HandymanLandingPage /> {/* Aquí se cargará la página principal de Handyman */}
    </PublicLayout>
  );
}
