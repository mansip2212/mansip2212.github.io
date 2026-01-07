# GitHub Pages Deployment Instructions

## Step 1: Enable GitHub Pages

1. Go to: https://github.com/mansip2212/portfolio-v2/settings/pages
2. Under **Source**, select: **GitHub Actions**
3. Click **Save**

## Step 2: Wait for Deployment

1. Go to: https://github.com/mansip2212/portfolio-v2/actions
2. Look for "Deploy to GitHub Pages" workflow
3. Wait for it to complete (usually 1-2 minutes)
4. When you see a green checkmark ✅, deployment is done!

## Step 3: Access Your Site

Your site will be available at:
**https://mansip2212.github.io/portfolio-v2/**

---

## Important: Base Path Configuration

The site is currently configured for the `portfolio-v2` repository path.

### Option A: Keep Current Setup (Site at /portfolio-v2/)
- ✅ Already configured
- Site will be at: `https://mansip2212.github.io/portfolio-v2/`

### Option B: Deploy to Root (Site at /)
If you want the site at `https://mansip2212.github.io/`:

1. **Rename repository** to `mansip2212.github.io`
2. **Update vite.config.js** - change `base: '/portfolio-v2/'` to `base: '/'`
3. **Update remote** and push again

---

## Troubleshooting

### Workflow not running?
- Check if GitHub Actions is enabled in repository settings
- Make sure you pushed the `.github/workflows/deploy.yml` file

### 404 errors on refresh?
- The workflow creates a `404.html` file automatically
- Make sure React Router uses BrowserRouter (it does)

### Assets not loading?
- Check if `base` path in `vite.config.js` matches your repository name
- For `portfolio-v2` repo: `base: '/portfolio-v2/'`
- For `username.github.io` repo: `base: '/'`

---

## After Deployment

Once deployed, your portfolio will be live at:
**https://mansip2212.github.io/portfolio-v2/**

The chatbot will need the backend API URL configured for production (currently it's set for local dev with `/api/chat`).
