# 📦 MagnetHub SDK - Versioning & Distribution Guide

This guide explains how users can fetch and use specific versions of the MagnetHub SDK.

## 🔢 Version Format

MagnetHub SDK follows **Semantic Versioning** (SemVer):

```
MAJOR.MINOR.PATCH (e.g., 0.1.0)
```

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Current Version: **0.1.0**

---

## 📥 Installation Methods

### 1. npm (Recommended)

#### Install Latest Version
```bash
npm install @magnethub/sdk
```

#### Install Specific Version
```bash
npm install @magnethub/sdk@0.1.0
```

#### Install Version Range
```bash
# Latest patch of 0.1.x
npm install @magnethub/sdk@^0.1.0

# Exact version
npm install @magnethub/sdk@0.1.0

# Latest minor version
npm install @magnethub/sdk@~0.1.0
```

#### Check Installed Version
```javascript
import MagnetHubCore from '@magnethub/sdk';
console.log(MagnetHubCore.VERSION); // "0.1.0"
```

---

### 2. CDN (unpkg)

#### Latest Version (Auto-updates)
```html
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk/src/magnethub-core.js';
  import MagnetHubGame from 'https://unpkg.com/@magnethub/sdk/src/magnethub-game.js';
</script>
```

#### Specific Version (Locked)
```html
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk@0.1.0/src/magnethub-core.js';
  import MagnetHubGame from 'https://unpkg.com/@magnethub/sdk@0.1.0/src/magnethub-game.js';
</script>
```

#### Version Range
```html
<!-- Latest 0.1.x version -->
<script type="module">
  import MagnetHubCore from 'https://unpkg.com/@magnethub/sdk@^0.1.0/src/magnethub-core.js';
</script>
```

---

### 3. CDN (jsDelivr)

#### Latest Version
```html
<script type="module">
  import MagnetHubCore from 'https://cdn.jsdelivr.net/npm/@magnethub/sdk/src/magnethub-core.js';
</script>
```

#### Specific Version
```html
<script type="module">
  import MagnetHubCore from 'https://cdn.jsdelivr.net/npm/@magnethub/sdk@0.1.0/src/magnethub-core.js';
</script>
```

---

### 4. GitHub Releases

#### Download Specific Release
```bash
# Via wget
wget https://github.com/magnet-hub/magnethub-sdk/archive/refs/tags/v0.1.0.zip

# Via curl
curl -L https://github.com/magnet-hub/magnethub-sdk/archive/refs/tags/v0.1.0.tar.gz -o magnethub-sdk.tar.gz
```

#### Clone Specific Tag
```bash
git clone --branch v0.1.0 https://github.com/magnet-hub/magnethub-sdk.git
```

---

## 🏷️ Checking SDK Version

### In Browser Console
```javascript
import MagnetHubCore from '@magnethub/sdk';
import MagnetHubGame from '@magnethub/sdk/src/magnethub-game.js';

console.log('Core Version:', MagnetHubCore.VERSION);
console.log('Game Version:', MagnetHubGame.VERSION);
```

### In package.json
```json
{
  "dependencies": {
    "@magnethub/sdk": "^0.1.0"
  }
}
```

Check installed version:
```bash
npm list @magnethub/sdk
```

---

## 🚀 Version Migration Guide

### Upgrading to a New Version

#### 1. Update package.json
```bash
npm install @magnethub/sdk@latest
```

#### 2. Check Changelog
Review `CHANGELOG.md` for breaking changes.

#### 3. Update Your Code
Follow migration guides for major version changes.

### Downgrading to Previous Version
```bash
npm install @magnethub/sdk@0.1.0
```

---

## 📋 Version Compatibility

| SDK Version | Browser Support | Node.js |
|-------------|----------------|---------|
| 0.1.0       | Modern browsers (ES6+) | 14+ |

### Browser Compatibility
- ✅ Chrome 63+
- ✅ Firefox 60+
- ✅ Safari 11.1+
- ✅ Edge 79+

---

## 🔒 Version Pinning (Production)

For production environments, **always pin to a specific version**:

### ❌ Don't (Auto-updates)
```json
{
  "dependencies": {
    "@magnethub/sdk": "latest"
  }
}
```

### ✅ Do (Locked version)
```json
{
  "dependencies": {
    "@magnethub/sdk": "0.1.0"
  }
}
```

### ✅ Also Good (Patch updates only)
```json
{
  "dependencies": {
    "@magnethub/sdk": "~0.1.0"
  }
}
```

---

## 📦 Package Lock

Always commit `package-lock.json` to ensure consistent versions:

```bash
git add package-lock.json
git commit -m "chore: lock dependencies"
```

---

## 🏷️ Creating New Releases (Maintainers)

### 1. Update Version
```bash
# Patch (0.1.0 -> 0.1.1)
npm version patch

# Minor (0.1.0 -> 0.2.0)
npm version minor

# Major (0.1.0 -> 1.0.0)
npm version major
```

### 2. Update Changelog
```bash
# Add changes to CHANGELOG.md
```

### 3. Commit & Tag
```bash
git add .
git commit -m "chore: release v0.2.0"
git tag v0.2.0
git push origin main --tags
```

### 4. Publish to npm
```bash
npm publish --access public
```

### 5. Create GitHub Release
Go to: https://github.com/magnet-hub/magnethub-sdk/releases/new

---

## 🔄 Version History

| Version | Release Date | Notes |
|---------|--------------|-------|
| 0.1.0   | 2025-11-10  | Initial release |

---

## 📚 Additional Resources

- [Semantic Versioning](https://semver.org/)
- [npm versioning](https://docs.npmjs.com/about-semantic-versioning)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

---

## 💡 Best Practices

1. **Lock versions in production** - Use exact versions or `~` for patch updates
2. **Test before upgrading** - Always test new versions in development first
3. **Read changelogs** - Check for breaking changes before major updates
4. **Use CDN with versions** - Specify version in CDN URLs for production
5. **Monitor releases** - Watch the GitHub repo for new releases

---

**Current Version:** 0.1.0  
**Last Updated:** November 10, 2025
