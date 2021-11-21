import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import { selectedAlgorithmAtom } from "../state/atoms";
import { Algorithm } from "../types";

interface ControlsProps {
  visualizeGrid: () => void;
  resetGrid: () => void;
}

const Controls = ({ visualizeGrid, resetGrid }: ControlsProps) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useRecoilState(
    selectedAlgorithmAtom
  );
  const handleAlgorithmChange = (event: SelectChangeEvent<string>) => {
    setSelectedAlgorithm(event.target.value);
  };
  return (
    <div>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="selectedAlgorithmLabel">Algorithm</InputLabel>
          <Select
            labelId="selectedAlgorithmLabel"
            value={selectedAlgorithm}
            label="Algorithm"
            onChange={handleAlgorithmChange}
            defaultValue={Algorithm.Dijkstra}
          >
            <MenuItem value={Algorithm.Dijkstra}>Dijkstra</MenuItem>
            <MenuItem value={Algorithm.AStar}>A*</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ m: 5 }} variant="contained" onClick={visualizeGrid}>
          Visualize!
        </Button>
        <Button sx={{ m: 5 }} variant="contained" onClick={resetGrid}>
          Reset grid
        </Button>
      </Box>
    </div>
  );
};

export default Controls;
