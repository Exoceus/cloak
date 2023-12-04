import { SketchPicker } from "react-color";
import { ChevronDown, ChevronLeft } from "react-feather";

function ColorPicker({ type, isExpanded, color, setColor, modifyExpand }) {
  return (
    <div className="picker-wrapper">
      <div onClick={() => modifyExpand(type)} className="picker-toggle">
        <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        {isExpanded ? <ChevronDown /> : <ChevronLeft />}
      </div>
      {isExpanded ? (
        <SketchPicker
          onChange={(color) => {
            setColor(type, color.rgb);
          }}
          color={color}
        />
      ) : null}
    </div>
  );
}

export default ColorPicker;
