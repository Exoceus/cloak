import type { PlasmoCSConfig } from "plasmo"
import { colors, updateColors } from "~contents"

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

// note: when peeps download, its gonna be diff
// const extension_id = "bnapdmcedmmgnkfkmdgpbmdfbgnajjea"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // if (sender.id === extension_id) {
    if (sender.id) {
        let { name, body } = message;

        if (name === "colorChange") {
            let { color, type } = body;
            let { r, g, b } = color;
            console.log("COLOR", color)

            if (r || g || b) {
                let newStorage = {}
                newStorage[type] = color


                chrome.storage.local.set(newStorage).then(() => {
                    colors[type] = color;
                    updateColors()
                })
            }

        }
    }
})