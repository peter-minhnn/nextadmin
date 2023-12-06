// /pages/middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { useLocalStorage } from './lib/hooks/useLocalStorage';

export async function middleware(req: NextRequest) {
    // Token will exist if user logged in
    const { getItem } = useLocalStorage('token');
    const token = getItem();
    const { pathname } = req.nextUrl;

    // Allow the request if the following is true...
    if (token || req.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    // Protected Routes
    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
}