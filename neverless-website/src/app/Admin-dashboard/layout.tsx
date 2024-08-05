import { redirect } from 'next/navigation';
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

interface AdminDashboardLayoutProps {
    children: ReactNode;
  }

const SECRET_KEY = process.env.JWT_SECRET as string;

export default async function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {

    // retrieve cookies
    const cookieStore = cookies();
    // get authorization token
    const token = cookieStore.get('authToken')?.value;

    // if there is no token, redirect to home
    if (!token) {
        redirect('/?modal=login');
    }

    // if there is a token, verify it. 
    try {
        jwt.verify(token, SECRET_KEY);
    } catch (error) {
        redirect('/?modal=login');
    }

    // children is equal to page.tsx I am assuming
    return (
        <div>
            {/* Your layout content */}
            {children}
        </div>
    );
}
