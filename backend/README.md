# Backend API

FastAPI backend with PostgreSQL database.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Run development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

5. Access API:
- API: http://localhost:8000
- Docs: http://localhost:8000/api/docs (development only)

## Deployment

### Render
1. Create new Web Service
2. Connect repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables from `.env.example`
6. Add PostgreSQL database and connect

### Railway
1. Create new project from GitHub
2. Add PostgreSQL database
3. Add environment variables
4. Deploy (uses Procfile automatically)

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/hello` - Example endpoint
