import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
    matches: ["https://calendar.google.com/*"],
    run_at: "document_start",
    all_frames: true
}

export function hideEventNames(genericName) {
    console.log('into ehre')
    document.querySelectorAll('span.ayClmf').forEach(elem => {
        if (genericName) {
            elem.innerHTML = "Some Event"
        } else {
            elem.style.color = 'transparent';
        }
    })
    document.querySelectorAll('div.lFe10c > div > div.Jmftzc.gVNoLb.EiZ8Dd').forEach(elem => {
        console.warn("here")
        if (!genericName) {
            elem.style.color = 'transparent';
        }
    })

    document.querySelectorAll("li > div > div.toUqff.qZvm2d-ibnC6b-bN97Pc.HRaT6d").forEach(elem => {
        if (genericName) {
            elem.innerHTML = '<span jsslot="" style="color: var(--on-surface);">Some Calendar</span>'
        } else {
            elem.style.color = 'transparent';
        }
    })
}

// setTimeout(() => hideEventNames(true), 2000)

// export function addListeners() {
//     let logoElems = document.querySelectorAll('[aria-label="Settings menu"]')
//     for (let i = 0; i < logoElems.length; i++) {
//         logoElems[i].addEventListener("click", () => {
//             console.warn("clicked")
//             setTimeout(updateGreys, 2)
//         })
//     }
// }
