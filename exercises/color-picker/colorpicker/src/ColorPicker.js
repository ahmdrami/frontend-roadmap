import React from "react";

const divStyle = {
  background: "rgba(255, 25, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  webkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  width: "150px",
  height: "48px",
  padding: "8px",
  position: "relative",
};

const buttonStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  webkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  width: "150px",
  height: "48px",
  fontFamily: "Arial",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "white",
  position: "absolute",
  left: "8px",
};

const inputStyle = {
  borderRadius: "16px",
  width: "150px",
  height: "48px",
  opacity: "0",
  position: "absolute",
  left: "8px",
};

const ColorPicker = () => {
  const [color, setColor] = React.useState("");

  const body = document.querySelector("body");

  const handleChange = ({ target }) => {
    setColor(target.value);
    body.style.backgroundColor = color;
  };
  return (
    <div style={divStyle}>
      <button
        style={buttonStyle}
        id="colorpicker"
        type="color"
        name="colorpicker"
      >
        Pick a Color
      </button>
      <input
        style={inputStyle}
        type="color"
        name=""
        value={color}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorPicker;
