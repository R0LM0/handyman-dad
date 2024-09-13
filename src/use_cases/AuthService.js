import { supabase } from '../lib/supabaseClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    async login(email, password) {
        const client = supabase;

        try {
            // Verificar si el email existe
            const { data: user, error } = await client
                .from('users')
                .select('*')
                .eq('email', email)
                .single(); // single() garantiza que obtenemos un solo usuario

            if (error || !user) {
                throw new Error('Usuario no encontrado o credenciales inválidas.');
            }

            // Verificar la contraseña
            const validPassword = await bcrypt.compare(password, user.password_hash);
            if (!validPassword) {
                throw new Error('Contraseña incorrecta.');
            }

            // Generar el JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email }, // Payload
                process.env.JWT_SECRET, // Clave secreta
                { expiresIn: '1h' } // Expiración del token
            );

            // Excluir la contraseña hasheada antes de devolver los datos
            const { password_hash, ...userWithoutPassword } = user;

            return { user: userWithoutPassword, token };
        } catch (error) {
            console.log('Error en login:', error.message);
            throw new Error('Error en autenticación: ' + error.message);
        }
    }
}
