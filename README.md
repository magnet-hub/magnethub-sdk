# 🧲 MagnetHub SDK

> A lightweight, framework-agnostic JavaScript SDK for two-way communication between web platforms and embedded games (WebGL, Unity, Godot, Phaser, etc.) using iframes.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://img.shields.io/npm/v/@magnethub/sdk.svg)](https://www.npmjs.com/package/@magnethub/sdk)

---

## ✨ Features

- 🚀 **Lightweight** — Pure JavaScript, no dependencies
- 🔄 **Two-way Communication** — Parent ↔ Iframe messaging using `postMessage`
- 🎮 **Game Engine Ready** — Easy integration with Unity, Godot, Phaser, and more
- 📦 **Framework Agnostic** — Works with any web framework or vanilla JS
- 🛡️ **Type Safe** — Includes TypeScript definitions (optional)
- 📖 **Well Documented** — Complete API docs and examples

---

## 📦 Installation

### Using npm

```bash
npm install @magnethub/sdk
```

### Using CDN

```html
<script type="module" src="https://unpkg.com/@magnethub/sdk/src/magnethub-core.js"></script>
```

### Direct Download

Clone or download from [GitHub](https://github.com/magnet-hub/magnethub-sdk):

```bash
git clone https://github.com/magnet-hub/magnethub-sdk.git
```

---

## 🚀 Quick Start

### Parent Page (Host Site)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Game Platform</title>
</head>
<body>
  <iframe id="gameFrame" src="game.html" width="800" height="600"></iframe>

  <script type="module">
    import MagnetHubCore from './src/magnethub-core.js';

    const hub = new MagnetHubCore({ 
      iframeId: 'gameFrame', 
      apiKey: 'your-api-key' 
    });

    // Listen for events from the game
    hub.on('score', (data) => {
      console.log('Score:', data.score);
    });

    hub.on('gameOver', (data) => {
      console.log('Game Over! Final Score:', data.score);
    });

    // Send events to the game
    hub.send('startGame', { level: 1 });
  </script>
</body>
</html>
```

### Game Page (Embedded Iframe)

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Game</title>
</head>
<body>
  <canvas id="gameCanvas"></canvas>

  <script type="module">
    import MagnetHubGame from './src/magnethub-game.js';

    const hub = new MagnetHubGame();

    // Notify parent that game is loaded
    hub.send('gameLoaded');

    // Listen for events from parent
    hub.on('startGame', (data) => {
      console.log('Starting game at level:', data.level);
      // Start game logic here
    });

    hub.on('pauseGame', () => {
      // Pause game logic
    });

    // Send score updates
    function updateScore(score) {
      hub.send('score', { score });
    }

    // Send game over event
    function endGame(finalScore) {
      hub.send('gameOver', { score: finalScore });
    }
  </script>
</body>
</html>
```

---

## 📖 API Reference

### MagnetHubCore (Parent Page)

#### Constructor

```javascript
new MagnetHubCore({ iframeId, apiKey })
```

**Parameters:**
- `iframeId` (string, required) - ID of the iframe element
- `apiKey` (string, optional) - API key for authentication

#### Methods

**`.send(event, data)`**

Sends a message to the game iframe.

```javascript
hub.send('pauseGame', { reason: 'User paused' });
```

**`.on(event, callback)`**

Listens for events from the game iframe.

```javascript
hub.on('score', (data) => {
  console.log('Score:', data.score);
});
```

---

### MagnetHubGame (Game Iframe)

#### Constructor

```javascript
new MagnetHubGame()
```

#### Methods

**`.send(event, data)`**

Sends a message to the parent page.

```javascript
hub.send('score', { score: 1000 });
```

**`.on(event, callback)`**

Listens for events from the parent page.

```javascript
hub.on('pauseGame', () => {
  // Pause game
});
```

---

## 🎮 Game Engine Integration

### Unity WebGL

Create a C# script to bridge Unity with MagnetHub:

```csharp
using UnityEngine;
using System.Runtime.InteropServices;

public class MagnetHubBridge : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void SendToParent(string eventName, string jsonData);

    void Start()
    {
        SendToParent("gameLoaded", "{}");
    }

    public void SendScore(int score)
    {
        string json = $"{{\"score\": {score}}}";
        SendToParent("score", json);
    }
}
```

Create `Assets/Plugins/WebGL/MagnetHubPlugin.jslib`:

```javascript
mergeInto(LibraryManager.library, {
    SendToParent: function(eventName, jsonData) {
        var event = UTF8ToString(eventName);
        var data = JSON.parse(UTF8ToString(jsonData));
        
        window.parent.postMessage({
            event: event,
            data: data,
            source: 'magnethub-game'
        }, '*');
    }
});
```

### Godot Web Export

```gdscript
extends Node

func send_to_parent(event_name: String, data: Dictionary):
    if OS.has_feature("JavaScript"):
        var json_data = JSON.print(data)
        var js_code = """
        window.parent.postMessage({
            event: '%s',
            data: %s,
            source: 'magnethub-game'
        }, '*');
        """ % [event_name, json_data]
        
        JavaScript.eval(js_code)

func _ready():
    send_to_parent("gameLoaded", {})

func send_score(score: int):
    send_to_parent("score", {"score": score})
```

### Phaser.js

```javascript
import MagnetHubGame from './src/magnethub-game.js';

const hub = new MagnetHubGame();

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        create: function() {
            hub.send('gameLoaded');
            
            hub.on('pauseGame', () => {
                this.scene.pause();
            });
        }
    }
};

const game = new Phaser.Game(config);
```

---

## 📚 Documentation

- [API Documentation](docs/api.md) - Complete API reference
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Examples](examples/) - Working examples

---

## 🧪 Testing Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/magnet-hub/magnethub-sdk.git
   cd magnethub-sdk
   ```

2. Serve the examples:
   ```bash
   npx serve examples
   ```

3. Open your browser:
   ```
   http://localhost:3000/parent.html
   ```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR-USERNAME/magnethub-sdk.git
cd magnethub-sdk

# Install dependencies
npm install

# Test examples
npx serve examples
```

---

## 📋 Common Events

### Parent → Game

| Event | Description | Example Data |
|-------|-------------|--------------|
| `startGame` | Start the game | `{ level: 1 }` |
| `pauseGame` | Pause the game | `{ reason: 'User paused' }` |
| `resumeGame` | Resume the game | `null` |
| `resetGame` | Reset the game | `null` |

### Game → Parent

| Event | Description | Example Data |
|-------|-------------|--------------|
| `gameLoaded` | Game finished loading | `{ timestamp: 1234567890 }` |
| `score` | Score update | `{ score: 1000 }` |
| `gameOver` | Game ended | `{ score: 1500 }` |
| `levelComplete` | Level completed | `{ level: 1, score: 500 }` |

---

## 🛡️ Security

- Always validate incoming data
- Use specific origins in production instead of `'*'`
- Don't send sensitive data through postMessage

---

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 MagnetHub

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

---

## 🙏 Acknowledgments

Built with ❤️ by the MagnetHub team.

---

## 📞 Support

- 📧 Issues: [GitHub Issues](https://github.com/magnet-hub/magnethub-sdk/issues)
- 📖 Docs: [API Documentation](docs/api.md)
- 💬 Discussions: [GitHub Discussions](https://github.com/magnet-hub/magnethub-sdk/discussions)

---

Made with 🧲 by MagnetHub