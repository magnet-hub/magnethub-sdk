# 🎯 MagnetHub SDK - Version Quick Reference

## 📥 How Users Can Fetch Specific Versions

### Method 1: npm (Recommended)

```bash
# Latest version
npm install @magnethub/sdk

# Specific version (locked)
npm install @magnethub/sdk@0.1.0

# Latest patch (e.g., 0.1.x)
npm install @magnethub/sdk@~0.1.0

# Latest minor (e.g., 0.x.x)
npm install @magnethub/sdk@^0.1.0
```

### Method 2: CDN - unpkg

```html
<!-- Latest (auto-updates, not recommended for production) -->
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk/src/magnethub-core.js';
</script>

<!-- Specific version (recommended) -->
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk@0.1.0/src/magnethub-core.js';
</script>

<!-- Version range (latest 0.1.x) -->
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk@^0.1.0/src/magnethub-core.js';
</script>
```

### Method 3: CDN - jsDelivr

```html
<!-- Specific version -->
<script type="module">
  import MagnetHubCore from 'https://cdn.jsdelivr.net/npm/@magnethub/sdk@0.1.0/src/magnethub-core.js';
</script>

<!-- Latest -->
<script type="module">
  import MagnetHubCore from 'https://cdn.jsdelivr.net/npm/@magnethub/sdk/src/magnethub-core.js';
</script>
```

### Method 4: GitHub Releases

```bash
# Download specific release
wget https://github.com/magnet-hub/magnethub-sdk/archive/refs/tags/v0.1.0.zip

# Clone specific tag
git clone --branch v0.1.0 https://github.com/magnet-hub/magnethub-sdk.git
```

## 🔍 Check Current Version

```javascript
import MagnetHubCore from '@magnethub/sdk';
import MagnetHubGame from '@magnethub/sdk/src/magnethub-game.js';

console.log('Core Version:', MagnetHubCore.VERSION);
console.log('Game Version:', MagnetHubGame.VERSION);
```

## 📦 Version in package.json

```json
{
  "dependencies": {
    "@magnethub/sdk": "0.1.0"     // Exact version (recommended)
  }
}
```

```json
{
  "dependencies": {
    "@magnethub/sdk": "^0.1.0"    // Allow minor & patch updates
  }
}
```

```json
{
  "dependencies": {
    "@magnethub/sdk": "~0.1.0"    // Allow patch updates only
  }
}
```

## 🏷️ Semantic Versioning

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └─ Bug fixes (0.1.0 → 0.1.1)
  │     └─────── New features (0.1.0 → 0.2.0)
  └───────────── Breaking changes (0.1.0 → 1.0.0)
```

## 🚀 For Maintainers: Creating a New Release

### Option 1: Automated Script

```bash
# Patch release (0.1.0 → 0.1.1)
./release.sh patch

# Minor release (0.1.0 → 0.2.0)
./release.sh minor

# Major release (0.1.0 → 1.0.0)
./release.sh major
```

### Option 2: Manual Process

```bash
# 1. Bump version
npm version patch  # or minor, or major

# 2. Update version.js
# Edit src/version.js with new version and date

# 3. Update CHANGELOG.md
# Add release notes

# 4. Commit and tag
git add .
git commit -m "chore: release v0.1.1"
git tag v0.1.1

# 5. Push to GitHub
git push origin main --tags

# 6. Publish to npm
npm publish --access public

# 7. Create GitHub Release
# Go to: https://github.com/magnet-hub/magnethub-sdk/releases/new
```

## 📊 Version Commands

```bash
# Check current version
npm version

# List installed version
npm list @magnethub/sdk

# View available versions on npm
npm view @magnethub/sdk versions

# Update to latest
npm update @magnethub/sdk

# View package info
npm info @magnethub/sdk
```

## 🔐 Production Best Practices

✅ **DO:**
- Use exact versions in production: `"@magnethub/sdk": "0.1.0"`
- Test new versions in development before upgrading
- Lock dependencies with `package-lock.json`
- Specify versions in CDN URLs

❌ **DON'T:**
- Use `"latest"` in package.json
- Skip reading CHANGELOG.md before upgrading
- Use unversioned CDN URLs in production
- Auto-update in CI/CD without testing

## 📚 More Information

- **Full Versioning Guide:** `VERSIONING.md`
- **Changelog:** `CHANGELOG.md`
- **Releases:** https://github.com/magnet-hub/magnethub-sdk/releases
- **npm Package:** https://www.npmjs.com/package/@magnethub/sdk

---

**Current Version:** 0.1.0  
**Updated:** November 10, 2025
