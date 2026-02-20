# Production Deployment Checklist

## Pre-Deployment

### Frontend (Next.js)
- [ ] All environment variables defined in `.env.production`
- [ ] API URL points to production backend
- [ ] Build runs successfully: `npm run build`
- [ ] No console errors in production build
- [ ] Images optimized and loading correctly
- [ ] PWA manifest configured
- [ ] Meta tags and SEO configured

### Backend (FastAPI)
- [ ] All dependencies in `requirements.txt`
- [ ] `.env.example` created with all required variables
- [ ] Database connection string configured
- [ ] CORS origins include production frontend URL
- [ ] API documentation disabled in production
- [ ] Logging configured
- [ ] Health check endpoint working

## Deployment Steps

### 1. Deploy Backend First

#### Option A: Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `your-api`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database:
   - Click "New +" → "PostgreSQL"
   - Copy Internal Database URL
6. Add environment variables:
   - `DATABASE_URL` = (from PostgreSQL)
   - `FRONTEND_URL` = (will add after frontend deploy)
   - `API_HOST` = `0.0.0.0`
   - `API_PORT` = `$PORT`
   - `ENVIRONMENT` = `production`
   - Add all API keys
7. Click "Create Web Service"
8. Wait for deployment
9. Copy the backend URL (e.g., `https://your-api.onrender.com`)

#### Option B: Railway
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add PostgreSQL:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway auto-sets `DATABASE_URL`
5. Add environment variables
6. Deploy
7. Copy the backend URL

### 2. Deploy Frontend

#### Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (or frontend folder if monorepo)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = (backend URL from step 1)
   - `NEXT_PUBLIC_APP_URL` = (will be auto-generated)
6. Click "Deploy"
7. Wait for deployment
8. Copy the Vercel URL (e.g., `https://your-app.vercel.app`)

### 3. Update Backend CORS

1. Go back to your backend deployment (Render/Railway)
2. Update environment variable:
   - `FRONTEND_URL` = (Vercel URL from step 2)
3. Redeploy backend

### 4. Test Production

- [ ] Visit frontend URL
- [ ] Check browser console for errors
- [ ] Test API calls from frontend
- [ ] Verify database connections
- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Test in different browsers

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up log aggregation
- [ ] Monitor API response times

### Security
- [ ] HTTPS enabled on both frontend and backend
- [ ] API keys stored in environment variables
- [ ] Database credentials secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled (optional)

### Performance
- [ ] Enable CDN for static assets
- [ ] Configure caching headers
- [ ] Optimize database queries
- [ ] Enable compression (Gzip)

### Backup
- [ ] Database backups enabled
- [ ] Backup schedule configured
- [ ] Test restore process

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** 
- Verify `FRONTEND_URL` in backend matches exact Vercel URL
- Check CORS middleware configuration
- Ensure credentials are allowed if using cookies

### Issue: 500 Internal Server Error
**Solution:**
- Check backend logs in Render/Railway dashboard
- Verify all environment variables are set
- Check database connection

### Issue: Build Failed
**Solution:**
- Check build logs for specific error
- Verify all dependencies in package.json/requirements.txt
- Test build locally first

### Issue: Database Connection Failed
**Solution:**
- Verify DATABASE_URL format
- Check database is running
- Ensure IP whitelist includes your service

### Issue: Environment Variables Not Working
**Solution:**
- Verify variable names (case-sensitive)
- Restart service after adding variables
- Check if variables are prefixed correctly (NEXT_PUBLIC_ for frontend)

## Useful Commands

### Frontend
```bash
# Test production build locally
npm run build
npm start

# Check for errors
npm run lint
```

### Backend
```bash
# Test locally
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Check dependencies
pip list

# Test database connection
python -c "from app.database import engine; print(engine.connect())"
```

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- FastAPI Docs: https://fastapi.tiangolo.com
- Next.js Docs: https://nextjs.org/docs

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Frontend URL:** _____________

**Backend URL:** _____________

**Database:** _____________
