import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

export let colors = {
    backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
    textColor: { r: 0, g: 0, b: 0, a: 0 },
    accentColor: { r: 0, g: 0, b: 0, a: 0 },
    lineColor: { r: 0, g: 0, b: 0, a: 0 }
}


console.log("HELLO")

export function init() {
    var root = document.querySelector(':root');
    console.log("OG", root)
    updateLogo()
    // try {
    //     updateCreateButton()
    // }
    // catch (e) {

    // }
    updateGreys()
    updateBackground(root)
    updateText(root)
    updateLine(root)
    updateAccent(root)
}

export function updateColors() {
    var root = document.querySelector(':root');
    updateBackground(root)
    updateText(root)
    updateLine(root)
    updateAccent(root)
}

function updateBackground(root) {
    let { r, g, b } = colors.backgroundColor;
    const backgroundColor = `rgb(${r},${g},${b})`
    root.style.setProperty('--surface', backgroundColor);
    root.style.setProperty('--surface-raw', `${r}, ${g}, ${b}`);
    root.style.setProperty('--textfield-surface', backgroundColor);
    root.style.setProperty('--background', backgroundColor);
    root.style.setProperty('--mdc-theme-surface', backgroundColor);
    document.querySelector<HTMLElement>("#gb").style.backgroundColor = 'var(--surface)'
}

function updateText(root) {
    let { r, g, b, a } = colors.textColor;
    const textPrimaryColor = `rgb(${r},${g},${b})`
    const textFadedColor = `rgba(${r},${g},${b},${a})`

    root.style.setProperty('--on-surface-variant-agm', textFadedColor);
    root.style.setProperty('--on-surface-variant', textFadedColor);

    root.style.setProperty('--on-surface-raw', `${r}, ${g}, ${b}`);

    root.style.setProperty('--mdc-theme-on-surface', textPrimaryColor);
    root.style.setProperty('--textfield-primary', textPrimaryColor);
    root.style.setProperty('--on-surface', textPrimaryColor);
    root.style.setProperty('--mdc-theme-text-primary-on-background', textPrimaryColor);

    root.style.setProperty('--chip-hover', `rgba(${r},${g},${b},${0.1})`);
    try {
        document.querySelector<HTMLElement>("#ow77 > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input").style.color = "white";
        // document.querySelector<HTMLInputElement>("#ow77 > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input").placeholder.style.color = "white";
    }
    catch (e) {

    }
    try {
        console.log("here")
    } catch (e) {

    }
}

function updateLine(root) {
    let { r, g, b } = colors.lineColor;
    const lineColor = `rgb(${r},${g},${b})`
    root.style.setProperty('--line-color', lineColor);
    root.style.setProperty('--hairline', lineColor);
}

function updateAccent(root) {
    let { r, g, b, a } = colors.accentColor;
    const accentColor = `rgb(${r},${g},${b})`
    const varaitnColor = `rgb(${r},${g},${b})`
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
        logoElems[i].innerHTML = "<img src='https://i.ibb.co/VB2g1Qm/cloak-logo-2.png' style='height:32px;margin-left:8px'>";
    }
}

function updateCreateButton() {
    let plusIcon = document.querySelector<HTMLElement>("div.Gw6Zhc > svg")
    plusIcon.style.display = 'none'
    // console.log(plusIcon)

    let createButton = document.querySelector<HTMLElement>("div.dwlvNd")
    // console.log(createButton)
    let buttonWrapper = document.querySelector("div.LXjtcc")
    buttonWrapper.appendChild(createButton)
    createButton.style.width = "100%"
    document.querySelector<HTMLElement>("body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div").style.width = "90%"
    document.querySelector<HTMLElement>("body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div > div").style.width = "90%"
}


function updateGreys() {
    console.warn("NO greys")
    // let allElems = document.querySelectorAll("*")

    // allElems.forEach(elem => {
    //     // var selectColor = 'rgb(0,0,0)';
    //     // return (allElems.css('color') == selectColor);\
    //     let cssObj = getComputedStyle(elem)
    //     let cssData = []
    //     for (var i = 0; i < cssObj.length; i++) {
    //         if (cssObj[i] === 'color') {
    //             if (cssObj.getPropertyValue(cssObj[i]) === "rgb(95, 99, 104)" || cssObj.getPropertyValue(cssObj[i]) === "rgb(60, 64, 67)" || cssObj.getPropertyValue(cssObj[i]) === "rgb(128, 134, 139)" ||
    //                 cssObj.getPropertyValue(cssObj[i]) === "rgb(32, 33, 36)" || cssObj.getPropertyValue(cssObj[i]) === "#3c4043" || cssObj.getPropertyValue(cssObj[i]) === "#222") {
    //                 elem.style.color = "var(--on-surface)";
    //             }
    //         }
    //     }
    // })
}

