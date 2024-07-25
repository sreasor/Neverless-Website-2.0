// src/app/api/login/route.js
import db from '../../../lib/db'; // Adjust the path as needed

export async function POST(req) {
    console.log("received request");
    try {
        const { username, password } = await req.json();
        console.log({username, password});
        console.log("made it here");
 
        // Fetch user record from database
        const user = await db.query('SELECT * FROM `Users` WHERE user_name = ?', [username]);

        if (user.length > 0) {
            const dbpassword = user[0][0].password;
            console.log("dbpassword:");
            console.log(user[0][0].password);// Assume the hashed password is in this field

            // Verify password (this should use a hash comparison in a real app)
            const isMatch = password === dbpassword;

            if (isMatch) {
                console.log("it is a match");
                // Authentication successful, determine user role
                const role = user[0][0].account_type; // Assuming role is stored in the database
                console.log("role:");
                console.log(role);

                // Send success response with user role
                return new Response(JSON.stringify({ role }), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                console.log("invalid user/pass");
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
            console.log("user not found");
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