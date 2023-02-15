import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
import { SketchPicker } from "react-color";
import { sendToActiveContentScript } from "@plasmohq/messaging";

function IndexPopup() {
  const [bgColor, setBgColor] = useState({ r: null, g: null, b: null, a: null });
  const [txtColor, setTxtColor] = useState({ r: null, g: null, b: null, a: null });
  const [linColor, setLineColor] = useState({ r: null, g: null, b: null, a: null });
  const [accColor, setAccentColor] = useState({ r: null, g: null, b: null, a: null });

  useEffect(() => {
    console.log("HERE")

    chrome.storage.local.get("backgroundColor").then(({ backgroundColor }) => {
      console.log("IN?")
      setBgColor(backgroundColor)
    })
    chrome.storage.local.get("textColor").then(({ textColor }) => {
      setTxtColor(textColor)
    })
    chrome.storage.local.get("lineColor").then(({ lineColor }) => {
      setLineColor(lineColor)
    })
    chrome.storage.local.get("accentColor").then(({ accentColor }) => {
      setAccentColor(accentColor)
    })
  }, [])

  useEffect(() => {
    console.log(bgColor)
    sendToActiveContentScript({
      name: "colorChange",
      body: {
        type: "backgroundColor",
        color: bgColor
      }
    })
  }, [bgColor])

  useEffect(() => {
    console.log(linColor)
    sendToActiveContentScript({
      name: "colorChange",
      body: {
        type: "lineColor",
        color: linColor
      }
    })
  }, [linColor])

  useEffect(() => {
    console.log(accColor)
    sendToActiveContentScript({
      name: "colorChange",
      body: {
        type: "accentColor",
        color: accColor
      }
    })
  }, [accColor])


  useEffect(() => {
    console.log(txtColor)
    sendToActiveContentScript({
      name: "colorChange",
      body: {
        type: "textColor",
        color: txtColor
      }
    })
  }, [txtColor])


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>BG Color</h1>
      <SketchPicker
        onChange={(color) => {
          setBgColor(color.rgb);
        }}
        color={bgColor}
      />
      <h1>Text Color</h1>
      <SketchPicker
        onChange={(color) => {
          setTxtColor(color.rgb);
        }}
        color={txtColor}
      />
      <h1>Line Color</h1>
      <SketchPicker
        onChange={(color) => {
          setLineColor(color.rgb);
        }}
        color={linColor}
      />
      <h1>Accent Color</h1>
      <SketchPicker
        onChange={(color) => {
          setAccentColor(color.rgb);
        }}
        color={accColor}
      />

      <h2>
        Cloak
      </h2>
      by Jatin
    </div>
  )
}

export default IndexPopup
