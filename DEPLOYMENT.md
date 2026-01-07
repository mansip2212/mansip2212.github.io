# Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages and the backend API to Vercel.

## 🎯 Deployment Strategy

- **Frontend (Portfolio)**: GitHub Pages at `https://mansip2212.github.io/`
- **Backend (API Server)**: Vercel (keeps API key secure)
- **API Key**: Stored securely in Vercel environment variables (never exposed)

---

## 📋 Prerequisites

1. GitHub account (you already have this)
2. Vercel account (free tier works perfectly) - Sign up at https://vercel.com
3. Your portfolio code pushed to a GitHub repository

---

## 🚀 Step 1: Deploy Backend API to Vercel

### 1.1 Prepare Backend for Vercel

1. Make sure your `server` folder has:
   - `index.js` (your Express server)
   - `package.json`
   - `.env.local` with your `GEMINI_API_KEY`

2. **Important**: Never commit `.env` files! They're already in `.gitignore`

### 1.2 Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
cd my-portfolio/server
npm install -g vercel
vercel login
vercel
```

When prompted:
- **Set up and develop?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → `portfolio-api` (or any name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

After deployment, note your Vercel URL (e.g., `https://portfolio-api-abc123.vercel.app`)

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **Root Directory**: Set to `server`
5. **Framework Preset**: Other
6. **Build Command**: Leave empty
7. **Output Directory**: Leave empty
8. Click **Deploy**

### 1.3 Add Environment Variable in Vercel

1. In Vercel Dashboard, go to your project
2. Go to **Settings** → **Environment Variables**
3. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Environments**: Production, Preview, Development (check all)
4. Click **Save**
5. **Redeploy** your project for the env var to take effect

### 1.4 Test Your API

Your API will be at: `https://your-project-name.vercel.app/api/chat`

Test it:
```bash
curl -X POST https://your-project-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}],"system":"test"}'
```

**Note the API URL** - you'll need it for the next step!

---

## 🌐 Step 2: Deploy Frontend to GitHub Pages

### 2.1 Update API URL in Frontend

Create a `.env.production` file in the root (`my-portfolio/`):

```env
VITE_API_URL=https://your-project-name.vercel.app/api/chat
```

Replace `your-project-name` with your actual Vercel project name.

### 2.2 Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or `gh-pages`)
   - **Folder**: `/ (root)`
4. Click **Save**

### 2.3 Add GitHub Secrets (Optional but Recommended)

1. In your GitHub repo, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-project-name.vercel.app/api/chat`
4. Click **Add secret**

### 2.4 Push Code and Deploy

```bash
cd my-portfolio
git add .
git commit -m "Prepare for deployment"
git push origin main
```

The GitHub Actions workflow will automatically:
- Build your portfolio
- Deploy it to GitHub Pages

### 2.5 Wait for Deployment

1. Go to **Actions** tab in your GitHub repo
2. Wait for the deployment workflow to complete
3. Your portfolio will be live at: `https://mansip2212.github.io/`

---

## 🔧 Step 3: Remove Old Portfolio

To replace your old portfolio at `https://mansip2212.github.io/`:

### Option A: Replace the Repository

1. Go to your old portfolio repository on GitHub
2. **Settings** → Scroll down to **Danger Zone**
3. Click **Delete this repository**
4. Or, rename it to something like `portfolio-old`

### Option B: Update Existing Repository

If you want to keep the same repository:
1. Delete all old files
2. Push your new portfolio code to the same repo
3. GitHub Pages will automatically update

---

## ✅ Verification Checklist

- [ ] Backend deployed to Vercel
- [ ] API URL tested and working
- [ ] `GEMINI_API_KEY` added to Vercel environment variables
- [ ] `.env.production` file created with API URL
- [ ] GitHub Pages enabled
- [ ] GitHub Actions workflow running successfully
- [ ] Portfolio accessible at `https://mansip2212.github.io/`
- [ ] Chatbot working on deployed site

---

## 🔒 Security Notes

✅ **API Key is Secure**: 
- Stored only in Vercel environment variables
- Never exposed in frontend code
- Not committed to Git (already in `.gitignore`)

✅ **Frontend is Public**: 
- Only static files deployed to GitHub Pages
- No sensitive information exposed

---

## 🐛 Troubleshooting

### Chatbot not working?

1. Check browser console for errors
2. Verify API URL in `.env.production` is correct
3. Test API directly: `curl https://your-api-url.vercel.app/api/chat`
4. Check Vercel logs for API errors

### GitHub Pages not updating?

1. Check GitHub Actions tab for errors
2. Verify workflow file is in `.github/workflows/deploy.yml`
3. Check repository Settings → Pages configuration

### 404 errors?

1. Ensure `vite.config.js` has `base: '/'` (already set)
2. Make sure React Router is configured for GitHub Pages

---

## 📝 Quick Deploy Commands

```bash
# Deploy backend to Vercel
cd my-portfolio/server
vercel

# Build and test frontend locally
cd ..
npm run build
npm run preview

# Deploy frontend (push to GitHub triggers auto-deploy)
git add .
git commit -m "Deploy to production"
git push origin main
```

---

## 🎉 You're Done!

Your portfolio should now be live at:
- **Portfolio**: https://mansip2212.github.io/
- **API**: https://your-project-name.vercel.app/api/chat

All API keys are secure and never exposed to the public! 🔐
