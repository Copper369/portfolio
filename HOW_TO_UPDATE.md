# 🔄 How to Update Your Portfolio on Netlify

## Automatic Updates (Easiest!)

Netlify is connected to your GitHub repo and auto-deploys on every push.

### Simple 3-Step Process:

1. **Make your changes** (edit files in your project)

2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Updated portfolio content"
   git push portfolio main
   ```

3. **Wait 2-3 minutes** - Netlify automatically deploys!

That's it! Your changes will be live automatically. 🚀

---

## Step-by-Step Example

### Example: Update Your Name

1. **Edit the file:**
   - Open `utils/outer.js`
   - Change your name/title
   - Save the file

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Updated my name"
   git push portfolio main
   ```

3. **Check Netlify:**
   - Go to https://app.netlify.com
   - You'll see "Building" status
   - Wait 2-3 minutes
   - Your site updates automatically!

---

## Manual Deploy (If Needed)

If auto-deploy doesn't work:

1. Go to https://app.netlify.com
2. Click on your site
3. Click "Deploys" tab
4. Click "Trigger deploy" → "Deploy site"

---

## Quick Commands Reference

```bash
# After making ANY changes:
git add .
git commit -m "Describe your changes"
git push portfolio main

# That's it! Netlify handles the rest.
```

---

## What Happens Behind the Scenes

1. You push code to GitHub
2. GitHub notifies Netlify (webhook)
3. Netlify pulls your code
4. Netlify runs: `npm install --legacy-peer-deps && npm run build`
5. Netlify deploys the built files
6. Your site is live with new changes!

---

## Checking Deployment Status

### On Netlify Dashboard:

- **Building** 🟡 - Currently deploying
- **Published** 🟢 - Live and successful
- **Failed** 🔴 - Check logs for errors

### View Build Logs:

1. Go to Netlify dashboard
2. Click on your site
3. Click "Deploys"
4. Click on any deployment
5. See detailed logs

---

## Common Update Scenarios

### Update Text Content:
```bash
# Edit files like utils/outer.js, utils/mySelf.js, etc.
git add .
git commit -m "Updated about section"
git push portfolio main
```

### Add New Images:
```bash
# Add images to public/assets/
git add .
git commit -m "Added new project images"
git push portfolio main
```

### Change Styles:
```bash
# Edit SCSS files in styles/
git add .
git commit -m "Updated color scheme"
git push portfolio main
```

### Add New Projects:
```bash
# Edit utils/projects.js
git add .
git commit -m "Added new project"
git push portfolio main
```

---

## Troubleshooting

### Changes not showing up?

1. **Clear browser cache:**
   - Press Ctrl+Shift+R (Windows)
   - Or Cmd+Shift+R (Mac)

2. **Check Netlify deployment:**
   - Make sure it says "Published"
   - Check build logs for errors

3. **Verify GitHub push:**
   - Go to https://github.com/Copper369/portfolio
   - Check if your commit is there

### Build failed?

1. Check Netlify build logs
2. Test locally first: `npm run build`
3. Fix errors and push again

---

## Pro Tips

### Test Locally First:
```bash
# Before pushing, test your changes:
npm run dev
# Visit http://localhost:3000
# Make sure everything works
```

### View Your Live Site:
Your portfolio is live at the URL Netlify gave you:
- Something like: `https://your-site-name.netlify.app`
- Find it in Netlify dashboard

### Custom Domain (Optional):
1. Go to Netlify → Site settings → Domain management
2. Add your custom domain
3. Follow DNS setup instructions

---

## Summary

**To update your portfolio:**
```bash
# 1. Make changes
# 2. Run these commands:
git add .
git commit -m "Your update message"
git push portfolio main

# 3. Wait 2-3 minutes
# 4. Your site is updated! ✨
```

**That's it!** Every push to GitHub automatically updates your live site. 🚀
