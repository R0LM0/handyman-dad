import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function authenticateUser(req) {
    const { token } = cookie.parse(req.headers.cookie || '');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Retorna el payload decodificado (userId, email, etc.)
    } catch (error) {
        throw new Error('Invalid token');
    }
}
