import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useRecoilState } from "recoil";
import { visualizationSpeedAtom } from "../../state/atoms";
import { VisualizationSpeed } from "../../types";
import { FormControl, FormLabel } from "@mui/material";

const SpeedSelection = () => {
  const [visualizationSpeed, setVisualizationSpeed] = useRecoilState(
    visualizationSpeedAtom
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisualizationSpeed(Number((event.target as HTMLInputElement).value));
  };
  return (
    <FormControl sx={{ ml: 2 }}>
      <FormLabel sx={{ color: "black", fontWeight: "bold", mt: 1 }}>
        Speed
      </FormLabel>
      <RadioGroup value={visualizationSpeed} onChange={handleChange}>
        {Object.keys(VisualizationSpeed)
          .filter((speed) => !isNaN(Number(speed)))
          .map((speed) => {
            return (
              <FormControlLabel
                key={speed}
                value={Number(speed)}
                control={<Radio />}
                label={VisualizationSpeed[Number(speed)]}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default SpeedSelection;
