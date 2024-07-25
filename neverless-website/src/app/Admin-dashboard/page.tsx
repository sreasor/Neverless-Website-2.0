import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET;

export default function getServerSideProps(context) {
    return (
        <main>
            <div>
                <h1>Admin Dashboard</h1>
                {/* Admin-specific content */}
            </div>
        </main>
    );
}