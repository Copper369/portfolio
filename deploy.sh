#!/bin/bash

# Production Deployment Script
# This script helps deploy both frontend and backend

echo "🚀 Full-Stack Deployment Helper"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Run this script from the project root.${NC}"
    exit 1
fi

echo "Select deployment option:"
echo "1) Deploy Frontend (Vercel)"
echo "2) Deploy Backend (Manual)"
echo "3) Test Local Setup"
echo "4) Build Production"
echo "5) Exit"
echo ""
read -p "Enter choice [1-5]: " choice

case $choice in
    1)
        echo -e "${YELLOW}Deploying Frontend to Vercel...${NC}"
        
        # Check if vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
            npm install -g vercel
        fi
        
        # Deploy
        vercel --prod
        
        echo -e "${GREEN}✓ Frontend deployment initiated!${NC}"
        ;;
        
    2)
        echo -e "${YELLOW}Backend Deployment Instructions:${NC}"
        echo ""
        echo "1. Push your code to GitHub"
        echo "2. Go to https://render.com or https://railway.app"
        echo "3. Create new Web Service"
        echo "4. Connect your repository"
        echo "5. Set build command: pip install -r requirements.txt"
        echo "6. Set start command: uvicorn app.main:app --host 0.0.0.0 --port \$PORT"
        echo "7. Add environment variables from backend/.env.example"
        echo "8. Add PostgreSQL database"
        echo "9. Deploy!"
        echo ""
        echo "See DEPLOYMENT_GUIDE.md for detailed instructions."
        ;;
        
    3)
        echo -e "${YELLOW}Testing Local Setup...${NC}"
        echo ""
        
        # Check Node.js
        if command -v node &> /dev/null; then
            echo -e "${GREEN}✓ Node.js installed:${NC} $(node --version)"
        else
            echo -e "${RED}✗ Node.js not found${NC}"
        fi
        
        # Check Python
        if command -v python3 &> /dev/null; then
            echo -e "${GREEN}✓ Python installed:${NC} $(python3 --version)"
        else
            echo -e "${RED}✗ Python not found${NC}"
        fi
        
        # Check npm packages
        if [ -d "node_modules" ]; then
            echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
        else
            echo -e "${YELLOW}⚠ Frontend dependencies not installed. Run: npm install${NC}"
        fi
        
        # Check backend venv
        if [ -d "backend/venv" ]; then
            echo -e "${GREEN}✓ Backend virtual environment exists${NC}"
        else
            echo -e "${YELLOW}⚠ Backend venv not found. Run: cd backend && python -m venv venv${NC}"
        fi
        
        # Check .env files
        if [ -f ".env.local" ]; then
            echo -e "${GREEN}✓ Frontend .env.local exists${NC}"
        else
            echo -e "${YELLOW}⚠ Frontend .env.local not found${NC}"
        fi
        
        if [ -f "backend/.env" ]; then
            echo -e "${GREEN}✓ Backend .env exists${NC}"
        else
            echo -e "${YELLOW}⚠ Backend .env not found${NC}"
        fi
        
        echo ""
        echo "To start development:"
        echo "  Frontend: npm run dev"
        echo "  Backend:  cd backend && uvicorn app.main:app --reload"
        ;;
        
    4)
        echo -e "${YELLOW}Building for Production...${NC}"
        echo ""
        
        # Build frontend
        echo "Building frontend..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Frontend build successful${NC}"
        else
            echo -e "${RED}✗ Frontend build failed${NC}"
            exit 1
        fi
        
        # Test backend imports
        echo ""
        echo "Testing backend..."
        cd backend
        if [ -d "venv" ]; then
            source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
            python -c "from app.main import app; print('Backend imports OK')"
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✓ Backend imports successful${NC}"
            else
                echo -e "${RED}✗ Backend imports failed${NC}"
            fi
        else
            echo -e "${YELLOW}⚠ Backend venv not found, skipping backend test${NC}"
        fi
        cd ..
        
        echo ""
        echo -e "${GREEN}Production build complete!${NC}"
        ;;
        
    5)
        echo "Exiting..."
        exit 0
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
