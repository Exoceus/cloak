import type { PlasmoCSConfig } from "plasmo"

const extension_id = "bnapdmcedmmgnkfkmdgpbmdfbgnajjea"

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

const colors = {
    backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
    textColor: { r: 0, g: 0, b: 0, a: 0 },
    accentColor: { r: 0, g: 0, b: 0, a: 0 },
    lineColor: { r: 0, g: 0, b: 0, a: 0 }
}

console.log("HELLO")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (sender.id === extension_id) {
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
                })

                updateColors()
            }

        }
    }
})

// console.log(r)
// console.log(`The value of --blue is: '${getComputedStyle(r).getPropertyValue('--surface')}'`)
// r.style.setProperty('--on-surface-variant-agm', 'rgba(100,100,100, 1)');


function updateColors() {
    var root = document.querySelector(':root');
    updateBackground(root)
    updateText(root)
    updateLine(root)
    updateAccent(root)
    removeChrome()
}

function updateBackground(root) {
    let { r, g, b } = colors.backgroundColor;
    const backgroundColor = `rgb(${r},${g},${b})`
    root.style.setProperty('--surface', backgroundColor);
    document.querySelector("#gb").style.backgroundColor = backgroundColor
}

function updateText(root) {
    let { r, g, b, a } = colors.textColor;
    const textPrimaryColor = `rgb(${r},${g},${b})`
    const textFadedColor = `rgba(${r},${g},${b},${a})`
    root.style.setProperty('--on-surface-variant-agm', textFadedColor);
    root.style.setProperty('--on-surface', textPrimaryColor);
}

function updateLine(root) {
    let { r, g, b, a } = colors.lineColor;
    const lineColor = `rgba(${r},${g},${b},${a})`
    root.style.setProperty('--hairline', lineColor);
}

function updateAccent(root) {
    let { r, g, b, a } = colors.accentColor;
    const accentColor = `rgb(${r},${g},${b})`
    root.style.setProperty('--primary', accentColor);
}

function removeChrome() {
    let logoElems = document.querySelectorAll('[aria-label="Calendar"]')
    for (let i = 0; i < logoElems.length; i++) {
        logoElems[i].style.display = "none";
    }
    console.log(logoElems)
}


chrome.storage.local.get(null, (res) => {
    console.log("PRIM", colors)
    colors.backgroundColor = res.backgroundColor
    colors.textColor = res.textColor
    colors.accentColor = res.accentColor
    colors.lineColor = res.lineColor

    setTimeout(updateColors, 50)
})