# GitHub Pages Deployment with Turnstile

## Setting up Environment Variables for GitHub Pages

Since GitHub Pages is a static hosting service, you need to set environment variables in your GitHub Actions workflow (if using GitHub Actions) or use a different approach.

### Option 1: Using GitHub Secrets (Recommended for GitHub Actions)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add: `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` with your Turnstile site key value
5. Create/update `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          VITE_CLOUDFLARE_TURNSTILE_SITE_KEY: ${{ secrets.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY }}
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Option 2: Using Vite Public Variables (Less Secure)

For testing or if you don't use GitHub Actions, you can use Vite's public variables:

1. Create `public/.env.production` with:

```
VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
```

⚠️ **Warning**: This exposes your site key publicly, which is acceptable for Turnstile site keys (they're meant to be public), but not ideal.

### Option 3: Build Locally and Push

1. Create a `.env` file locally:

```
VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
```

2. Build locally:

```bash
npm run build
```

3. Push the `dist` folder to your `gh-pages` branch

## Cloudflare Turnstile Configuration

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile**
3. Add your GitHub Pages domain:
   - For `username.github.io/repository-name` format
   - Add both with and without `www`:
     - `username.github.io`
     - `*.github.io` (wildcard)

## Troubleshooting

### Widget Not Showing

- Check browser console for errors
- Verify site key is correctly set
- Make sure domain is added in Cloudflare Turnstile dashboard

### Verification Failing

- Check that your GitHub Pages domain matches what's configured in Cloudflare
- Verify site key is active in Cloudflare dashboard

### Environment Variable Not Working

- For GitHub Actions: Check that the secret is set correctly
- For local builds: Ensure `.env` file exists and is in the root directory
- Variable must start with `VITE_` to be exposed to the client
