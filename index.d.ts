/**
 * Type definitions for MagnetHub SDK
 * @version 0.1.0
 */

/**
 * Configuration options for MagnetHubCore
 */
export interface MagnetHubCoreOptions {
  /** The ID of the iframe element containing the game */
  iframeId: string;
  /** Optional API key for authentication */
  apiKey?: string;
}

/**
 * Event callback function type
 */
export type EventCallback = (data?: any) => void;

/**
 * MagnetHub Core SDK - Parent Page
 * 
 * Enables two-way communication between a parent page and an embedded game iframe.
 */
export class MagnetHubCore {
  /**
   * The iframe element
   */
  iframe: HTMLIFrameElement | null;
  
  /**
   * API key for authentication
   */
  apiKey?: string;
  
  /**
   * Registered event callbacks
   */
  events: Record<string, EventCallback>;

  /**
   * Creates an instance of MagnetHubCore
   * @param options - Configuration options
   */
  constructor(options: MagnetHubCoreOptions);

  /**
   * Sends a message to the embedded game iframe
   * @param event - The event name
   * @param data - Optional data to send with the event
   */
  send(event: string, data?: any): void;

  /**
   * Registers a callback for a specific event from the game iframe
   * @param event - The event name to listen for
   * @param callback - The callback function to execute when the event is received
   */
  on(event: string, callback: EventCallback): void;

  /**
   * Internal handler for incoming messages
   * @private
   */
  private _handleMessage(e: MessageEvent): void;
}

/**
 * MagnetHub Game SDK - Iframe/Game Side
 * 
 * Enables two-way communication between an embedded game and its parent page.
 */
export class MagnetHubGame {
  /**
   * Registered event callbacks
   */
  events: Record<string, EventCallback>;

  /**
   * Creates an instance of MagnetHubGame
   * Automatically sets up message listener for parent communication
   */
  constructor();

  /**
   * Sends a message to the parent page
   * @param event - The event name
   * @param data - Optional data to send with the event
   */
  send(event: string, data?: any): void;

  /**
   * Registers a callback for a specific event from the parent page
   * @param event - The event name to listen for
   * @param callback - The callback function to execute when the event is received
   */
  on(event: string, callback: EventCallback): void;

  /**
   * Internal handler for incoming messages
   * @private
   */
  private _handleMessage(e: MessageEvent): void;
}

/**
 * Message structure sent through postMessage
 */
export interface MagnetHubMessage {
  /** The event identifier */
  event: string;
  /** Optional data payload */
  data?: any;
  /** Source identifier */
  source: 'magnethub-core' | 'magnethub-game';
}

export default MagnetHubCore;
