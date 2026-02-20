# 🤖 Automated Deployment - Copy & Paste Commands

Your project is 100% ready. Just copy and paste these commands!

## ⚡ Super Quick Deploy (3 Steps)

### Step 1: GitHub (2 minutes)

**A. Create GitHub Repository:**
1. Go to: https://github.com/new
2. Repository name: `portfolio-fullstack`
3. Keep it Public
4. DON'T check any boxes
5. Click "Create repository"

**B. Push Code (Copy & Paste):**
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio-fullstack.git
git push -u origin main
```

✅ Done! Your code is on GitHub.

---

### Step 2: Backend on Render (10 minutes)

**A. Create Account & Database:**
1. Go to: https://dashboard.render.com/register
2. Sign up with GitHub (easiest)
3. Click "New +" → "PostgreSQL"
4. Name: `portfolio-db`
5. Click "Create Database"
6. **COPY the "Internal Database URL"** (starts with postgresql://)

**B. Create Web Service:**
1. Click "New +" → "Web Service"
2. Click "Connect account" → Select your GitHub repo
3. Fill in:
   ```
   Name: portfolio-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   Instance Type: Free
   ```

**C. Environment Variables:**
Click "Advanced" → Add these variables:

```
DATABASE_URL = [paste the Internal Database URL from step A]
API_HOST = 0.0.0.0
API_PORT = $PORT
ENVIRONMENT = production
FRONTEND_URL = https://temporary.com
SECRET_KEY = super-secret-key-change-this-12345
ALGORITHM = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```

4. Click "Create Web Service"
5. Wait 5-10 minutes for deployment
6. **COPY your backend URL** (e.g., https://portfolio-api.onrender.com)

**D. Test Backend:**
Visit: `https://your-backend-url.onrender.com/health`
Should see: `{"status":"ok","database":"connected"}`

✅ Backend deployed!

---

### Step 3: Frontend on Vercel (3 minutes)

**A. Login to Vercel:**
```bash
vercel login
```
Follow the prompts to login.

**B. Deploy:**
```bash
vercel
```

Answer the prompts:
```
? Set up and deploy? Y
? Which scope? [Your Account]
? Link to existing project? N
? What's your project's name? portfolio-fullstack
? In which directory is your code located? ./
```

Wait for deployment...

**C. Add Environment Variable:**
```bash
# Replace with YOUR backend URL from Step 2
vercel env add NEXT_PUBLIC_API_URL production
```
When prompted, enter: `https://your-backend-url.onrender.com`

**D. Deploy to Production:**
```bash
vercel --prod
```

**E. Copy your Vercel URL** (e.g., https://portfolio-fullstack.vercel.app)

✅ Frontend deployed!

---

### Step 4: Connect Frontend & Backend (2 minutes)

**Update Backend CORS:**
1. Go to Render dashboard: https://dashboard.render.com
2. Click on your "portfolio-api" service
3. Click "Environment" in left sidebar
4. Find `FRONTEND_URL` variable
5. Click "Edit"
6. Change from `https://temporary.com` to your Vercel URL
7. Click "Save Changes"
8. Render will auto-redeploy (wait 2-3 minutes)

✅ Connected!

---

## 🎉 DONE! Test Your App

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Open browser console (F12)
3. Check for errors
4. Test features

---

## 📝 Your Deployment Info

Fill this in as you go:

```
GitHub Repo: https://github.com/___________/portfolio-fullstack
Backend URL: https://___________-api.onrender.com
Frontend URL: https://___________-fullstack.vercel.app
Database: Managed by Render
```

---

## 🔄 Future Updates

After making changes:
```bash
git add .
git commit -m "Your changes"
git push
```

Both Vercel and Render will auto-deploy! 🚀

---

## 🐛 Quick Troubleshooting

**CORS Error:**
- Check FRONTEND_URL in Render matches Vercel URL exactly
- Redeploy backend

**500 Error:**
- Check Render logs: Dashboard → Your Service → Logs
- Verify DATABASE_URL is set

**Build Failed:**
- Check build logs in Vercel/Render
- Verify all files committed to GitHub

---

## ⚡ Even Faster: One-Line Commands

After setting up accounts:

```bash
# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-fullstack.git && git push -u origin main

# Deploy to Vercel
vercel login && vercel && vercel env add NEXT_PUBLIC_API_URL production && vercel --prod
```

That's it! 🎉
