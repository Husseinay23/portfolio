# Cloudflare Turnstile Setup Guide

This guide will help you set up Cloudflare Turnstile to protect your contact information from bots.

## Overview

Your contact information (email and phone) is now protected by Cloudflare Turnstile. Users must complete a verification challenge before they can see your contact details. This helps prevent bots from scraping your personal information.

## Step 1: Get Cloudflare Turnstile Keys

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** (under the Security section)
3. Click **Add Site**
4. Fill in the site details:
   - **Site name**: Your portfolio name
   - **Domain**: Your domain (e.g., `example.com`, `www.example.com`)
   - **Widget Mode**: Choose "Managed" (automatic challenge when needed)
5. Click **Create**
6. You'll receive two keys:
   - **Site Key** (Public) - Used in the frontend
   - **Secret Key** (Private) - Used for server-side verification (optional but recommended)

## Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your keys:
   ```env
   VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
   VITE_CONTACT_EMAIL=your_email@example.com
   VITE_CONTACT_PHONE=+1234567890
   ```

3. **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

## Step 3: For Production Deployment

When deploying to production (e.g., Vercel, Netlify, Cloudflare Pages):

1. Add the environment variables in your hosting platform's dashboard:
   - `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`
   - `VITE_CONTACT_EMAIL`
   - `VITE_CONTACT_PHONE`

2. Rebuild and redeploy your application.

## How It Works

1. When users visit the Contact section, they see a verification prompt instead of your contact info
2. Cloudflare Turnstile displays an invisible or interactive challenge to verify the user is human
3. Once verified, your contact information (email and phone) is revealed
4. Verification status is stored in sessionStorage, so users don't need to re-verify if they refresh the page (within the same session)

## Optional: Server-Side Verification

For enhanced security, you can verify Turnstile tokens on your backend:

1. Create an API endpoint (e.g., `/api/verify-turnstile`)
2. Send the token from the frontend to your backend
3. Verify the token with Cloudflare's API using your Secret Key:

```javascript
// Example server-side verification
const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    secret: 'YOUR_SECRET_KEY',
    response: token,
    remoteip: userIP, // optional
  }),
});

const data = await response.json();
if (data.success) {
  // Token is valid
}
```

Then update the `handleTurnstileVerify` function in `Contact.tsx` to call your API endpoint.

## Troubleshooting

- **Turnstile widget not showing**: Check that `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` is set correctly
- **"Verification failed"**: Make sure your domain is correctly configured in Cloudflare Turnstile dashboard
- **Widget shows error**: Verify your site key is active in Cloudflare dashboard

## Security Notes

- The site key is public and safe to expose in client-side code
- Never expose your secret key in client-side code
- For production, consider implementing server-side token verification for additional security
- Contact information is stored in environment variables, which are not accessible to bots even if they inspect your source code (after build)

## Additional Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile API Reference](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
