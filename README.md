# Full-Stack Portfolio Application

A production-ready full-stack application with Next.js frontend and FastAPI backend.

## 🚀 Features

- ⚡ Next.js 14 with React 18
- 🐍 FastAPI backend with async support
- 🗄️ PostgreSQL database with SQLAlchemy ORM
- 🤖 AI API integrations (OpenAI, Anthropic)
- 🎨 SCSS styling with Bootstrap
- 📱 Progressive Web App (PWA)
- 🔒 CORS configured for security
- 📊 Database migrations with Alembic
- 🚢 Production-ready deployment configs

## 📁 Project Structure

```
project/
├── components/          # React components
├── pages/              # Next.js pages & API routes
├── styles/             # SCSS stylesheets
├── utils/              # Frontend utilities
├── public/             # Static assets
├── backend/
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── config.py       # Configuration
│   │   ├── database.py     # Database setup
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Business logic
│   ├── alembic/            # Database migrations
│   └── requirements.txt    # Python dependencies
└── package.json            # Node dependencies
```

## 🏃 Quick Start

### Frontend
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Open http://localhost:8000
```

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 15 minutes
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist

## 🌐 Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Render/Railway)
- Push to GitHub
- Connect repository
- Add environment variables
- Deploy

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (backend/.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_key
SECRET_KEY=your_secret
```

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- SCSS/Bootstrap
- AOS (Animations)
- React Scroll Parallax

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Uvicorn

### Deployment
- Vercel (Frontend)
- Render/Railway (Backend)
- PostgreSQL (Database)

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # Lint code
```

### Backend
```bash
uvicorn app.main:app --reload              # Development
uvicorn app.main:app --host 0.0.0.0        # Production
alembic revision --autogenerate -m "msg"   # Create migration
alembic upgrade head                       # Run migrations
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Review [QUICK_START.md](QUICK_START.md)
- Open an issue on GitHub

---

Made with ❤️ using Next.js and FastAPI
