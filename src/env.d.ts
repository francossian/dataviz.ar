interface Window {
  /** Google Analytics, forwarded to the Partytown worker */
  gtag?: (...args: unknown[]) => void;
}
