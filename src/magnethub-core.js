import { VERSION } from './version.js';

/**
 * MagnetHub Core SDK - Parent Page
 *
 * Enables two-way communication between a parent page and an embedded game iframe.
 *
 * @class MagnetHubCore
 * @version 0.1.0
 * @example
 * const hub = new MagnetHubCore({ iframeId: 'gameFrame', apiKey: 'XYZ' });
 * hub.on('score', data => console.log('Score:', data));
 * hub.send('pauseGame', { reason: 'User clicked pause' });
 */
class MagnetHubCore {
  /**
   * SDK Version
   * @static
   * @type {string}
   */
  static VERSION = VERSION;

  /**
   * Creates an instance of MagnetHubCore.
   *
   * @param {Object} options - Configuration options
   * @param {string} options.iframeId - The ID of the iframe element containing the game
   * @param {string} options.apiKey - API key for authentication (optional)
   */
  constructor({ iframeId, apiKey }) {
    this.iframe = document.getElementById(iframeId);
    this.apiKey = apiKey;
    this.events = {};

    if (!this.iframe) {
      console.warn(`MagnetHub: Iframe with id "${iframeId}" not found.`);
    }

    window.addEventListener('message', (e) => this._handleMessage(e));
  }

  /**
   * Sends a message to the embedded game iframe.
   *
   * @param {string} event - The event name
   * @param {*} data - The data to send with the event
   */
  send(event, data = null) {
    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(
        { event, data, source: 'magnethub-core' },
        '*',
      );
    } else {
      console.warn('MagnetHub: Cannot send message, iframe not available.');
    }
  }

  /**
   * Registers a callback for a specific event from the game iframe.
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

    // Only process messages from magnethub-game
    if (source === 'magnethub-game' && event && this.events[event]) {
      this.events[event](data);
    }
  }
}

export default MagnetHubCore;


