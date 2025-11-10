# 🚀 MagnetHub SDK - Quick Setup Guide

Welcome to MagnetHub SDK! This guide will help you get started in minutes.

## ✅ What's Included

Your MagnetHub SDK project is now ready with:

- ✨ **Core SDK Files** (`src/magnethub-core.js` & `src/magnethub-game.js`)
- 📝 **Complete Documentation** (`docs/api.md`)
- 🧪 **Working Examples** (`examples/parent.html` & `examples/game.html`)
- 📦 **npm Package Configuration** (`package.json`)
- 🔧 **TypeScript Definitions** (`index.d.ts`)
- 🎨 **Code Quality Tools** (ESLint & Prettier)
- 🤖 **GitHub Actions CI** (`.github/workflows/ci.yml`)
- 📖 **Contributing Guide** (`CONTRIBUTING.md`)

## 🎯 Quick Test (5 seconds)

1. **Start the local server:**

   ```bash
   npx serve examples
   ```

2. **Open your browser:**

   ```
   http://localhost:3000/parent.html
   ```

3. **You should see:**
   - A parent page with control buttons
   - An embedded game iframe
   - Real-time message exchange in console logs
   - Interactive score updates

## 📦 Publish to npm

When ready to publish:

```bash
# 1. Login to npm
npm login

# 2. Publish (first time)
npm publish --access public

# 3. Update version for future releases
npm version patch  # or minor, or major
npm publish
```

## 🔨 Development Commands

```bash
# Install dependencies
npm install

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:check

# Test locally
npx serve examples
```

## 📁 Project Structure

```
magnethub-sdk/
├── src/
│   ├── magnethub-core.js      # Parent page SDK
│   └── magnethub-game.js      # Game iframe SDK
├── examples/
│   ├── parent.html            # Example host page
│   └── game.html              # Example game
├── docs/
│   └── api.md                 # API documentation
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions
├── index.d.ts                 # TypeScript definitions
├── package.json               # npm configuration
├── .eslintrc.json            # ESLint config
├── .prettierrc.json          # Prettier config
├── .gitignore                # Git ignore rules
├── LICENSE                    # Apache 2.0
├── README.md                  # Main documentation
└── CONTRIBUTING.md            # Contribution guide
```

## 🎮 Basic Usage

### Parent Page

```javascript
import MagnetHubCore from './src/magnethub-core.js';

const hub = new MagnetHubCore({ iframeId: 'gameFrame' });
hub.on('score', (data) => console.log('Score:', data.score));
hub.send('startGame', { level: 1 });
```

### Game Iframe

```javascript
import MagnetHubGame from './src/magnethub-game.js';

const hub = new MagnetHubGame();
hub.send('gameLoaded');
hub.on('pauseGame', () => console.log('Paused!'));
```

## 🌐 Integration with Game Engines

### Unity WebGL

See `docs/api.md` for complete Unity integration with C# bridge and .jslib plugin.

### Godot Web Export

See `docs/api.md` for GDScript integration examples.

### Phaser.js

See `docs/api.md` for Phaser integration examples.

## 📚 Next Steps

1. ✅ **Test the examples** - Run `npx serve examples` and test the SDK
2. 📖 **Read the API docs** - Check out `docs/api.md` for detailed API reference
3. 🎮 **Integrate your game** - Use the SDK in your game engine
4. 🚀 **Publish to npm** - Share your SDK with the world
5. 🤝 **Contribute** - Read `CONTRIBUTING.md` and submit PRs

## 🐛 Troubleshooting

### Iframe not loading?

- Make sure you're using an HTTP server (not `file://`)
- Check browser console for CORS errors
- Verify the iframe `src` path is correct

### Messages not sending?

- Ensure both parent and game are using the SDK
- Check that event names match exactly
- Look for console warnings about validation

### TypeScript errors?

- Make sure `index.d.ts` is in your project root
- Update your `tsconfig.json` to include the types

## 💡 Tips

- Use meaningful event names (e.g., `gameLoaded`, `scoreUpdate`)
- Always validate incoming data
- Keep message payloads small and JSON-serializable
- Test in multiple browsers (Chrome, Firefox, Safari)
- Use browser DevTools to debug postMessage events

## 🔗 Useful Links

- **GitHub Repo:** https://github.com/magnet-hub/magnethub-sdk
- **npm Package:** https://www.npmjs.com/package/@magnethub/sdk
- **API Docs:** `docs/api.md`
- **Issues:** https://github.com/magnet-hub/magnethub-sdk/issues

## 🎉 You're All Set!

Your MagnetHub SDK is ready to use. Start building amazing iframe-embedded games!

---

**Need help?** Open an issue on GitHub or check the documentation.

Made with 🧲 by MagnetHub
