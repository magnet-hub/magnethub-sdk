#!/bin/bash
# MagnetHub SDK Release Script
# Usage: ./release.sh [patch|minor|major]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 MagnetHub SDK Release Script${NC}"
echo ""

# Check if version type is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Please specify version type (patch, minor, or major)${NC}"
  echo "Usage: ./release.sh [patch|minor|major]"
  exit 1
fi

VERSION_TYPE=$1

# Validate version type
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo -e "${RED}Error: Invalid version type. Use patch, minor, or major${NC}"
  exit 1
fi

echo -e "${BLUE}Step 1: Running tests...${NC}"
npm test || { echo -e "${RED}Tests failed!${NC}"; exit 1; }

echo -e "${BLUE}Step 2: Running linter...${NC}"
npm run lint || { echo -e "${RED}Linting failed!${NC}"; exit 1; }

echo -e "${BLUE}Step 3: Bumping version ($VERSION_TYPE)...${NC}"
npm version $VERSION_TYPE --no-git-tag-version

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")

echo -e "${BLUE}Step 4: Updating version.js...${NC}"
cat > src/version.js << EOF
/**
 * MagnetHub SDK Version Information
 * @version $NEW_VERSION
 */

export const VERSION = '$NEW_VERSION';

export const SDK_INFO = {
  name: 'MagnetHub SDK',
  version: '$NEW_VERSION',
  releaseDate: '$(date +%Y-%m-%d)',
  author: 'MagnetHub Team',
  license: 'Apache-2.0'
};

export default VERSION;
EOF

echo -e "${BLUE}Step 5: Prompting for changelog updates...${NC}"
echo "Please update CHANGELOG.md with release notes for v$NEW_VERSION"
echo "Press Enter when done..."
read

echo -e "${BLUE}Step 6: Committing changes...${NC}"
git add package.json package-lock.json src/version.js CHANGELOG.md
git commit -m "chore: release v$NEW_VERSION"

echo -e "${BLUE}Step 7: Creating git tag...${NC}"
git tag "v$NEW_VERSION"

echo ""
echo -e "${GREEN}✅ Version $NEW_VERSION prepared successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git log -1"
echo "  2. Push to GitHub: git push origin main --tags"
echo "  3. Publish to npm: npm publish --access public"
echo "  4. Create GitHub release: https://github.com/magnet-hub/magnethub-sdk/releases/new"
echo ""
