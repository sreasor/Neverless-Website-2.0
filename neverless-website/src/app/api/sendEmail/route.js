require('dotenv').config();
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    const { recipients, subject, message } = await req.json();

    console.log(recipients);
    console.log(subject);
    console.log(message);

    const emails = recipients[0].map(({ firstName, email }) => ({
        to: email,
        from: 'neverlessmakesmusic@neverlessband.com',
        subject: subject,
        text: `Hi ${firstName}!\n\n${message}`,
        html: `<p>Hi ${firstName}!</p><p>${message}</p>`,
    }));

    try {
        for (let i = 0; i < emails.length; i += 100) { // Batch size of 100
            await sgMail.send(emails.slice(i, i + 100));
        }
        return new Response(
            JSON.stringify({message: "Emails Sent Successfully"}),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Error sending emails:', error);
        return new Response(
            JSON.stringify({message: "Error sending email"}),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}