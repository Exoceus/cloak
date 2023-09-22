import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://calendar.google.com/*"],
  run_at: "document_start",
  all_frames: true,
};

export let colors = {
  backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
  textColor: { r: 0, g: 0, b: 0, a: 0 },
  accentColor: { r: 0, g: 0, b: 0, a: 0 },
  lineColor: { r: 0, g: 0, b: 0, a: 0 },
};

export function initialize() {
  var root = document.querySelector(":root");
  updateLogo();

  updateBackground(root);
  updateText(root);
  updateLine(root);
  updateAccent(root);
}

export function updateCssVars() {
  var root = document.querySelector(":root");
  updateBackground(root);
  updateText(root);
  updateLine(root);
  updateAccent(root);
}

function updateBackground(root) {
  let { r, g, b } = colors.backgroundColor;
  const backgroundColor = `rgb(${r},${g},${b})`;

  root.style.setProperty("--surface", backgroundColor);
  root.style.setProperty("--surface-raw", `${r}, ${g}, ${b}`);
  root.style.setProperty("--textfield-surface", backgroundColor);
  root.style.setProperty("--background", backgroundColor);
  root.style.setProperty("--mdc-theme-surface", backgroundColor);
}

function updateText(root) {
  let { r, g, b, a } = colors.textColor;
  const textPrimaryColor = `rgb(${r},${g},${b})`;
  const textFadedColor = `rgba(${r},${g},${b},${a})`;

  root.style.setProperty("--on-surface-raw", `${r}, ${g}, ${b}`);

  root.style.setProperty("--mdc-theme-on-surface", textPrimaryColor);
  root.style.setProperty("--textfield-primary", textPrimaryColor);
  root.style.setProperty("--on-surface", textPrimaryColor);
  root.style.setProperty(
    "--mdc-theme-text-primary-on-background",
    textPrimaryColor,
  );
  root.style.setProperty(
    "--mdc-checkbox-unselected-hover-icon-color",
    textPrimaryColor,
  );

  root.style.setProperty("--on-surface-variant-agm", textFadedColor);
  root.style.setProperty("--on-surface-variant", textFadedColor);
  root.style.setProperty(
    "--mdc-checkbox-unselected-icon-color",
    textFadedColor,
  );

  root.style.setProperty("--chip-hover", `rgba(${r},${g},${b},${0.1})`);
}

function updateLine(root) {
  let { r, g, b } = colors.lineColor;
  const lineColor = `rgb(${r},${g},${b})`;
  root.style.setProperty("--line-color", lineColor);
  root.style.setProperty("--hairline", lineColor);
}

function updateAccent(root) {
  let { r, g, b } = colors.accentColor;
  const accentColor = `rgb(${r},${g},${b})`;

  root.style.setProperty("--primary", accentColor);
  root.style.setProperty("--fab", accentColor);
  root.style.setProperty("--now", accentColor);
  root.style.setProperty("--secondary", accentColor);
  root.style.setProperty("--gm-fillbutton-container-color", accentColor);
  root.style.setProperty("--gm-hairlinebutton-ink-color", accentColor);

  root.style.setProperty("--secondary-variant", `rgba(${r},${g},${b},${0.1})`);

  root.style.setProperty("--fab-hover", accentColor);
  root.style.setProperty("--primary-variant", accentColor);
  root.style.setProperty("--on-secondary", accentColor);
  root.style.setProperty("--on-secondary-variant", accentColor);
}

function updateLogo() {
  let logoElems = document.querySelectorAll('[aria-label="Calendar"]');
  for (let i = 0; i < logoElems.length; i++) {
    logoElems[i].innerHTML =
      "<img src='https://i.ibb.co/VB2g1Qm/cloak-logo-2.png' style='height:32px;margin-left:8px'>";
  }
}

// Test this out more
function updateCreateButton() {
  let plusIcon = document.querySelector<HTMLElement>("div.Gw6Zhc > svg");
  plusIcon.style.display = "none";

  let createButton = document.querySelector<HTMLElement>("div.dwlvNd");
  let buttonWrapper = document.querySelector("div.LXjtcc");
  buttonWrapper.appendChild(createButton);
  createButton.style.width = "100%";
  document.querySelector<HTMLElement>(
    "body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div",
  ).style.width = "90%";
  document.querySelector<HTMLElement>(
    "body > div.tEhMVd > div.pSp5K > div.KKOvEb > div > div.QQYuzf > div > div.LXjtcc > div > div > div",
  ).style.width = "90%";
}
