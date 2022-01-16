import React from "react";
import { FormControlLabel, Radio } from "@mui/material";

interface WeightNodeRowProps {
  weight: number;
  color: string;
}

const WeightNodeRow = ({ weight, color }: WeightNodeRowProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControlLabel
        value={color}
        control={<Radio />}
        label={`Weight:`}
        sx={{ mr: "5px" }}
      />
      <span
        style={{
          width: "20px",
          height: "20px",
          border: `2px solid ${color}`,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {weight}
      </span>
    </div>
  );
};

export default WeightNodeRow;
