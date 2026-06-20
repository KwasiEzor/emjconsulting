#!/bin/bash
set -e

# Define colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Starting project verification checkup...${NC}\n"

# 1. Run ESLint
echo -e "🧹 ${YELLOW}Running linter (ESLint)...${NC}"
if npm run lint; then
  echo -e "✅ ${GREEN}Lint check passed!${NC}\n"
else
  echo -e "❌ ${RED}Lint check failed!${NC}\n"
  exit 1
fi

# 2. Run TypeScript build verification
echo -e "📦 ${YELLOW}Checking TypeScript compilation...${NC}"
if npx tsc -b; then
  echo -e "✅ ${GREEN}TypeScript compilation passed!${NC}\n"
else
  echo -e "❌ ${RED}TypeScript compilation failed!${NC}\n"
  exit 1
fi

# 3. Run production build
echo -e "🚀 ${YELLOW}Building production bundle...${NC}"
if npm run build; then
  echo -e "✅ ${GREEN}Production build passed!${NC}\n"
else
  echo -e "❌ ${RED}Production build failed!${NC}\n"
  exit 1
fi

# 4. Check if we have DB connectivity
if [ -f .env.local ]; then
  echo -e "🔌 ${YELLOW}Verifying database connectivity...${NC}"
  if node scripts/verify-db.js; then
    echo -e "✅ ${GREEN}Database sanity check passed!${NC}\n"
  else
    echo -e "❌ ${RED}Database sanity check failed!${NC}\n"
    exit 1
  fi
else
  echo -e "⚠️  ${YELLOW}Skipping DB connection check (.env.local not found)${NC}\n"
fi

echo -e "🎉 ${GREEN}Verification passed successfully! Code is ready for commit/push.${NC}"
