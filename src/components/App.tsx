import React from "react";
import Grid from "./Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../css/app.scss";

let visualizeGrid: () => void = () => { };
let resetGrid: () => void = () => { };

const App = () => {
  const setOnVisualize = (childVisualize: () => void) => {
    visualizeGrid = childVisualize;
  };
  const setOnClear = (childClear: () => void) => {
    resetGrid = childClear;
  };
  return (
    <div className="container">
      <Box>
        <Button
          sx={{ m: 5 }}
          variant="contained"
          onClick={() => visualizeGrid()}
        >
          Visualize!
        </Button>
        <Button sx={{ m: 5 }} variant="contained" onClick={() => resetGrid()}>
          Clear grid
        </Button>
      </Box>
      <Grid setOnVisualize={setOnVisualize} setOnClear={setOnClear}></Grid>
    </div>
  );
};

export default App;
