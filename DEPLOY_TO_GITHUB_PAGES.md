# Deploy to https://mansip2212.github.io/

## Option 1: Use Existing Repository (Rename it)

If you want to keep using your current repository but deploy to `mansip2212.github.io`:

1. **Rename your GitHub repository:**
   - Go to https://github.com/mansip2212/portfolio-v2
   - Click **Settings** → Scroll down to **Repository name**
   - Change from `portfolio-v2` to `mansip2212.github.io`
   - Click **Rename**

2. **Update your local remote:**
   ```bash
   cd my-portfolio
   git remote set-url origin https://github.com/mansip2212/mansip2212.github.io.git
   ```

3. **Push your code:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Enable GitHub Pages:**
   - Go to https://github.com/mansip2212/mansip2212.github.io/settings/pages
   - Under **Source**, select: **GitHub Actions**
   - Save

## Option 2: Create New Repository

If you want to keep `portfolio-v2` and create a new one:

1. **Create new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `mansip2212.github.io` (must be exact!)
   - Make it public
   - Don't initialize with README
   - Click **Create repository**

2. **Update remote and push:**
   ```bash
   cd my-portfolio
   git remote set-url origin https://github.com/mansip2212/mansip2212.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: **GitHub Actions**
   - Save

## After Deployment

1. **Wait for GitHub Actions to complete** (check Actions tab)
2. **Your site will be live at:** https://mansip2212.github.io/
3. **It may take 1-2 minutes** for the first deployment

## Important Notes

- The repository MUST be named `mansip2212.github.io` (exact match)
- GitHub Pages will automatically serve from this repository
- Make sure `.env.production` has your Vercel API URL before pushing
- The old portfolio at that URL will be replaced automatically
