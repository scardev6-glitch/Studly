#!/bin/bash
# Studly - Heroku Deployment Script
# Makes deployment to Heroku easy and straightforward

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        Studly - Heroku Deployment Script           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo -e "${RED}❌ Heroku CLI not found. Please install it:${NC}"
    echo "   https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}❌ Git repository not found. Initialize with:${NC}"
    echo "   git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Get action from arguments
ACTION=${1:-help}

case $ACTION in
  "setup")
    echo -e "${YELLOW}📋 Step 1: Login to Heroku${NC}"
    heroku login --interactive
    
    echo ""
    echo -e "${YELLOW}📋 Step 2: Create Heroku App${NC}"
    read -p "Enter app name (must be unique): " APP_NAME
    
    if [ -z "$APP_NAME" ]; then
      echo -e "${RED}❌ App name cannot be empty${NC}"
      exit 1
    fi
    
    heroku create "$APP_NAME"
    echo -e "${GREEN}✓ App created: $APP_NAME${NC}"
    
    echo ""
    echo -e "${YELLOW}📋 Step 3: Set Environment Variables${NC}"
    
    # Generate secure JWT secret
    JWT_SECRET=$(openssl rand -hex 32)
    echo -e "${BLUE}Generated JWT_SECRET${NC}"
    
    # Collect environment variables
    echo ""
    echo -e "${YELLOW}Please provide the following:${NC}"
    read -p "MongoDB URI (get from MongoDB Atlas): " MONGODB_URI
    read -p "Gemini API Key (get from Google AI Studio): " GEMINI_API_KEY
    read -p "Email Service (gmail/smtp/sendgrid/test): " EMAIL_SERVICE
    
    if [ "$EMAIL_SERVICE" = "smtp" ] || [ "$EMAIL_SERVICE" = "gmail" ]; then
      read -p "Email User (e.g., your_email@gmail.com): " EMAIL_USER
      read -sp "Email Password (or App Password): " EMAIL_PASSWORD
      echo ""
    fi
    
    read -p "Frontend URL (usually https://$APP_NAME.herokuapp.com): " FRONTEND_URL
    
    # Set environment variables
    echo ""
    echo -e "${BLUE}Setting environment variables...${NC}"
    
    heroku config:set \
      JWT_SECRET="$JWT_SECRET" \
      NODE_ENV=production \
      MONGODB_URI="$MONGODB_URI" \
      GEMINI_API_KEY="$GEMINI_API_KEY" \
      EMAIL_SERVICE="$EMAIL_SERVICE" \
      FRONTEND_URL="$FRONTEND_URL"
    
    if [ "$EMAIL_SERVICE" = "smtp" ] || [ "$EMAIL_SERVICE" = "gmail" ]; then
      heroku config:set \
        EMAIL_USER="$EMAIL_USER" \
        EMAIL_PASSWORD="$EMAIL_PASSWORD" \
        EMAIL_HOST=smtp.gmail.com \
        EMAIL_PORT=587 \
        EMAIL_SECURE=false
    fi
    
    echo -e "${GREEN}✓ Environment variables set${NC}"
    
    echo ""
    echo -e "${YELLOW}📋 Step 4: Deploy Application${NC}"
    read -p "Deploy now? (y/n): " DEPLOY
    
    if [ "$DEPLOY" = "y" ]; then
      echo -e "${BLUE}Deploying to Heroku...${NC}"
      git push heroku main 2>&1 | tail -20
      echo -e "${GREEN}✓ Deployment complete${NC}"
      
      echo ""
      echo -e "${YELLOW}📋 Step 5: View Logs${NC}"
      read -p "View logs? (y/n): " VIEW_LOGS
      if [ "$VIEW_LOGS" = "y" ]; then
        heroku logs --tail --max-log-lines 50
      fi
    fi
    
    echo ""
    echo -e "${GREEN}✓ Setup complete!${NC}"
    echo -e "${BLUE}App URL: https://$APP_NAME.herokuapp.com${NC}"
    ;;
    
  "deploy")
    echo -e "${BLUE}Deploying to Heroku...${NC}"
    git push heroku main
    echo -e "${GREEN}✓ Deployment complete${NC}"
    ;;
    
  "logs")
    echo -e "${BLUE}Streaming logs (Ctrl+C to stop)...${NC}"
    heroku logs --tail
    ;;
    
  "status")
    echo -e "${BLUE}App Status:${NC}"
    heroku apps:info
    echo ""
    echo -e "${BLUE}Dyno Status:${NC}"
    heroku ps
    ;;
    
  "config")
    echo -e "${BLUE}Current Environment Variables:${NC}"
    heroku config
    ;;
    
  "set-env")
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo -e "${RED}Usage: ./deploy.sh set-env KEY VALUE${NC}"
      exit 1
    fi
    echo -e "${BLUE}Setting $2...${NC}"
    heroku config:set "$2=$3"
    echo -e "${GREEN}✓ Environment variable updated${NC}"
    ;;
    
  "rollback")
    echo -e "${BLUE}Recent Releases:${NC}"
    heroku releases
    echo ""
    read -p "Enter release version to rollback to (e.g., v5): " RELEASE
    if [ -z "$RELEASE" ]; then
      echo -e "${RED}❌ Release version required${NC}"
      exit 1
    fi
    heroku releases:rollback "$RELEASE"
    echo -e "${GREEN}✓ Rolled back to $RELEASE${NC}"
    ;;
    
  "seed")
    echo -e "${BLUE}Running seed data script...${NC}"
    heroku run npm run seed
    echo -e "${GREEN}✓ Seed complete${NC}"
    ;;
    
  "open")
    echo -e "${BLUE}Opening app in browser...${NC}"
    heroku open
    ;;
    
  "scale")
    if [ -z "$2" ]; then
      echo -e "${RED}Usage: ./deploy.sh scale NUMBER${NC}"
      exit 1
    fi
    echo -e "${BLUE}Scaling to $2 dynos...${NC}"
    heroku ps:scale web="$2"
    echo -e "${GREEN}✓ Scaled to $2 dynos${NC}"
    ;;
    
  "help")
    echo -e "${YELLOW}Usage: ./deploy.sh [command]${NC}"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  setup           Complete setup and deployment (recommended first time)"
    echo "  deploy          Deploy current code to Heroku"
    echo "  logs            View real-time application logs"
    echo "  status          Check app and dyno status"
    echo "  config          View environment variables"
    echo "  set-env KEY VAL Set environment variable"
    echo "  seed            Run database seeding script"
    echo "  open            Open app in browser"
    echo "  rollback        Rollback to previous deployment"
    echo "  scale N         Scale to N dynos (paid feature)"
    echo "  help            Show this help message"
    echo ""
    echo -e "${BLUE}Examples:${NC}"
    echo "  ./deploy.sh setup"
    echo "  ./deploy.sh deploy"
    echo "  ./deploy.sh logs"
    echo "  ./deploy.sh set-env GEMINI_API_KEY your_key"
    ;;
    
  *)
    echo -e "${RED}❌ Unknown command: $ACTION${NC}"
    echo "Run './deploy.sh help' for available commands"
    exit 1
    ;;
esac
