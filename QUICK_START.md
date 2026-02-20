# Quick Start Guide

## 🚀 Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.9+
- PostgreSQL (or use cloud database)

---

## Frontend Setup (5 minutes)

1. **Install dependencies:**
```bash
npm install
```

2. **Environment variables:**
```bash
# Already created: .env.local
# Edit if needed to change API URL
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
```
http://localhost:3000
```

---

## Backend Setup (10 minutes)

1. **Navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv

# Activate:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Setup database:**
```bash
# Option 1: Use local PostgreSQL
# Create database: createdb your_db_name
# Update DATABASE_URL in .env

# Option 2: Use cloud database (Render, Supabase, etc.)
# Get connection string and update .env
```

5. **Environment variables:**
```bash
# Already created: backend/.env
# Edit with your database URL and API keys
```

6. **Run migrations (optional):**
```bash
alembic upgrade head
```

7. **Start backend server:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

8. **Test backend:**
```
http://localhost:8000
http://localhost:8000/api/docs (API documentation)
```

---

## Test Full-Stack Connection

1. **Both servers running:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

2. **Test API connection:**
   - Visit frontend
   - Check browser console for errors
   - Use the ApiTest component (if added to a page)

---

## Production Deployment

### Quick Deploy (30 minutes)

1. **Deploy Backend (Render):**
   - Go to https://render.com
   - New Web Service → Connect GitHub
   - Add PostgreSQL database
   - Set environment variables from `backend/.env.example`
   - Deploy
   - Copy backend URL

2. **Deploy Frontend (Vercel):**
   - Go to https://vercel.com
   - Import GitHub repository
   - Add environment variable: `NEXT_PUBLIC_API_URL` = backend URL
   - Deploy
   - Copy frontend URL

3. **Update Backend CORS:**
   - In Render, add `FRONTEND_URL` = Vercel URL
   - Redeploy

4. **Test production:**
   - Visit your Vercel URL
   - Test all features

---

## Common Commands

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # Check for errors
```

### Backend
```bash
# Development
uvicorn app.main:app --reload

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Database migrations
alembic revision --autogenerate -m "description"
alembic upgrade head
alembic downgrade -1
```

---

## Troubleshooting

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend is running on port 8000
- Check browser console for CORS errors

### Backend database error
- Verify `DATABASE_URL` in `backend/.env`
- Check PostgreSQL is running
- Run migrations: `alembic upgrade head`

### Module not found errors
- Frontend: `npm install`
- Backend: `pip install -r requirements.txt`

---

## Project Structure

```
project/
├── components/          # React components
├── pages/              # Next.js pages
├── styles/             # SCSS styles
├── utils/              # Utilities (including api.js)
├── public/             # Static assets
├── backend/
│   ├── app/
│   │   ├── main.py    # FastAPI app
│   │   ├── config.py  # Configuration
│   │   ├── database.py # Database setup
│   │   ├── models/    # Database models
│   │   ├── routes/    # API routes
│   │   └── services/  # Business logic
│   ├── alembic/       # Database migrations
│   ├── requirements.txt
│   └── .env
├── .env.local         # Frontend env (dev)
└── package.json
```

---

## Next Steps

1. ✅ Get local development working
2. ✅ Test API connections
3. ✅ Add your features
4. ✅ Deploy to production
5. ✅ Monitor and maintain

For detailed deployment instructions, see:
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

Good luck! 🎉
