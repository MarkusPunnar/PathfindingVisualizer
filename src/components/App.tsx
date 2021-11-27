import React from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import "../css/app.scss";
import { VoidFunction } from "../types";

let visualizeGrid: VoidFunction = () => {};
let resetGrid: VoidFunction = () => {};
let clearPath: VoidFunction = () => {};

const App = () => {
  const setOnVisualize = (childVisualize: VoidFunction) => {
    visualizeGrid = childVisualize;
  };
  const setOnReset = (childReset: VoidFunction) => {
    resetGrid = childReset;
  };
  const setOnClearPath = (childClearPath: VoidFunction) => {
    clearPath = childClearPath;
  };
  return (
    <div className="container">
      <Controls
        visualizeGrid={() => visualizeGrid()}
        resetGrid={() => resetGrid()}
        clearPath={() => clearPath()}
      ></Controls>
      <Grid
        setOnVisualize={setOnVisualize}
        setOnReset={setOnReset}
        setOnClearPath={setOnClearPath}
      ></Grid>
    </div>
  );
};

export default App;
