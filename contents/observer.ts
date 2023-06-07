
import type { PlasmoCSConfig } from "plasmo"
import { colors, initialize } from "~contents";

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

let is_head_added = false;

var document_observer = new MutationObserver(function (mutations) {

    if (document.head && is_head_added === false) {
        injectCss();
        is_head_added = true;
    }
    if (document.body) {
        initialize();
        document.body.style.setProperty('background', 'var(--surface)', 'important');
        document.body.style.setProperty('color', 'var(--on-surface)', 'important');
        document_observer.disconnect();
    }
});

var document_body_observer = new MutationObserver(function (elements) {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "childList") {
            for (var j = 0; j < elements[i].addedNodes.length; j++) {
                // iteration
                iterateNodes(elements[i].addedNodes[j])
            }
        }
    }
});

function iterateNodes(nodes) {
    if (nodes.nodeType == Node.ELEMENT_NODE) {
        if (isValidNode(nodes.tagName)) {
            processNode(nodes)
        }
    }
    var childNodes = nodes.childNodes;
    if (childNodes) {
        for (var i = 0; i < childNodes.length; i++) {
            iterateNodes(childNodes[i]);
        }
    }
}

function injectCss() {
    let link = document.createElement("link");
    let href = chrome.runtime.getURL('css/inject.css');
    link.setAttribute("type", "text/css");
    link.setAttribute("id", "cloak-inject");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", href);
    if (document.head) {
        console.log(href)
        document.head.appendChild(link)
    }
}

function isValidNode(name: string) {
    if (!name) {
        return false;
    }
    // Should we also exclude: iframes, svgs, imgs?
    if (name == 'SCRIPT' || name == 'STYLE' || name == 'LINK') {
        return false;
    }
    return true;
}

function processNode(node) {
    if ('cloak_processed' in node && node.cloak_processed === true) {
        return;
    }
    node.cloak_processed = true;

    const rgba2hex = (rgba) => {
        try {
            return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
        } catch (e) {
            // console.error(e)
            // console.log("bruh", `'${rgba}'`)
        }
    }

    let textColor = window.getComputedStyle(node).color

    if (textColor === "rgb(95, 99, 104)" || textColor === "rgb(60, 64, 67)" || textColor === "rgb(128, 134, 139)" ||
        textColor === "rgb(32, 33, 36)" || textColor === "#3c4043" || textColor === "#222" || rgba2hex(textColor) == "#222222" || rgba2hex(textColor) == "#3c4043") {
        node.style.setProperty('color', 'var(--on-surface)', 'important')
    }

    let bgColor = window.getComputedStyle(node).backgroundColor
    if (!bgColor) {
        return;
    }
    let targets = ["XvhY1d", "z80M1 xl07Ob-ibnC6b FwR7Pc", "z80M1 QJXRJc"]

    const exclusions = ["jPtXgd"] // for profile images that are just a div with background-image property

    if (targets.includes(node.className) || rgba2hex(bgColor) == "#ffffff" || rgba2hex(bgColor) == "#eeeeee" || rgba2hex(bgColor) == "#e8eaed" || rgba2hex(bgColor) == "#fcfdfe" || rgba2hex(bgColor) == "#f1f3f4") {
        // console.warn(bgColor)
        if (!exclusions.includes(node.className)) {
            node.style.setProperty('background', 'var(--surface)', 'important')
        }
    }

    if (node.tagName == "INPUT" && node.type == "text") {
        node.style.setProperty('background', 'var(--surface)', 'important');
        node.style.setProperty('color', 'var(--on-surface)', 'important');
    }
}

chrome.storage.local.get(null, (res) => {
    colors.backgroundColor = res.backgroundColor
    colors.textColor = res.textColor
    colors.accentColor = res.accentColor
    colors.lineColor = res.lineColor
})

document_body_observer.observe(document, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
});

document_observer.observe(document, {
    childList: true,
    characterData: true,
    subtree: true
});
