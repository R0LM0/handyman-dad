// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token'); // Aquí podrías leer el token de una cookie

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect('/login');
    }

    return NextResponse.next();
}
