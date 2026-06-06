#!/bin/bash
# Test runner script for Studly app

set -e

echo "🧪 Studly Testing Suite"
echo "======================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default action
ACTION=${1:-"all"}

case $ACTION in
  "backend")
    echo -e "${BLUE}Running Backend Tests...${NC}"
    npm test
    ;;
  
  "backend:watch")
    echo -e "${BLUE}Running Backend Tests (Watch Mode)...${NC}"
    npm run test:watch
    ;;

  "backend:coverage")
    echo -e "${BLUE}Running Backend Tests with Coverage...${NC}"
    npm test -- --coverage
    ;;

  "backend:unit")
    echo -e "${BLUE}Running Backend Unit Tests...${NC}"
    npm run test:unit
    ;;

  "backend:controllers")
    echo -e "${BLUE}Running Backend Controller Tests...${NC}"
    npm run test:controllers
    ;;

  "frontend")
    echo -e "${BLUE}Running Frontend Tests...${NC}"
    cd frontend
    npm test
    cd ..
    ;;

  "frontend:watch")
    echo -e "${BLUE}Running Frontend Tests (Watch Mode)...${NC}"
    cd frontend
    npm run test:watch
    cd ..
    ;;

  "frontend:coverage")
    echo -e "${BLUE}Running Frontend Tests with Coverage...${NC}"
    cd frontend
    npm run test:coverage
    cd ..
    ;;

  "frontend:ui")
    echo -e "${BLUE}Running Frontend Tests with UI...${NC}"
    cd frontend
    npm run test:ui
    cd ..
    ;;

  "all")
    echo -e "${BLUE}Running All Tests (Backend + Frontend)...${NC}"
    echo -e "${YELLOW}Backend Tests:${NC}"
    npm test -- --passWithNoTests
    echo ""
    echo -e "${YELLOW}Frontend Tests:${NC}"
    cd frontend
    npm test -- --run
    cd ..
    echo ""
    echo -e "${GREEN}✓ All tests completed!${NC}"
    ;;

  "install")
    echo -e "${BLUE}Installing test dependencies...${NC}"
    npm install
    cd frontend
    npm install
    cd ..
    echo -e "${GREEN}✓ Dependencies installed!${NC}"
    ;;

  "help")
    echo "Usage: ./test.sh [action]"
    echo ""
    echo "Available actions:"
    echo "  all                  Run all tests (backend + frontend)"
    echo "  backend              Run backend tests"
    echo "  backend:watch        Run backend tests in watch mode"
    echo "  backend:coverage     Run backend tests with coverage report"
    echo "  backend:unit         Run backend unit tests only"
    echo "  backend:controllers  Run backend controller tests only"
    echo "  frontend             Run frontend tests"
    echo "  frontend:watch       Run frontend tests in watch mode"
    echo "  frontend:coverage    Run frontend tests with coverage report"
    echo "  frontend:ui          Run frontend tests with UI dashboard"
    echo "  install              Install test dependencies"
    echo "  help                 Show this help message"
    echo ""
    ;;

  *)
    echo -e "${YELLOW}Unknown action: $ACTION${NC}"
    echo "Run './test.sh help' for available actions"
    exit 1
    ;;
esac
