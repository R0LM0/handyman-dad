// src/use_cases/auth/loginUser.js
export async function loginUser(email, password) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Error en la autenticación');
    }

    const data = await res.json();
    return data; // En la respuesta no se incluye el token porque está almacenado en una cookie segura en el backend
}
