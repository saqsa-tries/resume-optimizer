# Resume Optimizer - Deployment Quick Start Guide

Follow these steps to deploy your Resume Optimizer app to Vercel.

## 📋 Complete Checklist

- [ ] Step 1: Get Anthropic API Key
- [ ] Step 2: Create GitHub Account
- [ ] Step 3: Create GitHub Repository
- [ ] Step 4: Push Code to GitHub
- [ ] Step 5: Deploy to Vercel

---

## Step 1: Get Your Anthropic API Key (5 minutes)

1. Go to **https://console.anthropic.com**
2. Sign up or log in with your email
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"** and give it a name like "Resume Optimizer"
5. **Copy the key** and save it somewhere safe (you'll need it in Step 5)

⚠️ **WARNING**: Never share this key or put it on GitHub. We'll add it as a secure secret in Vercel.

---

## Step 2: Create GitHub Account (5 minutes)

1. Go to **https://github.com/signup**
2. Enter your email, create a password, choose a username
3. Verify your email
4. Log in to GitHub and keep it open for Step 3

---

## Step 3: Create GitHub Repository (2 minutes)

1. Go to **https://github.com/new**
2. Repository name: `resume-optimizer`
3. Description: `AI-powered resume optimization tool`
4. Choose **Public** (easier) or **Private** (more secure)
5. Click **"Create repository"**

You'll see a screen with commands. Keep this open for Step 4.

---

## Step 4: Push Code to GitHub (5 minutes)

1. Download your project files from the outputs folder
2. Extract the folder to your computer
3. Open Terminal/Command Prompt and navigate to your project folder:
   ```
   cd path/to/resume-optimizer
   ```

4. Run these commands one by one:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/resume-optimizer.git
   git push -u origin main
   ```

Replace `YOUR_USERNAME` with your actual GitHub username.

5. When prompted for a password, use a Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Check the "repo" checkbox
   - Click "Generate token" and copy it
   - Paste it as the password

---

## Step 5: Deploy to Vercel (5 minutes) ✨

1. Go to **https://vercel.com/new**
2. Click **"Continue with GitHub"** and authorize Vercel
3. Search for and select your `resume-optimizer` repository
4. Click **"Continue"**
5. Under "Environment Variables":
   - **Name**: `NEXT_PUBLIC_API_KEY`
   - **Value**: (paste your Anthropic API key from Step 1)
6. Click **"Deploy"**

Wait 2-3 minutes and your app will be live! 🎉

You'll see a URL like: `https://resume-optimizer.vercel.app`

---

## Testing Your App

1. Click the deployment URL to open your app
2. Upload a sample resume (PDF or TXT)
3. Upload a sample job description (PDF or TXT)
4. Click "Generate Suggestions"
5. You should see AI-powered recommendations!

---

## Troubleshooting

**"API key not configured" error?**
- Go to your Vercel project settings
- Click "Environment Variables"
- Make sure `NEXT_PUBLIC_API_KEY` is set correctly
- Redeploy the app

**"Failed to generate suggestions" error?**
- Double-check your API key is correct
- Make sure your Anthropic account has credits
- Check browser console for detailed errors

**Git push fails?**
- Make sure you're using the GitHub Personal Access Token, not your password
- Verify the repository URL matches your GitHub username

---

## Next Steps

Your app is now live! You can:
- Share the Vercel URL with others
- Update your resume right in the app
- Copy suggestions to use in your actual resume

Good luck with your job search! 🚀
