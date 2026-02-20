# Using ngrok to test PWA over HTTPS

Follow these steps to create a secure tunnel to your local Live Server so the Service Worker can register and iOS/Android can treat the site as a proper PWA.

1. Download ngrok from https://ngrok.com/download and extract it.
2. (Optional) Sign up for a free ngrok account and run `ngrok authtoken <your-token>` to secure your client.
3. Make sure your Live Server is running (you mentioned Live Server on port 5500).
4. From this project folder run the helper script (PowerShell):

```powershell
.\start-ngrok.ps1
```

5. ngrok will print forwarding URLs, for example `https://abcd-12-34-56.ngrok.io -> http://localhost:5500`.
6. On your iPhone open the `https://...ngrok.io` URL in Safari. Use Share → Add to Home Screen to create the Home Screen shortcut. This will pick up the `apple-touch-icon` and iOS meta tags.

Notes & troubleshooting:
- Service workers require HTTPS or localhost; ngrok provides HTTPS so the `sw.js` can register.
- If the Service Worker still doesn't register, open Safari Web Inspector (or use Chrome devtools for remote debugging) and check console for registration messages.
- If Live Server binds to a different host/port, adjust `start-ngrok.ps1` or run `ngrok http <port>` manually.
