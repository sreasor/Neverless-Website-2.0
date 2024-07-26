import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET;

export default async function EditDatesLayout({ children }) {

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