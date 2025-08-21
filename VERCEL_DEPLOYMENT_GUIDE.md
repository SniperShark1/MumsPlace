# Mum's Space - Vercel Deployment Guide

## Prerequisites
- GitHub/GitLab account
- Vercel account (free tier available)
- Your repository pushed to Git

## Step 1: Push Code to Git Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Mum's Space website"

# Add your remote repository
git remote add origin https://github.com/SniperShark1/mums-space-website.git

# Push to main branch
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel --prod
```

## Step 3: Environment Variables (If Needed)

In Vercel dashboard:
1. Go to Project Settings
2. Click "Environment Variables" 
3. Add these if using database features:
   - `DATABASE_URL` (your PostgreSQL connection string)
   - `SESSION_SECRET` (random string for sessions)

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed

## Important Build Configuration

Your `package.json` should have these scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "node dist/index.js"
  }
}
```

## Vercel Configuration File (Optional)

Create `vercel.json` in your root directory:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "functions": {
    "server/index.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command produces files in `dist/public`

### 404 Errors
- Check output directory setting
- Verify routing configuration
- Check file paths in your code

### Environment Issues
- Ensure environment variables are set in Vercel
- Check variable names match your code
- Verify database connection strings

## Expected File Structure After Build
```
dist/
├── public/          # Frontend files (served by Vercel)
│   ├── index.html
│   ├── assets/
│   └── ...
└── index.js         # Server file (for API routes)
```

## Free Tier Limits
- 100GB bandwidth per month
- 1000 serverless function executions per day
- 10 deployments per day

## Support
- Vercel Documentation: https://vercel.com/docs
- Contact support if you encounter deployment issues

---

**Your website is production-ready with:**
- ✅ SEO optimization
- ✅ Security features  
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ Error handling
- ✅ Mobile responsive design

Total deployment cost: **FREE** (Vercel free tier)