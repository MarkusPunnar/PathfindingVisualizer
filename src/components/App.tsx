import React from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import "../css/app.scss";

let visualizeGrid: () => void = () => {};
let resetGrid: () => void = () => {};

const App = () => {
  const setOnVisualize = (childVisualize: () => void) => {
    visualizeGrid = childVisualize;
  };
  const setOnClear = (childClear: () => void) => {
    resetGrid = childClear;
  };
  return (
    <div className="container">
      <Controls
        visualizeGrid={() => visualizeGrid()}
        resetGrid={() => resetGrid()}
      ></Controls>
      <Grid setOnVisualize={setOnVisualize} setOnClear={setOnClear}></Grid>
    </div>
  );
};

export default App;
