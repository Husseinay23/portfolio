# GitHub Pages Deployment Guide

## Quick Setup Steps

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/portfolio`
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save

### 3. Add Turnstile Site Key Secret

1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY`
4. Value: Your Cloudflare Turnstile site key
5. Click **Add secret**

### 4. Trigger the Workflow

The workflow will automatically run when you:
- Push to `main` or `master` branch
- Or manually trigger it: **Actions** tab → Select workflow → **Run workflow**

### 5. Access Your Site

After the workflow completes successfully, your site will be available at:
```
https://YOUR_USERNAME.github.io/portfolio/
```

## Important Notes

### Base Path Configuration

The site is configured to work with the `/portfolio/` base path. If you want to deploy to:
- **Custom domain**: Update `vite.config.ts` base to `/`
- **username.github.io**: Update `vite.config.ts` base to `/`

### Updating the Base Path

Edit `vite.config.ts`:

```typescript
base: '/portfolio/',  // For repository name as subpath
// OR
base: '/',            // For root domain or custom domain
```

### Troubleshooting

**Workflow fails:**
- Check the Actions tab for error messages
- Ensure `VITE_CLOUDFLARE_TURNSTILE_SITE_KEY` secret is set
- Verify Node.js version is compatible (workflow uses Node 20)

**Site not loading:**
- Wait a few minutes after deployment
- Check GitHub Pages settings (Source should be GitHub Actions)
- Clear browser cache

**404 errors on routes:**
- Ensure base path is correctly set in `vite.config.ts`
- For SPA routing, GitHub Pages needs a `404.html` fallback (we'll add this)

## Next Steps

After deployment, remember to:
1. Update Cloudflare Turnstile with your GitHub Pages URL
2. Test the WhatsApp link protection
3. Verify all social links work
4. Test the CV download link
