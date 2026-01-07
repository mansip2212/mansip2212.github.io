# 🚀 Quick Deployment Steps

## Overview
- **Frontend**: GitHub Pages → `https://mansip2212.github.io/`
- **Backend API**: Vercel → `https://your-api.vercel.app`
- **API Key**: Secure (never exposed to public)

---

## Step 1: Deploy Backend to Vercel ⚡

### Install Vercel CLI (if needed):
```bash
npm install -g vercel
```

### Deploy Backend:
```bash
cd my-portfolio/server
vercel login
vercel
```

**When prompted:**
- Link to existing? → **No** (first time)
- Project name? → `portfolio-api` (or any name)
- Directory? → `./` (current)

**After deployment**, you'll get a URL like: `https://portfolio-api-abc123.vercel.app`

### Add API Key to Vercel:
1. Go to https://vercel.com/dashboard
2. Click your project → **Settings** → **Environment Variables**
3. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: (your actual API key)
   - Check all environments (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** → Click **⋯** on latest → **Redeploy**

**Note your API URL**: `https://portfolio-api-abc123.vercel.app/api/chat`

---

## Step 2: Configure Frontend for Production 📝

Create `.env.production` file in `my-portfolio/` folder:

```env
VITE_API_URL=https://your-actual-vercel-url.vercel.app/api/chat
```

Replace `your-actual-vercel-url` with your real Vercel URL from Step 1.

---

## Step 3: Deploy Frontend to GitHub Pages 🌐

### Option A: Using Existing Repository (Replace Old Portfolio)

1. **Initialize Git** (if not already):
```bash
cd my-portfolio
git init
git add .
git commit -m "Initial commit - New portfolio"
```

2. **Connect to GitHub**:
```bash
git remote add origin https://github.com/mansip2212/mansip2212.github.io.git
# OR if you have a different repo name:
# git remote add origin https://github.com/mansip2212/your-repo-name.git
```

3. **Enable GitHub Pages**:
   - Go to GitHub repo → **Settings** → **Pages**
   - Source: **GitHub Actions** (or **Deploy from branch**: `main` → `/ (root)`)
   - Save

4. **Push to GitHub**:
```bash
git branch -M main
git push -u origin main
```

The GitHub Actions workflow will automatically build and deploy!

### Option B: Create New Repository

1. Create new repo on GitHub (e.g., `portfolio-new`)
2. Follow Option A steps but use your new repo URL

---

## Step 4: Replace Old Portfolio 🗑️

To replace `https://mansip2212.github.io/`:

### If using same repo:
- Just push new code (done in Step 3)

### If using different repo:
1. Go to old repo → **Settings** → **Pages**
2. Change source to **None** (disables it)
3. Or delete/archive the old repo

---

## ✅ Verify Deployment

1. **Check Frontend**: Visit `https://mansip2212.github.io/`
2. **Test API**: 
   ```bash
   curl https://your-api.vercel.app/api/chat \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"test"}]}'
   ```
3. **Test Chatbot**: Click chatbot on deployed site and send a message

---

## 🔒 Security Checklist

- ✅ API key stored in Vercel (not in code)
- ✅ `.env` files in `.gitignore` (not committed)
- ✅ Frontend only has API URL (no key)
- ✅ API calls go through Vercel backend

---

## 🐛 Troubleshooting

**Chatbot not working?**
- Check browser console for errors
- Verify `.env.production` has correct API URL
- Test API directly with curl command above
- Check Vercel logs: Dashboard → Your Project → Functions → Logs

**GitHub Pages not updating?**
- Check Actions tab for build errors
- Verify `.github/workflows/deploy.yml` exists
- Check Pages settings in GitHub repo

**404 errors on refresh?**
- GitHub Actions should create `404.html` automatically
- Verify `base: '/'` in `vite.config.js` (already set)

---

## 📞 Need Help?

Check the detailed guide: `DEPLOYMENT.md`
