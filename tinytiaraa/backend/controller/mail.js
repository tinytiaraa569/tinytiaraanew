const express = require("express");
const router = express.Router();
const Resend = require("resend");
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const Welcome = require('../../client/src/emails/Welcome'); // Adjust path to your Welcome component

const resend = new Resend('re_f4S2EABi_64fCK3U9Vfd5cngsmDBqSppL'); // Initialize Resend with your API key or configuration

router.post("/welcome", async (req, res, next) => {
    try {
        // Render Welcome component to HTML
        const welcomeHtml = renderToStaticMarkup(
            React.createElement(Welcome, { url: 'https://example.com' })
        );

        // Send email using resend library
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'mcard5654@gmail.com',
            subject: 'Hello World',
            html: welcomeHtml, // Pass rendered HTML as 'html' property
        });

        res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ error: 'Failed to send welcome email' });
    }
});

module.exports = router;
