// src/app/register/page.jsx
"use client";

import { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        role: 'customer',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field);
    };

    const validateField = (field) => {
        let newErrors = { ...errors };
        if (field === 'email') {
            if (!formData.email) {
                newErrors.email = 'El email es requerido';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Email inválido';
            }
        }
        if (field === 'password' && !formData.password) {
            newErrors.password = 'La contraseña es requerida';
        }
        setErrors(newErrors);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Llamada a la API /api/users
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Enviar los datos del formulario como JSON
            });

            if (!res.ok) {
                throw new Error('Error al registrar el usuario');
            }

            const data = await res.json();

            // Redirigir al dashboard o login después del registro exitoso
            window.location.href = '/login';
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrors({ ...errors, general: 'Error al registrar el usuario' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-[var(--foreground)]">Regístrate</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium text-[var(--secondary)]">
                                Nombre Completo
                            </label>
                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                onBlur={() => handleBlur('full_name')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--secondary)]">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => handleBlur('email')}
                            />
                            {touched.email && errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[var(--secondary)]">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                onBlur={() => handleBlur('password')}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-[var(--secondary)]">
                                Teléfono
                            </label>
                            <input
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-[var(--secondary)]">
                                Dirección
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-[var(--secondary)]">
                                Rol
                            </label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-[var(--secondary)] rounded-md bg-[var(--secondary)] text-[var(--background)]"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="customer">Customer</option>
                                <option value="handyman">Handyman</option>
                            </select>
                        </div>
                    </div>

                    {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[var(--primary)] text-[var(--background)] rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
}
