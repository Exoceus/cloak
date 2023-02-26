console.log("UP")

// set defaults
chrome.runtime.onInstalled.addListener(async (details) => {
    chrome.storage.local.get(null, ({ backgroundColor, textColor, accentColor, lineColor }) => {
        if (!backgroundColor) {
            chrome.storage.local.set({ backgroundColor: { r: 11, g: 9, b: 17, a: 1 } })
        }
        if (!textColor) {
            chrome.storage.local.set({ textColor: { r: 255, g: 255, b: 255, a: 0.7 } })
        }
        if (!accentColor) {
            chrome.storage.local.set({ accentColor: { r: 66, g: 133, b: 244, a: 1 } })
        }
        if (!lineColor) {
            chrome.storage.local.set({ lineColor: { r: 48, g: 48, b: 53, a: 1 } })
        }
    })
});
