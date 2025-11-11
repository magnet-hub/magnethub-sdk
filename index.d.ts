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
 * Ad type options
 */
export type AdType = "interstitial" | "rewarded" | "banner";

/**
 * Ad display result
 */
export interface AdResult {
  /** Request ID for this ad */
  requestId: string;
  /** Type of ad displayed */
  adType: AdType;
  /** Whether the ad was completed */
  completed?: boolean;
  /** Whether the ad was skipped */
  skipped?: boolean;
  /** Error message if ad failed */
  error?: string;
  /** Whether user should receive reward (for rewarded ads) */
  rewarded?: boolean;
}

/**
 * MagnetHub Core SDK - Parent Page
 *
 * Enables communication between a parent page and an embedded game iframe.
 * Uses predetermined methods only for type safety and clarity.
 */
export class MagnetHubCore {
  /**
   * SDK Version
   */
  static VERSION: string;

  /**
   * The iframe element
   */
  iframe: HTMLIFrameElement | null;

  /**
   * API key for authentication
   */
  apiKey?: string;

  /**
   * Creates an instance of MagnetHubCore
   * @param options - Configuration options
   */
  constructor(options: MagnetHubCoreOptions);

  // Game Control Methods
  pauseGame(pauseData?: any): void;
  resumeGame(resumeData?: any): void;

  // Event Listeners
  onGameLoaded(callback: EventCallback): void;
  onGameStart(callback: EventCallback): void;
  onGameOver(callback: EventCallback): void;
  onLevelStart(callback: EventCallback): void;
  onLevelEnd(callback: EventCallback): void;
  onScoreUpdate(callback: EventCallback): void;

  // Ad Methods
  onShowAd(callback: EventCallback): void;
  adDisplayed(
    requestId: string,
    adType: AdType,
    result?: Partial<AdResult>
  ): void;

  // Data/Save Methods
  onSetData(callback: EventCallback): void;
  onGetData(callback: EventCallback): void;
  setData(key: string, value: any): void;
  getData(key: string): any;
  sendData(key: string, value: any): void;
}

/**
 * MagnetHub Game SDK - Iframe/Game Side
 *
 * Enables communication between an embedded game and its parent page.
 * Uses predetermined methods only for type safety and clarity.
 */
export class MagnetHubGame {
  /**
   * SDK Version
   */
  static VERSION: string;

  /**
   * Creates an instance of MagnetHubGame
   * Automatically sets up message listener for parent communication
   */
  constructor();

  // Game Lifecycle Methods
  gameLoaded(metadata?: any): void;
  gameStart(gameData?: any): void;
  gameOver(results?: any): void;
  onPause(callback: EventCallback): void;
  onResume(callback: EventCallback): void;

  // Level Methods
  levelStart(level: number | string, levelData?: any): void;
  levelEnd(level: number | string, results?: any): void;

  // Score Methods
  updateScore(score: number, metadata?: any): void;

  // Ad Methods
  showAd(adType?: AdType, options?: any): Promise<AdResult>;
  showInterstitial(options?: any): Promise<AdResult>;
  showRewarded(options?: any): Promise<AdResult>;

  // Data/Save Methods
  setData(key: string, value: any): void;
  getData(key: string): any;
  loadData(key: string): Promise<any>;
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
  source: "magnethub-core" | "magnethub-game";
}

export default MagnetHubCore;
