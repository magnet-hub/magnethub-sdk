import { VERSION } from './version.js';

/**
 * MagnetHub Core SDK - Parent Page
 *
 * Enables communication between a parent page and an embedded game iframe.
 * Uses predetermined methods only for type safety and clarity.
 *
 * @class MagnetHubCore
 * @version 0.1.0
 * @example
 * const hub = new MagnetHubCore({ iframeId: 'gameFrame' });
 * hub.onGameLoaded(() => console.log('Game ready'));
 * hub.onScoreUpdate((data) => console.log('Score:', data.score));
 * hub.pauseGame();
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
    this._events = {};
    this._data = {};

    if (!this.iframe) {
      console.warn(`MagnetHub: Iframe with id "${iframeId}" not found.`);
    }

    window.addEventListener('message', (e) => this._handleMessage(e));
  }

  /**
   * Internal: Sends a message to the embedded game iframe.
   *
   * @private
   * @param {string} event - The event name
   * @param {*} data - The data to send with the event
   */
  _send(event, data = null) {
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
   * Internal: Registers a callback for a specific event from the game iframe.
   *
   * @private
   * @param {string} event - The event name to listen for
   * @param {Function} callback - The callback function to execute when the event is received
   */
  _on(event, callback) {
    if (typeof callback !== 'function') {
      console.warn(
        `MagnetHub: Callback for event "${event}" must be a function.`,
      );
      return;
    }
    this._events[event] = callback;
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
    if (source === 'magnethub-game' && event && this._events[event]) {
      this._events[event](data);
    }
  }

  // ==================== Game Control Methods ====================

  /**
   * Sends a pause command to the game.
   *
   * @param {Object} [pauseData] - Optional pause data
   */
  pauseGame(pauseData = {}) {
    this._send('pauseGame', pauseData);
  }

  /**
   * Sends a resume command to the game.
   *
   * @param {Object} [resumeData] - Optional resume data
   */
  resumeGame(resumeData = {}) {
    this._send('resumeGame', resumeData);
  }

  // ==================== Event Listeners ====================

  /**
   * Registers a callback for when the game has loaded.
   *
   * @param {Function} callback - Function to call when game loads
   */
  onGameLoaded(callback) {
    this._on('gameLoaded', callback);
  }

  /**
   * Registers a callback for when the game starts.
   *
   * @param {Function} callback - Function to call when game starts
   */
  onGameStart(callback) {
    this._on('gameStart', callback);
  }

  /**
   * Registers a callback for when the game is over.
   *
   * @param {Function} callback - Function to call when game ends
   */
  onGameOver(callback) {
    this._on('gameOver', callback);
  }

  /**
   * Registers a callback for level start events.
   *
   * @param {Function} callback - Function to call with level data
   */
  onLevelStart(callback) {
    this._on('levelStart', callback);
  }

  /**
   * Registers a callback for level end events.
   *
   * @param {Function} callback - Function to call with level results
   */
  onLevelEnd(callback) {
    this._on('levelEnd', callback);
  }

  /**
   * Registers a callback for score updates.
   *
   * @param {Function} callback - Function to call with score data
   */
  onScoreUpdate(callback) {
    this._on('scoreUpdate', callback);
  }

  // ==================== Ad Methods ====================

  /**
   * Registers a callback for when the game requests to show an ad.
   *
   * @param {Function} callback - Function to call with ad request data
   */
  onShowAd(callback) {
    this._on('showAd', callback);
  }

  /**
   * Notifies the game that an ad has been displayed.
   *
   * @param {string} requestId - The ad request ID
   * @param {string} adType - Type of ad that was displayed
   * @param {Object} [result] - Ad display result (completed, skipped, error, etc.)
   */
  adDisplayed(requestId, adType, result = {}) {
    this._send('adDisplayed', { requestId, adType, ...result });
  }

  // ==================== Data/Save Methods ====================

  /**
   * Registers a callback for when the game sets data.
   *
   * @param {Function} callback - Function to call with data
   */
  onSetData(callback) {
    this._on('setData', callback);
  }

  /**
   * Registers a callback for when the game requests data.
   *
   * @param {Function} callback - Function to call with data request
   */
  onGetData(callback) {
    this._on('getData', callback);
  }

  /**
   * Sets data/save data.
   *
   * @param {string} key - The data key
   * @param {*} value - The data value
   */
  setData(key, value) {
    this._data[key] = value;
    this._send('setData', { key, value });
  }

  /**
   * Gets data/save data.
   *
   * @param {string} key - The data key
   * @returns {*} The data value
   */
  getData(key) {
    return this._data[key];
  }

  /**
   * Sends data value to the game in response to a request.
   *
   * @param {string} key - The data key
   * @param {*} value - The data value
   */
  sendData(key, value) {
    this._send(`data:${key}`, value);
  }
}

export default MagnetHubCore;


