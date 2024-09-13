import { supabase } from '../lib/supabaseClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository {
    async createUserWithTransaction(userData) {
        const client = supabase;

        // Iniciar la transacción
        try {
            // Verificar que la contraseña tenga al menos 8 caracteres
            if (userData.password.length < 8) {
                throw new Error('La contraseña debe tener al menos 8 caracteres.');
            }

            // Verificar que el email no esté en uso
            const { data: emailExists, error: emailError } = await client
                .from('users')
                .select('id')
                .eq('email', userData.email);

            if (emailError) {
                throw new Error('Error al verificar el correo electrónico.');
            }

            // Verificar que el número de teléfono no esté en uso
            const { data: phoneExists, error: phoneError } = await client
                .from('users')
                .select('id')
                .eq('phone_number', userData.phone_number);

            if (phoneError) {
                throw new Error('Error al verificar el número de teléfono.');
            }

            // Si el email o el número de teléfono ya existen
            if (emailExists && emailExists.length > 0) {
                throw new Error('El correo electrónico ya está en uso.');
            }
            if (phoneExists && phoneExists.length > 0) {
                throw new Error('El número de teléfono ya está en uso.');
            }

            // Hashear la contraseña antes de guardar el usuario
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            // Reemplazar la contraseña original con la hasheada y eliminar el campo password
            const { password, ...userDataWithoutPassword } = userData; // Eliminar password
            const userDataWithHashedPassword = {
                ...userDataWithoutPassword,
                password_hash: hashedPassword,  // Cambiar el campo a password_hash
            };

            // Insertar el usuario en la tabla 'users' y retornar los datos insertados
            const { data: userDataResult, error: userError } = await client
                .from('users')
                .insert([userDataWithHashedPassword])
                .select(); // Solicitar que se retornen los datos insertados

            if (userError) {
                throw new Error('Error al crear usuario: ' + userError.message);
            }

            // Excluir la contraseña hasheada antes de devolver los datos
            const { password_hash, ...userWithoutPassword } = userDataResult[0];

            // Generar el JWT
            const token = jwt.sign(
                { userId: userWithoutPassword.id, email: userWithoutPassword.email }, // Payload
                process.env.JWT_SECRET, // Clave secreta
                { expiresIn: '1h' } // Expiración del token
            );

            // Si todo fue exitoso, confirmar la transacción
            await client.rpc('commit_transaction'); // Confirmar la transacción

            return { user: userWithoutPassword, token };
        } catch (error) {
            console.log('Error capturado en el bloque catch:', error.message);

            // Hacer rollback en caso de error
            await client.rpc('rollback_transaction'); // Revertir la transacción

            throw new Error('Transacción fallida: ' + error.message);
        }
    }
}
