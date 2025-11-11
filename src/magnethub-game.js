import { VERSION } from './version.js';

/**
 * MagnetHub Game SDK - Iframe/Game Side
 *
 * Enables communication between an embedded game and its parent page.
 * Uses predetermined methods only for type safety and clarity.
 *
 * @class MagnetHubGame
 * @version 0.1.0
 * @example
 * const game = new MagnetHubGame();
 * game.gameLoaded();
 * game.onPause(() => console.log('Game paused'));
 * game.showAd('interstitial').then(result => console.log(result));
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
    this._events = {};
    this._data = {};
    this._adCallbacks = {};
    window.addEventListener('message', (e) => this._handleMessage(e));
  }

  /**
   * Internal: Sends a message to the parent page.
   *
   * @private
   * @param {string} event - The event name
   * @param {*} data - The data to send with the event
   */
  _send(event, data = null) {
    if (window.parent) {
      window.parent.postMessage({ event, data, source: 'magnethub-game' }, '*');
    } else {
      console.warn(
        'MagnetHub: Cannot send message, no parent window available.',
      );
    }
  }

  /**
   * Internal: Registers a callback for a specific event from the parent page.
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

    // Only process messages from magnethub-core
    if (source === 'magnethub-core' && event && this._events[event]) {
      this._events[event](data);
    }
  }

  // ==================== Game Lifecycle Methods ====================

  /**
   * Notifies the parent that the game has loaded and is ready to start.
   *
   * @param {Object} [metadata] - Optional game metadata (version, title, etc.)
   */
  gameLoaded(metadata = {}) {
    this._send('gameLoaded', metadata);
  }

  /**
   * Notifies the parent that the game has started.
   *
   * @param {Object} [gameData] - Optional game start data
   */
  gameStart(gameData = {}) {
    this._send('gameStart', gameData);
  }

  /**
   * Notifies parent of game over.
   *
   * @param {Object} [results] - Final game results (score, stats, etc.)
   */
  gameOver(results = {}) {
    this._send('gameOver', results);
  }

  /**
   * Registers a callback for when the parent requests the game to pause.
   *
   * @param {Function} callback - Function to call when pause is requested
   */
  onPause(callback) {
    this._on('pauseGame', callback);
  }

  /**
   * Registers a callback for when the parent requests the game to resume.
   *
   * @param {Function} callback - Function to call when resume is requested
   */
  onResume(callback) {
    this._on('resumeGame', callback);
  }

  // ==================== Level Methods ====================

  /**
   * Notifies the parent that a level has started.
   *
   * @param {number|string} level - The level identifier
   * @param {Object} [levelData] - Optional level data
   */
  levelStart(level, levelData = {}) {
    this._send('levelStart', { level, ...levelData });
  }

  /**
   * Notifies the parent that a level has ended.
   *
   * @param {number|string} level - The level identifier
   * @param {Object} [results] - Optional level results (score, time, stars, etc.)
   */
  levelEnd(level, results = {}) {
    this._send('levelEnd', { level, ...results });
  }

  // ==================== Score Methods ====================

  /**
   * Sends score update to parent.
   *
   * @param {number} score - Current score
   * @param {Object} [metadata] - Additional score metadata
   */
  updateScore(score, metadata = {}) {
    this._send('scoreUpdate', { score, ...metadata });
  }

  // ==================== Ad Methods ====================

  /**
   * Requests the parent to display an advertisement.
   *
   * @param {string} [adType='interstitial'] - Type of ad (interstitial, rewarded, banner)
   * @param {Object} [options] - Additional ad options
   * @returns {Promise<Object>} Promise that resolves with ad result
   */
  showAd(adType = 'interstitial', options = {}) {
    return new Promise((resolve, reject) => {
      const requestId = `ad_${Date.now()}`;

      // Register one-time callback for this ad request
      const handleAdResult = (data) => {
        if (data.requestId === requestId) {
          delete this._adCallbacks[requestId];
          if (data.error) {
            reject(new Error(data.error));
          } else {
            resolve(data);
          }
        }
      };

      this._adCallbacks[requestId] = handleAdResult;
      this._on('adDisplayed', handleAdResult);
      this._send('showAd', { adType, requestId, ...options });
    });
  }

  /**
   * Shows an interstitial ad.
   *
   * @param {Object} [options] - Additional ad options
   * @returns {Promise<Object>} Promise that resolves with ad result
   */
  showInterstitial(options = {}) {
    return this.showAd('interstitial', options);
  }

  /**
   * Shows a rewarded ad.
   *
   * @param {Object} [options] - Additional ad options
   * @returns {Promise<Object>} Promise that resolves with ad result
   */
  showRewarded(options = {}) {
    return this.showAd('rewarded', options);
  }

  // ==================== Data/Save Methods ====================

  /**
   * Sets data/save data that can be synced with the parent.
   *
   * @param {string} key - The data key
   * @param {*} value - The data value
   */
  setData(key, value) {
    this._data[key] = value;
    this._send('setData', { key, value });
  }

  /**
   * Gets data/save data from local storage.
   *
   * @param {string} key - The data key
   * @returns {*} The data value
   */
  getData(key) {
    return this._data[key];
  }

  /**
   * Requests data from the parent (for cloud saves).
   *
   * @param {string} key - The data key
   * @returns {Promise<*>} Promise that resolves with the data value
   */
  loadData(key) {
    return new Promise((resolve) => {
      this._on(`data:${key}`, (value) => {
        this._data[key] = value;
        resolve(value);
      });
      this._send('getData', { key });
    });
  }
}

export default MagnetHubGame;

