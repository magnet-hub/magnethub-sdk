import { VERSION } from './version.js';

/**
 * MagnetHub Game SDK - Iframe/Game Side
 *
 * Enables two-way communication between an embedded game and its parent page.
 *
 * @class MagnetHubGame
 * @version 0.1.0
 * @example
 * const hub = new MagnetHubGame();
 * hub.send('gameLoaded');
 * hub.on('pauseGame', () => console.log('Game paused'));
 */
class MagnetHubGame {
  /**
   * SDK Version
   * @static
   * @type {string}
   */
  static VERSION = VERSION;
  /**
   * Creates an instance of MagnetHubGame.
   * Automatically sets up message listener for parent communication.
   */
  constructor() {
    this.events = {};
    window.addEventListener('message', (e) => this._handleMessage(e));
  }

  /**
   * Sends a message to the parent page.
   *
   * @param {string} event - The event name
   * @param {*} data - The data to send with the event
   */
  send(event, data = null) {
    if (window.parent) {
      window.parent.postMessage({ event, data, source: 'magnethub-game' }, '*');
    } else {
      console.warn(
        'MagnetHub: Cannot send message, no parent window available.',
      );
    }
  }

  /**
   * Registers a callback for a specific event from the parent page.
   *
   * @param {string} event - The event name to listen for
   * @param {Function} callback - The callback function to execute when the event is received
   */
  on(event, callback) {
    if (typeof callback !== 'function') {
      console.warn(
        `MagnetHub: Callback for event "${event}" must be a function.`,
      );
      return;
    }
    this.events[event] = callback;
  }

  /**
   * Internal handler for incoming messages.
   *
   * @private
   * @param {MessageEvent} e - The message event
   */
  _handleMessage(e) {
    const { event, data, source } = e.data || {};

    // Only process messages from magnethub-core
    if (source === 'magnethub-core' && event && this.events[event]) {
      this.events[event](data);
    }
  }
}

export default MagnetHubGame;
