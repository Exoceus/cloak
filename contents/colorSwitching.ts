import type { PlasmoCSConfig } from "plasmo";

import { colors, updateCssVars } from "~contents";

export const config: PlasmoCSConfig = {
  matches: ["https://calendar.google.com/*"],
  run_at: "document_start",
  all_frames: true,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id) {
    let { name, body } = message;

    if (name === "colorChange") {
      let { color, type } = body;
      let { r, g, b } = color;

      if (r || g || b) {
        let newStorage = {};
        newStorage[type] = color;

        chrome.storage.local.set(newStorage).then(() => {
          colors[type] = color;
          updateCssVars();
        });
      }
    }

    if (name === "themeChange") {
      let { theme } = body;
      chrome.storage.local.set({ theme });
    }
  }
});
