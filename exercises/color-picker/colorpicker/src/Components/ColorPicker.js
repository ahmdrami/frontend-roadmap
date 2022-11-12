import React from "react";
import styles from "./ColorPicker.module.css";

const ColorPicker = () => {
  const [color, setColor] = React.useState("");
  const handleChange = ({ target }) => {
    setColor(target.value);
  };
  return (
    <div style={{ background: `${color}` }} className={styles.container}>
      <div className={styles.btnWrapper}>
        <button
          className={styles.btn}
          id="colorpicker"
          type="color"
          name="colorpicker"
        >
          Pick a Color
        </button>
        <input
          className={styles.btnInput}
          type="color"
          name=""
          value={color}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
