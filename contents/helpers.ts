import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

export function hideEventNames() {
    console.log('into ehre')
    document.querySelectorAll('span.ayClmf').forEach(elem => {
        elem.style.color = 'transparent';
    })
    document.querySelectorAll('div.lFe10c > div > div.Jmftzc.gVNoLb.EiZ8Dd').forEach(elem => {
        console.warn("here")
        elem.style.color = 'transparent';

    })
}

// setTimeout(() => hideEventNames(), 2000)

// export function addListeners() {
//     let logoElems = document.querySelectorAll('[aria-label="Settings menu"]')
//     for (let i = 0; i < logoElems.length; i++) {
//         logoElems[i].addEventListener("click", () => {
//             console.warn("clicked")
//             setTimeout(updateGreys, 2)
//         })
//     }
// }
