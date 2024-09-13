// src/pages/api/login.js
import { AuthService } from '../../src/use_cases/AuthService'; // Importar tu AuthService
import cookie from 'cookie'; // Para manejar las cookies

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body; // Obtener el email y la contraseña del cuerpo de la solicitud

        try {
            // Llamamos al AuthService para manejar el login
            const authService = new AuthService();
            const { token, user } = await authService.login(email, password); // login devuelve el token y los datos del usuario

            // Configurar la cookie segura con el token
            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true, // No accesible desde JavaScript
                secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                maxAge: 60 * 60, // Expira en 1 hora
                sameSite: 'strict', // Seguridad adicional
                path: '/', // Disponible en toda la aplicación
            }));

            // Devolver solo los datos del usuario (sin token en el cuerpo de la respuesta)
            return res.status(200).json({ user });
        } catch (error) {
            // Si ocurre un error, responder con un mensaje de error
            return res.status(401).json({ message: 'Credenciales inválidas: ' + error.message });
        }
    } else {
        // Método no permitido si no es POST
        return res.status(405).json({ message: 'Método no permitido' });
    }
}
