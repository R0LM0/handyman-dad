// pages/api/users.js
import { UserRepository } from '../../src/adapters/userRepository'; // Sin espacio extra al final
import cookie from 'cookie';

const userRepository = new UserRepository();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Crear el usuario y generar el JWT
            const { user, token } = await userRepository.createUserWithTransaction(req.body);

            // Configurar la cookie con el token
            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                httpOnly: true, // No accesible desde JavaScript en el cliente
                secure: process.env.NODE_ENV !== 'development', // Solo HTTPS en producción
                maxAge: 60 * 60, // Expira en 1 hora
                sameSite: 'strict', // Mejora la seguridad
                path: '/', // Disponible en toda la aplicación
            }));

            // Responder con los datos del usuario
            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
