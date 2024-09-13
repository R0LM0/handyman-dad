"use client";

import { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '../../use_cases/loginUser';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field);
    };

    const validateField = (field) => {
        let newErrors = { ...errors };
        if (field === 'email') {
            if (!email) {
                newErrors.email = 'El email es requerido';
            } else if (!validateEmail(email)) {
                newErrors.email = 'Por favor, ingrese un email válido';
            } else {
                newErrors.email = '';
            }
        }
        if (field === 'password') {
            if (!password) {
                newErrors.password = 'La contraseña es requerida';
            } else {
                newErrors.password = '';
            }
        }
        setErrors(newErrors);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        validateField('email');
        validateField('password');
        if (!errors.email && !errors.password) {
            try {
                await loginUser(email, password);
                window.location.href = '/dashboard';
            } catch (error) {
                setErrors({ ...errors, general: 'Email o contraseña inválidos' });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900" style={{ fontFamily: 'Circular, custom-font, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-auto text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <h2 className="mt-6 text-3xl font-bold text-white">Inicia sesión en tu cuenta</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-600'
                                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-800 text-white`}
                                    placeholder="tu@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                />
                                {touched.email && errors.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {touched.email && errors.email && (
                                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Contraseña
                                </label>
                                <div className="text-sm">
                                    <Link href="/forgot-password" className="font-medium text-green-500 hover:text-green-400">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-600'
                                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-gray-800 text-white`}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => handleBlur('password')}
                                />
                                {touched.password && errors.password && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {touched.password && errors.password && (
                                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-400">O continúa con</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.963 5.963 0 013.898 1.432l2.747-2.746A9.965 9.965 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}