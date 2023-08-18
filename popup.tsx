import { sendToContentScript } from "@plasmohq/messaging";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { ChevronDown, ChevronLeft } from "react-feather";
import "~css/popup.css";

import logo from "./assets/logo.png";

const themes = ["dark", "ocean_wave", "rose_gold", "custom"]

function IndexPopup() {
  const [isLoading, setLoading] = useState(true)
  const [bgColor, setBgColor] = useState({ r: null, g: null, b: null, a: null });
  const [txtColor, setTxtColor] = useState({ r: null, g: null, b: null, a: null });
  const [linColor, setLineColor] = useState({ r: null, g: null, b: null, a: null });
  const [accColor, setAccentColor] = useState({ r: null, g: null, b: null, a: null });
  const [expandedItems, setExpandedItems] = useState([])
  const [currentTheme, setTheme] = useState(null)

  const fetchStorage = () => {
    return new Promise<void>((resolve, reject) => {
      chrome.storage.local.get(null, ({ backgroundColor, textColor, accentColor, lineColor, theme }) => {
        setBgColor(backgroundColor)
        setTxtColor(textColor)
        setAccentColor(accentColor)
        setLineColor(lineColor)
        setTheme(theme)
        resolve()
      })
    });
  }

  useEffect(() => {
    fetchStorage().then(() => setLoading(false))
  }, [])

  useEffect(() => {
    sendToContentScript({
      name: "colorChange",
      body: {
        type: "backgroundColor",
        color: bgColor
      }
    })
  }, [bgColor])

  useEffect(() => {
    sendToContentScript({
      name: "colorChange",
      body: {
        type: "lineColor",
        color: linColor
      }
    })
  }, [linColor])

  useEffect(() => {
    sendToContentScript({
      name: "colorChange",
      body: {
        type: "accentColor",
        color: accColor
      }
    })
  }, [accColor])


  useEffect(() => {
    sendToContentScript({
      name: "colorChange",
      body: {
        type: "textColor",
        color: txtColor
      }
    })
  }, [txtColor])

  const isExpanded = (section: string) => {
    return expandedItems.includes(section)
  }

  const modifyExpand = (section: string) => {
    if (expandedItems.includes(section)) {
      setExpandedItems(expandedItems.filter(item => item != section))
    } else {
      setExpandedItems(expandedItems => [...expandedItems, section])
    }
  }

  const selectTheme = (theme: string) => {
    if (theme != currentTheme) {
      sendToContentScript({
        name: "themeChange",
        body: {
          theme
        }
      })
      if (theme == "dark") {
        setBgColor({
          "a": 1,
          "b": 17,
          "g": 9,
          "r": 11
        })
        setLineColor({
          "a": 1,
          "b": 53,
          "g": 48,
          "r": 48
        })
        setTxtColor({
          "a": 0.7,
          "b": 255,
          "g": 255,
          "r": 255
        })
        setAccentColor({
          "a": 1,
          "b": 239,
          "g": 153,
          "r": 85
        })
      }
      else if (theme == "rose_gold") {
        setBgColor({
          "a": 1,
          "b": 146,
          "g": 133,
          "r": 206
        })
        setLineColor({
          "a": 1,
          "b": 165,
          "g": 164,
          "r": 217
        })
        setTxtColor({
          "a": 0.7,
          "b": 230,
          "g": 237,
          "r": 242
        })
        setAccentColor({
          "a": 1,
          "b": 77,
          "g": 46,
          "r": 152
        })
      }
      else if (theme == "ocean_wave") {
        setBgColor({
          "a": 1,
          "b": 92,
          "g": 52,
          "r": 27
        })
        setLineColor({
          "a": 1,
          "b": 127,
          "g": 96,
          "r": 79
        })
        setTxtColor({
          "a": 0.7,
          "b": 218,
          "g": 233,
          "r": 238
        })
        setAccentColor({
          "a": 1,
          "b": 179,
          "g": 163,
          "r": 68
        })
      }
      setTheme(theme)
    }
  }

  if (isLoading) {
    return (
      <div>
        <img src={logo} />
      </div>
    )
  }

  return (
    <main>
      <img src={logo} className="header-logo" />
      <h1>Themes</h1>
      <div className="theme-wrapper">
        {
          themes.map(theme => <button onClick={() => selectTheme(theme)} className={(currentTheme == theme ? "selected-theme" : "") + " " + theme}>{theme.replace(/_/g, ' ')}</button>)
        }
      </div>
      <br />
      {(currentTheme == "custom" || currentTheme == "dark") && <h1>Customizations</h1>}
      {(currentTheme == "custom" || currentTheme == "dark") && <div className="picker-wrapper">
        <div onClick={() => modifyExpand("accent")} className="picker-toggle"><div>Accent</div>{isExpanded("accent") ? <ChevronDown /> : <ChevronLeft />}</div>
        {isExpanded("accent") ? <SketchPicker
          onChange={(color) => {
            setAccentColor(color.rgb);
          }}
          color={accColor}
        /> : null}
      </div>}
      {currentTheme == "custom" && <>
        <div className="picker-wrapper">
          <div onClick={() => modifyExpand("background")} className="picker-toggle"><div>Background</div>{isExpanded("background") ? <ChevronDown /> : <ChevronLeft />}</div>
          {isExpanded("background") ? <SketchPicker
            onChange={(color) => {
              setBgColor(color.rgb);
            }}
            color={bgColor}
          /> : null}
        </div>

        <div className="picker-wrapper">
          <div onClick={() => modifyExpand("text")} className="picker-toggle"><div>Text</div>{isExpanded("text") ? <ChevronDown /> : <ChevronLeft />}</div>
          {isExpanded("text") ? <SketchPicker
            onChange={(color) => {
              setTxtColor(color.rgb);
            }}
            color={txtColor}
          /> : null}
        </div>

        <div className="picker-wrapper">
          <div onClick={() => modifyExpand("line")} className="picker-toggle"><div>Line</div>{isExpanded("line") ? <ChevronDown /> : <ChevronLeft />}</div>
          {isExpanded("line") ? <SketchPicker
            onChange={(color) => {
              setLineColor(color.rgb);
            }}
            color={linColor}
          /> : null}
        </div></>}
      <footer>Report Issues/Contribute: <a href="https://github.com/Exoceus/cloak/" target="_blank">Cloak Github</a></footer>
      <footer>Made by: <a href="https://jatinrmehta.com/" target="_blank">Jatin</a></footer>
    </main>
  )
}

export default IndexPopup
