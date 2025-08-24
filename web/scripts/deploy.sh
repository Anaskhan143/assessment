#!/bin/bash

# Theme & Language Toggle App Deployment Script
# Usage: ./scripts/deploy.sh [dev|prod]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if environment argument is provided
if [ $# -eq 0 ]; then
    print_error "Please specify environment: dev or prod"
    echo "Usage: $0 [dev|prod]"
    exit 1
fi

ENVIRONMENT=$1

# Validate environment argument
if [ "$ENVIRONMENT" != "dev" ] && [ "$ENVIRONMENT" != "prod" ]; then
    print_error "Invalid environment. Use 'dev' or 'prod'"
    exit 1
fi

print_status "Starting deployment for $ENVIRONMENT environment..."

# Set environment variables
if [ "$ENVIRONMENT" = "prod" ]; then
    export NODE_ENV=production
    export COOKIE_SECURE=true
    export CORS_ORIGIN=https://yourdomain.com
    print_status "Production environment configured"
else
    export NODE_ENV=development
    export COOKIE_SECURE=false
    export CORS_ORIGIN=http://localhost:3000
    print_status "Development environment configured"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Run tests
print_status "Running tests..."
npm run test

# Run E2E tests
print_status "Running E2E tests..."
npm run test:e2e

# Build the application
print_status "Building application..."
npm run build

# Start the application
if [ "$ENVIRONMENT" = "prod" ]; then
    print_status "Starting production server..."
    npm run preview
else
    print_status "Starting development server..."
    npm run dev
fi

print_status "Deployment completed successfully!"
print_status "Application is running on http://localhost:3000"
