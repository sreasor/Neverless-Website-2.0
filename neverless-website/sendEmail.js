// sendEmail.js
require('dotenv').config();

const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, message) => {
  const msg = {
    to: to, // Recipient's email address
    from: 'neverlessmakesmusic@neverlessband.com', // Verified sender email address
    subject: subject,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Example usage
sendEmail('samreasor@gmail.com', 'Test Subject', 'This is a test email.');