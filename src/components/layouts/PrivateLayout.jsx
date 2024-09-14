// src/components/layouts/PrivateLayout.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

export default function PrivateLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);  // Para manejar el estado de carga

    useEffect(() => {
        const token = cookie.get('token'); // Usar la cookie para verificar la autenticación

        if (!token) {
            router.push('/login'); // Redirigir a login si no está autenticado
        } else {
            setLoading(false);  // Autenticado, deshabilitar la pantalla de carga
        }
    }, [router]);

    if (loading) {
        return <div>Cargando...</div>; // Mostrar pantalla de carga hasta que se verifique la autenticación
    }

    return (
        <div>
            <header>
                <h1>Página Privada</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}
