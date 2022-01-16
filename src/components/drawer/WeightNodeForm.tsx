import React, { useState } from "react";
import { FormControl, TextField, IconButton } from "@mui/material";
import { Color, ColorPicker, createColor } from "material-ui-color";
import { FiPlus } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { weightNodesAtom } from "../../state/atoms";

const DEFAULT_COLOR = createColor("#ff0000");

const WeightNodeForm = () => {
  const [weightNodes, setWeightNodes] = useRecoilState(weightNodesAtom);
  const [color, setColor] = useState<Color>(DEFAULT_COLOR);
  const [weight, setWeight] = useState<number>(0);
  const handleColorChange = (newValue: Color) => {
    setColor(newValue);
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWeight(Number(newValue));
  };
  const handleAddWeightNode = () => {
    setWeightNodes([...weightNodes, { weight, color: `#${color.hex}` }]);
    setColor(DEFAULT_COLOR);
    setWeight(0);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "1em 0",
      }}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          mx: 2,
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
        }}
      >
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
          label="Weight"
          size="small"
          value={weight}
          sx={{ width: "50%" }}
          onChange={handleWeightChange}
        />
        <ColorPicker value={color} onChange={handleColorChange} hideTextfield />
        <IconButton sx={{ p: 0 }} onClick={handleAddWeightNode}>
          <FiPlus />
        </IconButton>
      </FormControl>
    </div>
  );
};

export default WeightNodeForm;
