# Daily Accountability Log — Deployment Guide

## Deploy to Vercel (first time)

1. Go to vercel.com and log in
2. Click **"Add New Project"**
3. Click **"Import Third-Party Git Repository"** — or use the **drag & drop** option
4. Drag this entire `accountability-app` folder into the upload area
5. Vercel will auto-detect it as a React app
6. Click **Deploy** — done! You'll get a live URL in ~1 minute

## Add to iPhone Home Screen

1. Open your Vercel URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (box with arrow at bottom of screen)
3. Tap **"Add to Home Screen"**
4. Name it "Accountability" → tap **Add**
5. It now lives on your home screen like an app!

## Making Updates

1. Come back to Claude, make your changes, download the new `accountability.jsx`
2. Replace the file at `src/App.jsx` in this folder with the new one
3. Go to vercel.com → your project → **Deployments** → drag the updated folder
4. Your app updates automatically within ~1 minute
