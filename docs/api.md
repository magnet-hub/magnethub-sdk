# 📚 MagnetHub SDK API Reference

Complete API documentation for MagnetHub SDK — a lightweight two-way communication library for iframe-embedded games.

---

## Table of Contents

- [MagnetHubCore (Parent Page)](#magnethubcore-parent-page)
- [MagnetHubGame (Game Iframe)](#magnethubgame-game-iframe)
- [Message Structure](#message-structure)
- [Events](#events)
- [Integration Examples](#integration-examples)

---

## MagnetHubCore (Parent Page)

The parent page SDK manages communication with an embedded game iframe.

### Constructor

```javascript
new MagnetHubCore({ iframeId, apiKey });
```

**Parameters:**

- `iframeId` (string, required) - The DOM ID of the iframe element
- `apiKey` (string, optional) - API key for authentication

**Example:**

```javascript
const hub = new MagnetHubCore({
  iframeId: 'gameFrame',
  apiKey: 'your-api-key',
});
```

### Methods

#### `.send(event, data)`

Sends a message to the embedded game iframe.

**Parameters:**

- `event` (string, required) - The event name
- `data` (any, optional) - Data to send with the event

**Returns:** void

**Example:**

```javascript
hub.send('pauseGame', { reason: 'User paused' });
hub.send('startGame');
```

#### `.on(event, callback)`

Registers a callback to listen for events from the game iframe.

**Parameters:**

- `event` (string, required) - The event name to listen for
- `callback` (function, required) - Function to call when event is received

**Returns:** void

**Example:**

```javascript
hub.on('score', (data) => {
  console.log('Score updated:', data.score);
});

hub.on('gameOver', (data) => {
  console.log('Game ended with score:', data.score);
});
```

---

## MagnetHubGame (Game Iframe)

The game SDK manages communication from within the embedded iframe to the parent page.

### Constructor

```javascript
new MagnetHubGame();
```

**Parameters:** None

**Example:**

```javascript
const hub = new MagnetHubGame();
```

### Methods

#### `.send(event, data)`

Sends a message to the parent page.

**Parameters:**

- `event` (string, required) - The event name
- `data` (any, optional) - Data to send with the event

**Returns:** void

**Example:**

```javascript
hub.send('gameLoaded');
hub.send('score', { score: 1000 });
hub.send('gameOver', { score: 1500, timestamp: Date.now() });
```

#### `.on(event, callback)`

Registers a callback to listen for events from the parent page.

**Parameters:**

- `event` (string, required) - The event name to listen for
- `callback` (function, required) - Function to call when event is received

**Returns:** void

**Example:**

```javascript
hub.on('pauseGame', (data) => {
  console.log('Pausing game:', data.reason);
  // Pause game logic here
});

hub.on('resumeGame', () => {
  console.log('Resuming game');
  // Resume game logic here
});
```

---

## Message Structure

All messages sent through the SDK follow this structure:

```javascript
{
  event: "eventName",      // The event identifier
  data: { /* payload */ }, // Optional data payload
  source: "magnethub-core" // or "magnethub-game"
}
```

The `source` field is automatically added by the SDK to ensure messages are only processed from trusted sources.

---

## Events

### Common Event Types

While you can define custom events, here are some recommended standard events:

#### Parent → Game Events

| Event          | Description                 | Data Example                          |
| -------------- | --------------------------- | ------------------------------------- |
| `startGame`    | Start or restart the game   | `{ level: 1 }`                        |
| `pauseGame`    | Pause the game              | `{ reason: 'User paused' }`           |
| `resumeGame`   | Resume the game             | `null`                                |
| `resetGame`    | Reset game to initial state | `null`                                |
| `configUpdate` | Update game configuration   | `{ volume: 0.8, difficulty: 'hard' }` |

#### Game → Parent Events

| Event           | Description               | Data Example                                 |
| --------------- | ------------------------- | -------------------------------------------- |
| `gameLoaded`    | Game has finished loading | `{ timestamp: 1234567890 }`                  |
| `score`         | Score update              | `{ score: 1000 }`                            |
| `gameOver`      | Game has ended            | `{ score: 1500, reason: 'completed' }`       |
| `gamePaused`    | Game is paused            | `null`                                       |
| `gameResumed`   | Game has resumed          | `null`                                       |
| `levelComplete` | Level completed           | `{ level: 1, score: 500 }`                   |
| `achievement`   | Achievement unlocked      | `{ id: 'first-win', name: 'First Victory' }` |

---

## Integration Examples

### Basic Web Integration

**Parent Page (HTML):**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Game Platform</title>
  </head>
  <body>
    <iframe id="gameFrame" src="game.html" width="800" height="600"></iframe>

    <script type="module">
      import MagnetHubCore from './src/magnethub-core.js';

      const hub = new MagnetHubCore({ iframeId: 'gameFrame' });

      hub.on('score', (data) => console.log('Score:', data.score));
      hub.send('startGame', { level: 1 });
    </script>
  </body>
</html>
```

**Game Page (HTML):**

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

      hub.send('gameLoaded');
      hub.on('pauseGame', () => {
        // Pause game logic
      });
    </script>
  </body>
</html>
```

---

### Unity WebGL Integration

Unity games can communicate with the parent page using JavaScript evaluation.

**Unity C# Script:**

```csharp
using UnityEngine;
using System.Runtime.InteropServices;

public class MagnetHubBridge : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void SendToParent(string eventName, string jsonData);

    void Start()
    {
        // Notify parent that game loaded
        SendToParent("gameLoaded", "{}");
    }

    public void SendScore(int score)
    {
        string json = $"{{\"score\": {score}}}";
        SendToParent("score", json);
    }

    public void OnGameOver(int finalScore)
    {
        string json = $"{{\"score\": {finalScore}}}";
        SendToParent("gameOver", json);
    }
}
```

**Unity WebGL Plugin (Assets/Plugins/WebGL/MagnetHubPlugin.jslib):**

```javascript
mergeInto(LibraryManager.library, {
  SendToParent: function (eventName, jsonData) {
    var event = UTF8ToString(eventName);
    var data = JSON.parse(UTF8ToString(jsonData));

    if (window.parent) {
      window.parent.postMessage(
        {
          event: event,
          data: data,
          source: 'magnethub-game',
        },
        '*'
      );
    }
  },
});
```

**Receiving Messages in Unity:**

Add this to your HTML template:

```javascript
// In your Unity WebGL template
window.addEventListener('message', function (e) {
  if (e.data.source === 'magnethub-core') {
    var event = e.data.event;
    var data = JSON.stringify(e.data.data || {});

    // Send to Unity
    SendMessage('MagnetHubBridge', 'OnParentMessage', event);
  }
});
```

---

### Godot Web Export Integration

Godot can use JavaScript evaluation for communication.

**Godot GDScript:**

```gdscript
extends Node

func _ready():
    # Check if running in browser
    if OS.has_feature("JavaScript"):
        send_to_parent("gameLoaded", {})

func send_to_parent(event_name: String, data: Dictionary):
    if OS.has_feature("JavaScript"):
        var json_data = JSON.print(data)
        var js_code = """
        if (window.parent) {
            window.parent.postMessage({
                event: '%s',
                data: %s,
                source: 'magnethub-game'
            }, '*');
        }
        """ % [event_name, json_data]

        JavaScript.eval(js_code)

func send_score(score: int):
    send_to_parent("score", {"score": score})

func _on_game_over(final_score: int):
    send_to_parent("gameOver", {"score": final_score})
```

**Receiving Messages from Parent:**

```gdscript
func _ready():
    if OS.has_feature("JavaScript"):
        setup_message_listener()

func setup_message_listener():
    var js_code = """
    window.addEventListener('message', function(e) {
        if (e.data.source === 'magnethub-core') {
            // Call Godot function
            godot.MagnetHubBridge.handleParentMessage(
                e.data.event,
                JSON.stringify(e.data.data || {})
            );
        }
    });
    """
    JavaScript.eval(js_code)

# This function will be called from JavaScript
func handle_parent_message(event: String, json_data: String):
    var data = JSON.parse(json_data).result

    match event:
        "pauseGame":
            get_tree().paused = true
        "resumeGame":
            get_tree().paused = false
        "startGame":
            start_game(data)
```

---

### Phaser.js Integration

**Phaser Game:**

```javascript
import MagnetHubGame from './src/magnethub-game.js';

const hub = new MagnetHubGame();

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function create() {
  // Notify parent game is loaded
  hub.send('gameLoaded');

  // Listen for parent commands
  hub.on('pauseGame', () => {
    this.scene.pause();
  });

  hub.on('resumeGame', () => {
    this.scene.resume();
  });
}

function update() {
  // Send score updates
  if (scoreChanged) {
    hub.send('score', { score: currentScore });
  }
}
```

---

## Best Practices

1. **Always validate data**: Check that received data has the expected structure
2. **Handle errors gracefully**: Use try-catch blocks when parsing data
3. **Use meaningful event names**: Make events self-documenting
4. **Keep payloads small**: Only send necessary data
5. **Document custom events**: If you create custom events, document them
6. **Test across browsers**: Ensure compatibility with major browsers

---

## Security Considerations

- The SDK currently uses `'*'` as the target origin for `postMessage`
- For production use, specify exact origins instead of `'*'`
- Validate all incoming data before processing
- Don't send sensitive information through postMessage without encryption

**Example with specific origin:**

```javascript
// In magnethub-core.js
this.iframe.contentWindow.postMessage(
  { event, data, source: 'magnethub-core' },
  'https://yourgamedomain.com' // Instead of '*'
);
```

---

## Support

For questions, issues, or feature requests, please visit:

- GitHub Issues: https://github.com/magnet-hub/magnethub-sdk/issues
- Documentation: https://github.com/magnet-hub/magnethub-sdk

---

**License:** Apache 2.0  
**Copyright:** 2025 MagnetHub
