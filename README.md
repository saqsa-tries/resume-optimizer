# Resume Optimizer

AI-powered resume optimization tool that analyzes your resume against job descriptions and provides actionable suggestions.

## Features

- Upload resume and job description
- Get AI-powered suggestions to optimize your resume
- Copy suggestions directly to clipboard
- Optional cover letter upload
- Beautiful, modern UI

## Prerequisites

Before deploying, you'll need:
1. An Anthropic API key - get one at https://console.anthropic.com
2. A GitHub account - create one at https://github.com/signup
3. A Vercel account - create one at https://vercel.com (you can sign up with GitHub)

## Deployment to Vercel

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `resume-optimizer`
3. Add description: "AI-powered resume optimization tool"
4. Choose "Public" or "Private"
5. Click "Create repository"

### Step 2: Push Code to GitHub

Open your terminal and run these commands in your project directory:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-optimizer.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/YOUR_USERNAME/resume-optimizer.git`
4. Click "Continue"
5. In "Environment Variables" section:
   - Name: `NEXT_PUBLIC_API_KEY`
   - Value: (paste your Anthropic API key from Step 1)
6. Click "Deploy"

That's it! Your app will be live in a few minutes.

## Local Development

To test locally before deploying:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Create a `.env.local` file with:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

## Usage

1. Upload your resume (PDF or TXT)
2. Upload a job description (PDF or TXT)
3. Click "Generate Suggestions"
4. Review AI-powered recommendations
5. Copy suggestions to update your resume

## Environment Variables

- `NEXT_PUBLIC_API_KEY`: Your Anthropic API key (required)

## Built With

- Next.js 14
- React 18
- Tailwind CSS
- Lucide Icons
- Anthropic Claude API

## License

MIT
