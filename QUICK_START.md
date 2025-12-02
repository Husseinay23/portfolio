# Quick Start - Deploy to GitHub

## Step-by-Step Guide

### 1. Initialize Git Repository (if not done)

```bash
cd /Users/husseinay/Desktop/protfolio
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### 2. Connect to Your GitHub Repository

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### 3. Set Up GitHub Pages

1. Go to: `https://github.com/YOUR_USERNAME/portfolio`
2. Click **Settings** → Scroll to **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save

### 4. Add Turnstile Secret

1. In your repo, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`
4. Value: Paste your Cloudflare Turnstile site key
5. Click **Add secret**

### 5. Deploy

The GitHub Action will automatically run when you push. Or trigger it manually:
- Go to **Actions** tab
- Click **Deploy to GitHub Pages** workflow
- Click **Run workflow**

### 6. Your Site Will Be Live At:

```
https://YOUR_USERNAME.github.io/portfolio/
```

## Important: Base Path

The site is configured for `/portfolio/` base path. 

If you want to deploy to `username.github.io` (root domain):

Edit `vite.config.ts` and change:
```typescript
base: '/portfolio/',  // Change this
```

To:
```typescript
base: '/',  // For root domain
```

## Troubleshooting

**Workflow fails?**
- Check Actions tab for error details
- Make sure the secret `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` is set
- Check that your repository is named `portfolio`

**Site shows 404?**
- Wait 1-2 minutes after deployment
- Clear browser cache
- Check the base path matches your repository name

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages with Actions
3. ✅ Add Turnstile secret
4. ✅ Wait for deployment
5. ✅ Test your live site!

Need help? Check `DEPLOYMENT_GUIDE.md` for more details.
