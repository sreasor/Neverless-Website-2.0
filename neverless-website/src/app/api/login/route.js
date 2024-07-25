
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import db from '../../../lib/db'; // Adjust the path as needed

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const { username, password } = await req.json();
 
        // Fetch user record from database
        const user = await db.query('SELECT * FROM `Users` WHERE user_name = ?', [username]);

        if (user[0].length > 0) {
            const dbpassword = user[0][0].password;

            // Verify password (this should use a hash comparison in a real app)
            const isMatch = password === dbpassword;

            if (isMatch) {

                // Create session token
                const token = jwt.sign({ id: user[0].userID, role: user[0].account_type }, SECRET_KEY, { expiresIn: '7d' });

                // Set a cookie with the JWT token
                const cookie = serialize('authToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                });

                // Authentication successful, determine user role
                const role = user[0][0].account_type; // Assuming role is stored in the database

                // update last login
                const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                await db.query('UPDATE `Users` SET last_login = ? WHERE user_name = ?', [currentDate, username]);

                // Send success response with user role
                const response = new Response(JSON.stringify({ role }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // add session cookie to response
                response.headers.append('Set-Cookie', cookie);

                return response;
            } else {
                // Password is incorrect
                return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        } else {
            // User not found
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'An error occurred during login' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}