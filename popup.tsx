import { sendToContentScript } from "@plasmohq/messaging";
import { useEffect, useState } from "react";
import "~css/popup.css";

import ColorPicker from "~components/ColorPicker";
import { EMPTY_THEME_COLOR, THEME_COLORS } from "~data/themes";
import { COLOR_TOPIC, THEMES } from "~enums";
import type { COLOR } from "~types";
import logo from "./assets/logo.png";

const themes = ["dark", "ocean_wave", "rose_gold", "custom"];

function IndexPopup() {
  const [isLoading, setLoading] = useState(true);

  const [bgColor, setBgColor] = useState(EMPTY_THEME_COLOR);
  const [txtColor, setTxtColor] = useState(EMPTY_THEME_COLOR);
  const [linColor, setLineColor] = useState(EMPTY_THEME_COLOR);
  const [accColor, setAccentColor] = useState(EMPTY_THEME_COLOR);

  const [expandedItems, setExpandedItems] = useState([]);
  const [currentTheme, setTheme] = useState(null);

  const fetchStorage = () => {
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.get(
        null,
        ({ backgroundColor, textColor, accentColor, lineColor, theme }) => {
          setColor(COLOR_TOPIC.BACKGROUND, backgroundColor);
          setColor(COLOR_TOPIC.TEXT, textColor);
          setColor(COLOR_TOPIC.ACCENT, accentColor);
          setColor(COLOR_TOPIC.LINE, lineColor);
          setTheme(theme);

          resolve();
        }
      );
    });
  };

  useEffect(() => {
    fetchStorage().then(() => setLoading(false));
  }, []);

  const setColor = (colorTopic: COLOR_TOPIC, color: COLOR) => {
    let requestType = "";
    if (colorTopic === COLOR_TOPIC.BACKGROUND) {
      requestType = "backgroundColor";
      setBgColor(color);
    } else if (colorTopic === COLOR_TOPIC.ACCENT) {
      requestType = "accentColor";
      setAccentColor(color);
    } else if (colorTopic === COLOR_TOPIC.LINE) {
      requestType = "lineColor";
      setLineColor(color);
    } else if (colorTopic === COLOR_TOPIC.TEXT) {
      requestType = "textColor";
      setTxtColor(color);
    } else {
      throw `Unsupported color topic: ${colorTopic}`;
    }

    sendToContentScript({
      name: "colorChange",
      body: {
        type: requestType,
        color,
      },
    });
  };

  const checkExpanded = (section: string) => {
    return expandedItems.includes(section);
  };

  const modifyExpand = (section: string) => {
    if (expandedItems.includes(section)) {
      setExpandedItems(expandedItems.filter((item) => item != section));
    } else {
      setExpandedItems((expandedItems) => [...expandedItems, section]);
    }
  };

  const selectTheme = (theme: string) => {
    if (theme != currentTheme) {
      sendToContentScript({
        name: "themeChange",
        body: {
          theme,
        },
      });
      if (theme == THEMES.DARK) {
        const { background, line, text, accent } = THEME_COLORS[THEMES.DARK];
        setColor(COLOR_TOPIC.BACKGROUND, background);
        setColor(COLOR_TOPIC.TEXT, text);
        setColor(COLOR_TOPIC.ACCENT, accent);
        setColor(COLOR_TOPIC.LINE, line);
      } else if (theme == THEMES.ROSE_GOLD) {
        const { background, line, text, accent } =
          THEME_COLORS[THEMES.ROSE_GOLD];
        setColor(COLOR_TOPIC.BACKGROUND, background);
        setColor(COLOR_TOPIC.TEXT, text);
        setColor(COLOR_TOPIC.ACCENT, accent);
        setColor(COLOR_TOPIC.LINE, line);
      } else if (theme == THEMES.OCEAN_WAVE) {
        const { background, line, text, accent } =
          THEME_COLORS[THEMES.OCEAN_WAVE];
        setColor(COLOR_TOPIC.BACKGROUND, background);
        setColor(COLOR_TOPIC.TEXT, text);
        setColor(COLOR_TOPIC.ACCENT, accent);
        setColor(COLOR_TOPIC.LINE, line);
      }
      setTheme(theme);
    }
  };

  if (isLoading) {
    return (
      <div>
        <img src={logo} />
      </div>
    );
  }

  return (
    <main>
      <img src={logo} className="header-logo" />
      <h1>Themes</h1>
      <div className="theme-wrapper">
        {themes.map((theme, index) => (
          <button
            key={index}
            onClick={() => selectTheme(theme)}
            className={
              (currentTheme == theme ? "selected-theme" : "") + " " + theme
            }
          >
            {theme.replace(/_/g, " ")}
          </button>
        ))}
      </div>
      <br />
      {(currentTheme == "custom" || currentTheme == "dark") && (
        <h1>Customizations</h1>
      )}
      {(currentTheme == "custom" || currentTheme == "dark") && (
        <ColorPicker
          type={COLOR_TOPIC.ACCENT}
          isExpanded={checkExpanded(COLOR_TOPIC.ACCENT)}
          color={accColor}
          setColor={setColor}
          modifyExpand={modifyExpand}
        />
      )}
      {currentTheme == "custom" && (
        <>
          <ColorPicker
            type={COLOR_TOPIC.BACKGROUND}
            isExpanded={checkExpanded(COLOR_TOPIC.BACKGROUND)}
            color={bgColor}
            setColor={setColor}
            modifyExpand={modifyExpand}
          />

          <ColorPicker
            type={COLOR_TOPIC.TEXT}
            isExpanded={checkExpanded(COLOR_TOPIC.TEXT)}
            color={txtColor}
            setColor={setColor}
            modifyExpand={modifyExpand}
          />

          <ColorPicker
            type={COLOR_TOPIC.LINE}
            isExpanded={checkExpanded(COLOR_TOPIC.LINE)}
            color={linColor}
            setColor={setColor}
            modifyExpand={modifyExpand}
          />
        </>
      )}
      <footer>
        Report Issues/Contribute:{" "}
        <a href="https://github.com/Exoceus/cloak/" target="_blank">
          Cloak Github
        </a>
      </footer>
      <footer>
        Made by:{" "}
        <a href="https://jatinrmehta.com/" target="_blank">
          Jatin
        </a>
      </footer>
    </main>
  );
}

export default IndexPopup;
