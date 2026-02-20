# Deployment Helper Script for Windows
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 DEPLOYMENT HELPER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check Git
if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "✓ Git installed" -ForegroundColor Green
} else {
    Write-Host "✗ Git not found" -ForegroundColor Red
    exit 1
}

# Check Node
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found" -ForegroundColor Red
    exit 1
}

# Check Vercel CLI
if (Get-Command vercel -ErrorAction SilentlyContinue) {
    Write-Host "✓ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "⚠ Vercel CLI not installed" -ForegroundColor Yellow
    Write-Host "  Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT OPTIONS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Push to GitHub (Required first step)"
Write-Host "2. Deploy Frontend to Vercel"
Write-Host "3. Open Render.com for Backend Deployment"
Write-Host "4. Test Local Setup"
Write-Host "5. View Deployment Guide"
Write-Host "6. Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-6)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "PUSH TO GITHUB" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "First, create a new repository on GitHub:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
        Write-Host "2. Create repository (don't initialize with README)" -ForegroundColor White
        Write-Host "3. Copy the repository URL" -ForegroundColor White
        Write-Host ""
        
        $repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git)"
        
        if ($repoUrl) {
            Write-Host ""
            Write-Host "Adding remote and pushing..." -ForegroundColor Yellow
            git remote add origin $repoUrl
            git push -u origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
                Write-Host ""
                Write-Host "Next steps:" -ForegroundColor Yellow
                Write-Host "1. Deploy backend on Render.com (Option 3)" -ForegroundColor White
                Write-Host "2. Deploy frontend on Vercel (Option 2)" -ForegroundColor White
            } else {
                Write-Host ""
                Write-Host "✗ Push failed. Check your repository URL and permissions." -ForegroundColor Red
            }
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "DEPLOY TO VERCEL" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "⚠ IMPORTANT: Deploy backend first!" -ForegroundColor Yellow
        Write-Host "You'll need your backend URL for environment variables." -ForegroundColor Yellow
        Write-Host ""
        
        $continue = Read-Host "Have you deployed the backend? (y/n)"
        
        if ($continue -eq "y") {
            $backendUrl = Read-Host "Enter your backend URL (e.g., https://your-api.onrender.com)"
            
            Write-Host ""
            Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
            Write-Host ""
            
            # Set environment variable
            $env:NEXT_PUBLIC_API_URL = $backendUrl
            
            # Deploy
            vercel --prod
            
            Write-Host ""
            Write-Host "✓ Deployment initiated!" -ForegroundColor Green
            Write-Host ""
            Write-Host "After deployment:" -ForegroundColor Yellow
            Write-Host "1. Copy your Vercel URL" -ForegroundColor White
            Write-Host "2. Update FRONTEND_URL in Render backend settings" -ForegroundColor White
            Write-Host "3. Redeploy backend on Render" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "Please deploy backend first (Option 3)" -ForegroundColor Yellow
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "DEPLOY BACKEND TO RENDER" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Opening Render.com..." -ForegroundColor Yellow
        Start-Process "https://render.com"
        Write-Host ""
        Write-Host "Follow these steps on Render:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Create PostgreSQL Database:" -ForegroundColor White
        Write-Host "   - New + → PostgreSQL" -ForegroundColor Gray
        Write-Host "   - Copy Internal Database URL" -ForegroundColor Gray
        Write-Host ""
        Write-Host "2. Create Web Service:" -ForegroundColor White
        Write-Host "   - New + → Web Service" -ForegroundColor Gray
        Write-Host "   - Connect GitHub repository" -ForegroundColor Gray
        Write-Host "   - Root Directory: backend" -ForegroundColor Gray
        Write-Host "   - Build: pip install -r requirements.txt" -ForegroundColor Gray
        Write-Host "   - Start: uvicorn app.main:app --host 0.0.0.0 --port `$PORT" -ForegroundColor Gray
        Write-Host ""
        Write-Host "3. Add Environment Variables:" -ForegroundColor White
        Write-Host "   - DATABASE_URL (from step 1)" -ForegroundColor Gray
        Write-Host "   - FRONTEND_URL = https://temporary.com" -ForegroundColor Gray
        Write-Host "   - ENVIRONMENT = production" -ForegroundColor Gray
        Write-Host "   - SECRET_KEY = (generate random string)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "4. Deploy and copy the backend URL" -ForegroundColor White
        Write-Host ""
        Write-Host "📖 Full guide: DEPLOY_NOW.md" -ForegroundColor Cyan
    }
    
    "4" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "TEST LOCAL SETUP" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Testing frontend build..." -ForegroundColor Yellow
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Frontend build successful!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "✗ Frontend build failed" -ForegroundColor Red
        }
        
        Write-Host ""
        Write-Host "To test locally:" -ForegroundColor Yellow
        Write-Host "  Frontend: npm run dev" -ForegroundColor White
        Write-Host "  Backend:  cd backend && uvicorn app.main:app --reload" -ForegroundColor White
    }
    
    "5" {
        Write-Host ""
        Write-Host "Opening deployment guide..." -ForegroundColor Yellow
        if (Test-Path "DEPLOY_NOW.md") {
            notepad "DEPLOY_NOW.md"
        } else {
            Write-Host "DEPLOY_NOW.md not found" -ForegroundColor Red
        }
    }
    
    "6" {
        Write-Host ""
        Write-Host "Goodbye! 👋" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "Invalid choice" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
