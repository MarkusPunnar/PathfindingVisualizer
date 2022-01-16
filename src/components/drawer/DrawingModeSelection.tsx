import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useRecoilState } from "recoil";
import { FormControl, FormLabel } from "@mui/material";
import { DrawingMode } from "../../types";
import { drawingModeAtom } from "../../state/atoms";

const DrawingModeSelection = () => {
  const [drawingMode, setDrawingMode] = useRecoilState(drawingModeAtom);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (value === "Wall") {
      setDrawingMode(DrawingMode.Wall);
    } else {
      setDrawingMode(DrawingMode.Weighted);
    }
  };
  return (
    <FormControl sx={{ ml: 2 }}>
      <FormLabel sx={{ color: "black", fontWeight: "bold", mt: 1 }}>
        Drawing mode
      </FormLabel>
      <RadioGroup value={drawingMode} onChange={handleChange}>
        {Object.keys(DrawingMode).map((mode) => {
          return (
            <FormControlLabel
              key={mode}
              value={mode}
              control={<Radio />}
              label={mode}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default DrawingModeSelection;
