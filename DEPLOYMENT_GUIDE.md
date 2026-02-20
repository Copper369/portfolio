# Full-Stack Production Deployment Guide

## Project Structure Overview

```
project-root/
├── frontend/                 # Next.js/React app
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── .env.local
│   ├── .env.production
│   ├── next.config.js
│   └── package.json
│
├── backend/                  # FastAPI app
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── Procfile
│
└── README.md
```

---

## 1. Frontend Setup (Next.js)

### Environment Variables

Create `.env.local` for development:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create `.env.production` for production:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Next.js Configuration

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // Image optimization
  images: {
    domains: ['your-backend.onrender.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Production start
npm start
```

---

## 2. Backend Setup (FastAPI)

### Project Structure

Create the backend folder structure:
```bash
mkdir -p backend/app/{models,routes,services}
```

### Environment Variables

Create `backend/.env.example`:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dbname

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
ENVIRONMENT=production

# CORS
FRONTEND_URL=https://your-app.vercel.app

# AI APIs (examples)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Main Application (`backend/app/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import uvicorn
from app.config import settings
from app.database import engine, Base
from app.routes import api_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Your API",
    version="1.0.0",
    docs_url="/api/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/api/redoc" if settings.ENVIRONMENT == "development" else None,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",  # Development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Include routers
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.ENVIRONMENT == "development"
    )
```

### Configuration (`backend/app/config.py`)

```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    ENVIRONMENT: str = "production"
    
    # CORS
    FRONTEND_URL: str
    
    # AI APIs
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

### Database Setup (`backend/app/database.py`)

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### Requirements (`backend/requirements.txt`)

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
pydantic==2.5.3
pydantic-settings==2.1.0
python-dotenv==1.0.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
httpx==0.26.0
openai==1.10.0
anthropic==0.8.1
```

### Procfile for Render/Railway (`backend/Procfile`)

```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## 3. Deployment Platforms

### Frontend: Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Select the frontend directory (if monorepo)

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   Add in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = your backend URL
   - `NEXT_PUBLIC_APP_URL` = your Vercel URL

4. **Deploy**
   - Click "Deploy"
   - Vercel auto-deploys on every push to main

### Backend: Render

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Connect your repository
   - Select "Web Service"

2. **Configure Service**
   ```
   Name: your-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Environment Variables**
   Add all variables from `.env.example`

4. **Add PostgreSQL Database**
   - Create new PostgreSQL database in Render
   - Copy the Internal Database URL
   - Set as `DATABASE_URL` in your web service

### Backend: Railway (Alternative)

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add PostgreSQL**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway auto-generates `DATABASE_URL`

3. **Configure Service**
   - Add environment variables
   - Railway auto-detects Python and runs from Procfile

4. **Custom Domain**
   - Go to Settings → Domains
   - Add custom domain or use Railway subdomain

---

## 4. Common Deployment Errors & Fixes

### Error 1: CORS Issues
**Problem:** Frontend can't connect to backend
**Fix:**
```python
# In main.py, ensure frontend URL is in allow_origins
allow_origins=[
    "https://your-app.vercel.app",
    "https://your-custom-domain.com",
]
```

### Error 2: Database Connection Failed
**Problem:** Can't connect to PostgreSQL
**Fix:**
- Verify `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
- Check if database is running
- Ensure IP whitelist includes your service (Render/Railway)

### Error 3: Module Not Found
**Problem:** Import errors in production
**Fix:**
```bash
# Ensure all dependencies in requirements.txt
pip freeze > requirements.txt
```

### Error 4: Environment Variables Not Loading
**Problem:** Settings return None
**Fix:**
- Check variable names match exactly (case-sensitive)
- Restart service after adding variables
- Use `python-dotenv` for local testing

### Error 5: Port Binding Error
**Problem:** Address already in use
**Fix:**
```python
# Use PORT from environment
import os
port = int(os.environ.get("PORT", 8000))
uvicorn.run(app, host="0.0.0.0", port=port)
```

### Error 6: Build Timeout
**Problem:** Vercel build exceeds time limit
**Fix:**
```javascript
// next.config.js
module.exports = {
  experimental: {
    outputStandalone: true,
  },
}
```

---

## 5. Performance Optimization

### Frontend Optimization

1. **Image Optimization**
```javascript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/profile.jpg"
  width={500}
  height={500}
  alt="Profile"
  priority
/>
```

2. **Code Splitting**
```javascript
// Dynamic imports
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

3. **API Route Caching**
```javascript
// pages/api/data.js
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  // ... your logic
}
```

### Backend Optimization

1. **Database Connection Pooling**
```python
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
```

2. **Response Caching**
```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

@app.get("/data")
@cache(expire=60)
async def get_data():
    return {"data": "cached"}
```

3. **Async Operations**
```python
import httpx

async def call_ai_api():
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=data)
        return response.json()
```

---

## 6. Production Checklist

### Frontend
- [ ] Environment variables configured
- [ ] API URLs point to production backend
- [ ] Error boundaries implemented
- [ ] Loading states for API calls
- [ ] SEO meta tags added
- [ ] Analytics integrated (optional)
- [ ] PWA manifest configured
- [ ] Build succeeds locally

### Backend
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] CORS configured correctly
- [ ] API documentation disabled in production
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] Health check endpoint working
- [ ] Database backups scheduled

### Security
- [ ] HTTPS enabled
- [ ] API keys in environment variables (not code)
- [ ] SQL injection protection (use ORM)
- [ ] Input validation on all endpoints
- [ ] Authentication/Authorization implemented
- [ ] Secrets rotated regularly

---

## 7. Monitoring & Maintenance

### Logging
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/endpoint")
async def endpoint():
    logger.info("Endpoint called")
    return {"status": "ok"}
```

### Error Tracking
- Use Sentry for error tracking
- Monitor API response times
- Set up uptime monitoring (UptimeRobot, Pingdom)

### Database Backups
- Enable automatic backups in Render/Railway
- Test restore process regularly
- Keep backups for 30+ days

---

## 8. Quick Deploy Commands

### Frontend (Vercel CLI)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Backend (Manual)
```bash
# Build
pip install -r requirements.txt

# Run
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## Need Help?

Common issues:
1. Check logs in deployment platform dashboard
2. Verify all environment variables are set
3. Test API endpoints with curl or Postman
4. Check CORS configuration
5. Ensure database is accessible

Good luck with your deployment! 🚀
