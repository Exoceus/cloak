import { THEME_COLORS } from "~data/themes";
import { THEME } from "~enums";

console.log("UP");

// set defaults
chrome.runtime.onInstalled.addListener(async (details) => {
  chrome.storage.local.get(
    null,
    ({ backgroundColor, textColor, accentColor, lineColor, theme }) => {
      // default THEME is dark theme
      const { background, text, line, accent } = THEME_COLORS[THEME.DARK];

      if (!backgroundColor) {
        chrome.storage.local.set({ backgroundColor: background });
      }
      if (!textColor) {
        chrome.storage.local.set({ textColor: text });
      }
      if (!accentColor) {
        chrome.storage.local.set({ accentColor: accent });
      }
      if (!lineColor) {
        chrome.storage.local.set({ lineColor: line });
      }
      if (!theme) {
        chrome.storage.local.set({ theme: THEME.DARK });
      }
      if (
        !backgroundColor ||
        !textColor ||
        !accentColor ||
        !lineColor ||
        !theme
      ) {
        chrome.tabs.create({
          url: "https://calendar.google.com/",
          selected: true,
        });
      }
    }
  );
});
