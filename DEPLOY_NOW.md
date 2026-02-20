# 🚀 Deploy Now - Step by Step

Your project is built and ready! Follow these steps to deploy.

## ✅ Pre-Deployment Status

- ✓ Git repository initialized
- ✓ Code committed to main branch
- ✓ Frontend build successful
- ✓ Node.js v22.17.1 installed
- ✓ Python 3.12.10 installed
- ✓ Vercel CLI installed

---

## 📋 Deployment Steps

### Step 1: Push to GitHub (5 minutes)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `your-portfolio` (or any name)
   - Make it Public or Private
   - DON'T initialize with README (we already have code)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

---

### Step 2: Deploy Backend to Render (15 minutes)

1. **Go to Render:**
   - Visit https://render.com
   - Sign up/Login (use GitHub account for easy integration)

2. **Create PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name: `your-db`
   - Region: Choose closest to you
   - Plan: Free
   - Click "Create Database"
   - **IMPORTANT:** Copy the "Internal Database URL" (starts with postgresql://)

3. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository
   - Configure:
     ```
     Name: your-api
     Region: Same as database
     Branch: main
     Root Directory: backend
     Runtime: Python 3
     Build Command: pip install -r requirements.txt
     Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   DATABASE_URL = [paste Internal Database URL from step 2]
   API_HOST = 0.0.0.0
   API_PORT = $PORT
   ENVIRONMENT = production
   FRONTEND_URL = https://temporary.com (we'll update this after frontend deploy)
   SECRET_KEY = [generate random string, e.g., use: openssl rand -hex 32]
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 30
   ```

   Optional (if using AI APIs):
   ```
   OPENAI_API_KEY = your_key_here
   ANTHROPIC_API_KEY = your_key_here
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Once deployed, you'll see a URL like: `https://your-api.onrender.com`
   - **COPY THIS URL** - you'll need it for frontend

6. **Test Backend:**
   - Visit: `https://your-api.onrender.com`
   - Should see: `{"message": "API is running", "status": "healthy"}`
   - Visit: `https://your-api.onrender.com/health`
   - Should see: `{"status": "ok", "database": "connected"}`

---

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Deploy with Vercel CLI:**
   ```bash
   vercel
   ```

2. **Answer the prompts:**
   ```
   ? Set up and deploy "~/your-project"? [Y/n] Y
   ? Which scope do you want to deploy to? [Your Account]
   ? Link to existing project? [y/N] N
   ? What's your project's name? your-portfolio
   ? In which directory is your code located? ./
   ```

3. **Add Environment Variables:**
   After initial deploy, add production environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   When prompted, enter your backend URL: `https://your-api.onrender.com`
   Select: Production

   ```bash
   vercel env add NEXT_PUBLIC_APP_URL
   ```
   Enter the Vercel URL you just got (e.g., `https://your-portfolio.vercel.app`)
   Select: Production

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

5. **Get your URL:**
   - You'll see: `Production: https://your-portfolio.vercel.app`
   - **COPY THIS URL**

---

### Step 4: Update Backend CORS (2 minutes)

1. **Go back to Render dashboard:**
   - Find your web service
   - Go to "Environment"
   - Find `FRONTEND_URL` variable
   - Click "Edit"
   - Change from `https://temporary.com` to your Vercel URL
   - Example: `https://your-portfolio.vercel.app`
   - Click "Save Changes"

2. **Redeploy backend:**
   - Render will automatically redeploy
   - Wait 2-3 minutes

---

### Step 5: Test Production (5 minutes)

1. **Visit your frontend:**
   - Go to your Vercel URL
   - Check browser console (F12) for errors

2. **Test API connection:**
   - Open browser console
   - Run:
     ```javascript
     fetch('https://your-api.onrender.com/health')
       .then(r => r.json())
       .then(console.log)
     ```
   - Should see: `{status: "ok", database: "connected"}`

3. **Test from frontend:**
   - If you added the ApiTest component to a page, test it
   - All API calls should work

---

## 🎉 Deployment Complete!

Your full-stack app is now live!

### Your URLs:
- **Frontend:** https://your-portfolio.vercel.app
- **Backend:** https://your-api.onrender.com
- **Database:** Managed by Render

### Next Steps:

1. **Custom Domain (Optional):**
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain → Add your domain

2. **Monitoring:**
   - Check Vercel dashboard for frontend logs
   - Check Render dashboard for backend logs
   - Set up error tracking (Sentry)

3. **Updates:**
   ```bash
   # Make changes to your code
   git add .
   git commit -m "Your changes"
   git push
   
   # Vercel auto-deploys on push
   # Render auto-deploys on push
   ```

---

## 🐛 Troubleshooting

### Frontend shows CORS error
- Check `FRONTEND_URL` in Render matches your Vercel URL exactly
- Redeploy backend after changing

### Backend shows 500 error
- Check Render logs: Dashboard → Logs
- Verify all environment variables are set
- Check database connection

### Build failed
- Check build logs in Vercel/Render
- Verify all dependencies in package.json/requirements.txt

### Database connection failed
- Verify `DATABASE_URL` is the Internal Database URL from Render
- Check database is running in Render dashboard

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Review DEPLOYMENT_GUIDE.md
3. Check environment variables
4. Verify URLs are correct

---

## ⚡ Quick Commands Reference

```bash
# Frontend
vercel                    # Deploy preview
vercel --prod            # Deploy production
vercel logs              # View logs

# Git
git add .
git commit -m "message"
git push

# Backend (local testing)
cd backend
uvicorn app.main:app --reload
```

---

**Ready to deploy?** Start with Step 1! 🚀
