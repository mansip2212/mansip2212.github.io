# Deploy Vercel API with CORS Fix

## The Problem
The chatbot fails because the Vercel API doesn't have CORS headers to allow requests from GitHub Pages.

## Solution: Redeploy Vercel API

### Step 1: Deploy to Vercel

**Option A: Via Vercel CLI (Recommended)**

```bash
cd C:\Users\sarth\Portfolio\my-portfolio
vercel --prod
```

**Option B: Via GitHub Push (If Vercel is connected to GitHub)**

The code has been pushed to GitHub. If Vercel is connected to your GitHub repo, it will auto-deploy.

### Step 2: Verify API is Working

Test the API:
```
https://my-portfolio-seven-teal-92.vercel.app/api/ping
```

Should return:
```json
{"ok":true,"hasGeminiKey":true}
```

### Step 3: Test CORS

After deployment, the chatbot on GitHub Pages should work because:
- CORS headers now allow requests from `https://mansip2212.github.io`
- The API will accept POST requests from your GitHub Pages site

## Important: Make Sure API Key is Set

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Make sure `GEMINI_API_KEY` is set
5. If not, add it and redeploy

---

**After redeploying to Vercel, refresh your GitHub Pages site and test the chatbot!**
