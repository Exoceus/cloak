
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

let is_head_added = false;

var document_observer = new MutationObserver(function (mutations) {

    if (document.head && is_head_added === false) {
        // dark_mode_main.append_css_element();
        // add css
        console.error("IN HERE")
        is_head_added = true;
    }
    if (document.body) {
        // chrome.storage.local.get({ 'document_brightness': 55 }, function (data) {
        //     dnm_set_brg(data.document_brightness);
        // });
        // dark_mode_main.remove_link_element();
        document.body.style.setProperty('background', 'var(--surface)', 'important');
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
            console.error(e)
            console.log("bruh", `'${rgba}'`)
        }
    }

    let textColor = window.getComputedStyle(node).color

    if (rgba2hex(textColor) != "#00000000") {
        console.log(rgba2hex(textColor))
    }

    if (textColor === "rgb(95, 99, 104)" || textColor === "rgb(60, 64, 67)" || textColor === "rgb(128, 134, 139)" ||
        textColor === "rgb(32, 33, 36)" || textColor === "#3c4043" || textColor === "#222" || rgba2hex(textColor) == "#222222") {
        node.style.setProperty('color', 'var(--on-surface)', 'important')
    }

    let bgColor = window.getComputedStyle(node).backgroundColor
    if (!bgColor) {
        return;
    }
    if (bgColor.startsWith('#')) {
        console.log("DAMN", bgColor)
    }
    let targets = ["XvhY1d", "z80M1 xl07Ob-ibnC6b FwR7Pc", "z80M1 QJXRJc"]
    // // console.log(`'${node.className}'`, currentBg)
    // if (currentBg === "rgb(0, 0, 0)") {
    //     node.style.setProperty('background', 'var(--surface)', 'important')
    // }

    if (targets.includes(node.className) || rgba2hex(bgColor) == "#ffffff" || rgba2hex(bgColor) == "#eeeeee" || rgba2hex(bgColor) == "#e8eaed") {
        console.warn(bgColor)
        node.style.setProperty('background', 'var(--surface)', 'important')
    }
}

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
