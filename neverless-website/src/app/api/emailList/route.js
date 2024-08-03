import db from '../../../lib/db';

export async function POST(req) {
    try {
        const {fName, lName, email } = await req.json();

        console.log(fName + " " + lName + " " + email);
        
        const entry = await db.query('SELECT * FROM `MailingList` WHERE email = ?', [email]);

        if(entry[0].length === 0)
        {

            console.log('made it here 12');

            const result = await db.query('INSERT INTO MailingList(firstName, lastName, email) VALUES(?, ?, ?);', [fName, lName, email]);

            console.log('made it here 16');

            if (result[0].affectedRows > 0) {
                return new Response(
                    JSON.stringify({message: "record successfully created"}),
                    {
                        status: 201,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            } else {
                return new Response(
                    JSON.stringify({message: "Failed to create record"}),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            }
        }
        else
        {
            return new Response(
                JSON.stringify({ message: 'Email already in mailing list' }), {
                    status: 409, 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

    } catch (error) {
        return new Response(
            JSON.stringify({ message: "An error occurred while adding email to list"}), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}