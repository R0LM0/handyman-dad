// pages/api/protected.js
import { authenticateUser } from '../../src/lib/auth.js';

export default function handler(req, res) {
    try {
        // Verificar el usuario
        const user = authenticateUser(req);
        res.status(200).json({ message: 'Ruta protegida', user });
    } catch (error) {
        res.status(401).json({ error: 'No autorizado' });
    }
}
