import React from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import "../css/app.scss";
import { VoidFunction } from "../types";

let visualizeGrid: VoidFunction = () => {};
let resetGrid: VoidFunction = () => {};

const App = () => {
  const setOnVisualize = (childVisualize: VoidFunction) => {
    visualizeGrid = childVisualize;
  };
  const setOnClear = (childClear: VoidFunction) => {
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
