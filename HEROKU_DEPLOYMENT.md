# Studly - Heroku Deployment Guide

## 📋 Prerequisites

Before deploying to Heroku, ensure you have:

1. **Heroku Account**: [Create a free account at heroku.com](https://www.heroku.com)
2. **Heroku CLI**: [Download and install](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Installed and your project initialized as a Git repository
4. **External Services**:
   - MongoDB Atlas account (free tier available)
   - Google Generative AI API key
   - Email service credentials (Gmail, SendGrid, or SMTP)

## 🚀 Quick Start Deployment

### Step 1: Login to Heroku

```bash
heroku login
```

This will open your browser to authenticate.

### Step 2: Create Heroku App

```bash
cd /home/wandile/Documents/project/Studly

# Create a new Heroku app
heroku create studly-app

# Or if you want a specific app name:
# heroku create your-unique-app-name
```

**Note**: Replace `your-unique-app-name` with a unique name for your app.

### Step 3: Set Environment Variables

Set all required environment variables in Heroku:

```bash
heroku config:set \
  JWT_SECRET="your_super_secret_key_$(openssl rand -hex 16)" \
  NODE_ENV=production \
  GEMINI_API_KEY="your_gemini_api_key" \
  MONGODB_URI="your_mongodb_atlas_connection_string" \
  EMAIL_SERVICE=smtp \
  EMAIL_USER="your_email@gmail.com" \
  EMAIL_PASSWORD="your_app_specific_password" \
  EMAIL_HOST=smtp.gmail.com \
  EMAIL_PORT=587 \
  FRONTEND_URL="https://your-unique-app-name.herokuapp.com"
```

**Or set them one at a time:**

```bash
heroku config:set JWT_SECRET="your_super_secret_key"
heroku config:set GEMINI_API_KEY="your_api_key"
heroku config:set MONGODB_URI="your_mongodb_uri"
# ... etc
```

### Step 4: Deploy

```bash
# Deploy from main/master branch
git push heroku main

# Or from a different branch:
# git push heroku your-branch:main
```

### Step 5: Verify Deployment

```bash
# View logs
heroku logs --tail

# Open the app in browser
heroku open

# Check app status
heroku apps:info
```

---

## 🔧 Detailed Configuration

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with a strong password
4. Add your Heroku app's IP to the IP whitelist (or allow 0.0.0.0/0)
5. Copy the connection string and set as `MONGODB_URI`

**Connection String Format:**

```
mongodb+srv://username:password@cluster-name.mongodb.net/studly?retryWrites=true&w=majority
```

### Google Generative AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Set as `GEMINI_API_KEY` in Heroku config

### Email Service Setup

#### Using Gmail (Recommended for free tier)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [Google Account Security](https://myaccount.google.com/apppasswords)
3. Use the app password as `EMAIL_PASSWORD`

**Environment Variables:**

```bash
heroku config:set EMAIL_SERVICE=smtp
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_specific_password
heroku config:set EMAIL_HOST=smtp.gmail.com
heroku config:set EMAIL_PORT=587
heroku config:set EMAIL_SECURE=false
```

#### Using SendGrid (Alternative)

1. Create a SendGrid account and API key
2. Set environment variables:

```bash
heroku config:set EMAIL_SERVICE=sendgrid
heroku config:set SENDGRID_API_KEY=your_sendgrid_api_key
```

---

## 📊 Monitoring & Management

### View Logs

```bash
# Real-time logs
heroku logs --tail

# View specific number of lines
heroku logs -n 50

# View app logs only (no system logs)
heroku logs --source app
```

### Scale Dynos

```bash
# View current dyno status
heroku ps

# Scale to multiple dynos (paid feature)
heroku ps:scale web=2
```

### Database

```bash
# Connect to MongoDB
# Use MongoDB Compass or your preferred MongoDB client

# Seed initial data (if needed)
heroku run npm run seed
```

### Run Commands

```bash
# Run one-off commands
heroku run "npm run seed"

# Open bash shell
heroku run bash
```

---

## 🐛 Troubleshooting

### App Crashes at Startup

**Check logs:**

```bash
heroku logs --tail
```

**Common issues:**

- Missing environment variables: Verify all required env vars are set
- Database connection: Check `MONGODB_URI` is correct
- Port binding: Should be handled automatically by Heroku

### Build Fails

**Error: `frontend/dist not found`**

The postinstall script builds the frontend. Ensure:

- `frontend/package.json` exists
- `frontend/vite.config.js` is configured correctly
- React dependencies are available

**Solution:**

```bash
heroku run "npm run build:frontend"
```

### Slow Deployment

First deployment takes longer due to dependency installation. Subsequent deployments are faster.

### Memory Issues

Heroku free tier has 512MB RAM. If experiencing memory issues:

- Upgrade to a paid dyno
- Reduce test suite in postinstall
- Move tests to separate CI/CD pipeline

**Modify postinstall to skip tests:**

```json
"postinstall": "cd frontend && npm run build"
```

### MongoDB Connection Timeout

- Whitelist Heroku IP in MongoDB Atlas: `0.0.0.0/0`
- Or add Heroku's IP range dynamically
- Check connection string format

---

## 🔐 Security Checklist

- ✅ Set strong JWT_SECRET (use `openssl rand -hex 32`)
- ✅ Use HTTPS (Heroku provides free SSL)
- ✅ Set `NODE_ENV=production`
- ✅ Enable MongoDB authentication
- ✅ Restrict API rate limits
- ✅ Use app-specific passwords (not account passwords)
- ✅ Add environment variables via `heroku config:set`
- ✅ Never commit `.env` files
- ✅ Review security headers (Helmet.js enabled)

---

## 📈 Performance Optimization

### Enable Compression

Already enabled in app.js

### Database Indexes

Ensure MongoDB collections have proper indexes for:

- Users (email)
- StudySession (userId, topicId)
- Notes (userId, topicId)
- FocusSession (userId, status)

### Caching

Consider adding Redis for:

- Session management
- Rate limiting cache
- Quiz results cache

---

## 💰 Costs

### Heroku (Free tier)

- **Web Dyno**: Free (will sleep after 30 min inactivity)
- **Paid**: $7-50+/month per dyno
- **PostgreSQL**: Free (optional)

### External Services (Free tiers)

- **MongoDB Atlas**: 512 MB storage (free)
- **Google Generative AI**: Free tier with rate limits
- **SendGrid**: 100 emails/day (free)
- **Gmail**: Unlimited (requires app password)

### Total Estimated Cost

- **Free tier**: $0/month (with limitations)
- **Hobby tier**: $7-15/month (reliable)
- **Production**: $50-100+/month (with databases)

---

## 🔄 Continuous Deployment

### GitHub Integration

```bash
# Connect your Heroku app to GitHub
heroku apps:open  # Open Heroku dashboard
# Navigate to Deploy tab
# Connect to GitHub
# Enable automatic deployments from branch
```

### Manual Deployment

```bash
# Simple push-to-deploy
git push heroku main

# From different branch
git push heroku your-branch:main
```

---

## 📝 Environment Variables Reference

| Variable         | Required | Example                   | Purpose                          |
| ---------------- | -------- | ------------------------- | -------------------------------- |
| `PORT`           | No       | 3000                      | Server port (auto-set by Heroku) |
| `NODE_ENV`       | Yes      | production                | Environment mode                 |
| `JWT_SECRET`     | Yes      | random-string             | JWT signing key                  |
| `MONGODB_URI`    | Yes      | mongodb+srv://...         | Database connection              |
| `GEMINI_API_KEY` | No       | AIzaSy...                 | AI tutoring feature              |
| `EMAIL_SERVICE`  | No       | smtp                      | Email provider                   |
| `EMAIL_USER`     | No       | user@gmail.com            | Email account                    |
| `EMAIL_PASSWORD` | No       | app-password              | Email password                   |
| `FRONTEND_URL`   | No       | https://app.herokuapp.com | Frontend base URL                |

---

## 🚀 Post-Deployment

### Verify Everything Works

1. Open app in browser
2. Test signup/login
3. Try quiz feature
4. Check notifications
5. Test email reset

### Monitor Performance

```bash
# Check response times
heroku logs --tail --dyno=web

# View metrics
heroku apps:info
```

### Scale as Needed

If app is slow:

1. Check logs for errors
2. Consider upgrading dyno type
3. Optimize database queries
4. Add caching layer

---

## 🆘 Additional Support

### Heroku Documentation

- [Heroku Dev Center](https://devcenter.heroku.com)
- [Buildpacks](https://devcenter.heroku.com/articles/buildpacks)
- [Procfile](https://devcenter.heroku.com/articles/procfile)

### Debugging

```bash
# Connect to app shell
heroku run bash

# Run tests on Heroku
heroku run npm test

# Check Node and npm versions
heroku run "node --version && npm --version"
```

### Rollback Deployment

```bash
# View releases
heroku releases

# Rollback to previous release
heroku releases:rollback
```

---

## 📋 Deployment Checklist

- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] MongoDB Atlas cluster created
- [ ] Google Generative AI key obtained
- [ ] Email service configured
- [ ] Git repository initialized
- [ ] All code committed
- [ ] `heroku create` executed
- [ ] Environment variables set
- [ ] `git push heroku main` deployed
- [ ] Logs checked for errors
- [ ] App tested in browser
- [ ] Features verified working

---

## ✅ Success!

Your Studly app is now live on Heroku! 🎉

**App URL**: `https://your-app-name.herokuapp.com`

Users can now:

- ✅ Sign up and login
- ✅ Access study materials
- ✅ Take quizzes
- ✅ Track progress
- ✅ Manage focus sessions
- ✅ Collaborate in community

Monitor your app regularly and scale as needed based on user growth!
