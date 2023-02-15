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

let popupOpen = false;

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
    updateLogo()
    updateCreateButton()

    updateGreys()
    updateBackground(root)
    updateText(root)
    updateLine(root)
    updateAccent(root)
}

function updateBackground(root) {
    let { r, g, b } = colors.backgroundColor;
    const backgroundColor = `rgb(${r},${g},${b})`
    const backgroundColorVariant = `rgba(${r},${g},${b},${0.8})`
    root.style.setProperty('--surface', backgroundColor);
    root.style.setProperty('--textfield-surface', backgroundColor);
    root.style.setProperty('--background', backgroundColor);
    root.style.setProperty('--mdc-theme-surface', backgroundColor);
    document.querySelector("#gb").style.backgroundColor = 'var(--surface)'
}

function updateText(root) {
    let { r, g, b, a } = colors.textColor;
    const textPrimaryColor = `rgb(${r},${g},${b})`
    const textFadedColor = `rgba(${r},${g},${b},${a})`

    root.style.setProperty('--on-surface-variant-agm', textFadedColor);
    root.style.setProperty('--on-surface-variant', textFadedColor);

    root.style.setProperty('--mdc-theme-on-surface', textPrimaryColor);
    root.style.setProperty('--textfield-primary', textPrimaryColor);
    root.style.setProperty('--on-surface', textPrimaryColor);
    try {
        document.querySelector("#ow77 > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input").style.color = "white";
        document.querySelector("#ow77 > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input").placeholder.style.color = "white";
    }
    catch (e) {

    }
    try {
        console.log("here")
    } catch (e) {

    }
}

function updateLine(root) {
    let { r, g, b, a } = colors.lineColor;
    const lineColor = `rgba(${r},${g},${b},${a})`
    root.style.setProperty('--hairline', lineColor);
}

function updateAccent(root) {
    let { r, g, b, a } = colors.accentColor;
    const accentColor = `rgb(${r},${g},${b},${0.9})`
    const varaitnColor = `rgb(${r},${g},${b},${1})`
    root.style.setProperty('--primary', accentColor);
    root.style.setProperty('--fab', accentColor);
    root.style.setProperty('--now', accentColor);
    root.style.setProperty('--secondary', accentColor);
    root.style.setProperty('--gm-fillbutton-container-color', accentColor);

    // variant
    root.style.setProperty('--fab-hover', varaitnColor);
    root.style.setProperty('--primary-variant', varaitnColor);
    root.style.setProperty('--on-secondary', varaitnColor);
    root.style.setProperty('--on-secondary-variant', varaitnColor);
}

function updateLogo() {
    // console.log("ehllo")
    let logoElems = document.querySelectorAll('[aria-label="Calendar"]')
    for (let i = 0; i < 2; i++) {
        logoElems[i].innerHTML = "<img src='https://i.ibb.co/DM99RZN/cloak-logo.png' style='height:32px;'>";
    }
}

function updateCreateButton() {
    let plusIcon = document.querySelector("div.Gw6Zhc > svg")
    plusIcon.style.display = 'none'
    // console.log(plusIcon)

    let createButton = document.querySelector("div.dwlvNd")
    // console.log(createButton)
    let buttonWrapper = document.querySelector("div.LXjtcc")
    buttonWrapper.appendChild(createButton)
    createButton.style.width = "100%"
    document.querySelector("body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div").style.width = "90%"
    document.querySelector("body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div > div").style.width = "90%"
}


function updateGreys() {
    let { r, g, b, a } = colors.textColor;
    const textPrimaryColor = `rgb(${r},${g},${b})`

    console.log("ici")
    let allElems = document.querySelectorAll("*")

    allElems.forEach(elem => {
        // var selectColor = 'rgb(0,0,0)';
        // return (allElems.css('color') == selectColor);\
        let cssObj = getComputedStyle(elem)
        let cssData = []
        for (var i = 0; i < cssObj.length; i++) {
            if (cssObj[i] === 'color') {
                if (cssObj.getPropertyValue(cssObj[i]) === "rgb(95, 99, 104)" || cssObj.getPropertyValue(cssObj[i]) === "rgb(60, 64, 67)" || cssObj.getPropertyValue(cssObj[i]) === "rgb(128, 134, 139)" || cssObj.getPropertyValue(cssObj[i]) === "#3c4043" || cssObj.getPropertyValue(cssObj[i]) === "#222") {
                    elem.style.color = "var(--on-surface)";
                }
            }

            // cssData.push(cssObj[i] + ':' + cssObj.getPropertyValue(cssObj[i]));
        }
        // console.log(cssData)
    })
}

chrome.storage.local.get(null, (res) => {
    // console.log("PRIM", colors)
    colors.backgroundColor = res.backgroundColor
    colors.textColor = res.textColor
    colors.accentColor = res.accentColor
    colors.lineColor = res.lineColor

    setTimeout(updateGreys, 1000)
})

function hideEventNames() {
    console.log('into ehre')
    document.querySelectorAll('span.ayClmf').forEach(elem => {
        elem.style.color = 'transparent';
    })
}

function addListeners() {
    let logoElems = document.querySelectorAll('[aria-label="Settings menu"]')
    for (let i = 0; i < logoElems.length; i++) {
        logoElems[i].addEventListener("click", () => {
            console.warn("clicked")
            setTimeout(updateGreys, 2)
        })
    }
}

var timesRun = 0;
var interval = setInterval(function () {
    timesRun += 1;
    updateColors()
    if (timesRun === 30) {
        clearInterval(interval);
    }
    //do whatever here..
}, 100);



// setInterval(updateGreys, 1000)
setTimeout(addListeners, 2000)

console.warn("asd?")
window.addEventListener('popstate', function () {
    console.warn('location changed!');
});

setInterval(() => {
    console.log(document.URL)
    // hideEventNames()
}, 1000)