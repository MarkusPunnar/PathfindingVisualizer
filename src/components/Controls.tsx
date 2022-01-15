import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { isVisualizedAtom, selectedAlgorithmAtom } from "../state/atoms";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../css/controls.scss";
import AlgorithmMenu from "./menu/AlgorithmMenu";
import SpeedMenu from "./menu/SpeedMenu";
import { VoidFunction } from "../types";
import PatternMenu from "./menu/PatternMenu";

interface ControlsProps {
  visualizeGrid: VoidFunction;
  resetGrid: VoidFunction;
  clearPath: VoidFunction;
}

const Controls = ({ visualizeGrid, resetGrid, clearPath }: ControlsProps) => {
  const selectedAlgorithm = useRecoilValue(selectedAlgorithmAtom);
  const isVisualized = useRecoilValue(isVisualizedAtom);
  return (
    <div className="controls">
      <AppBar
        position="static"
        sx={{
          alignItems: "center",
          mb: "5%",
          backgroundColor: "#FFA254",
        }}
      >
        <Toolbar id="toolbar" variant="dense" sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            sx={{ ml: 3, fontFamily: "Dancing Script", fontWeight: 700 }}
          >
            Pathfinder
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <div>
              <AlgorithmMenu />
              <PatternMenu isDisabled={isVisualized} />
            </div>
            <Button
              size="medium"
              color="inherit"
              sx={{
                "&": { mx: "5px", backgroundColor: "#FF7800" },
                "&:hover": {
                  backgroundColor: "#FF7800",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  color: "white",
                  backgroundColor: "#B4876C",
                },
              }}
              disabled={isVisualized}
              onClick={visualizeGrid}
            >
              {`Visualize ${selectedAlgorithm}`}
            </Button>
            <div>
              <Button
                size="small"
                color="inherit"
                sx={{ mx: "5px", backgroundColor: "#FF9500" }}
                onClick={resetGrid}
              >
                Reset grid
              </Button>
              <Button
                size="small"
                color="inherit"
                sx={{ mx: "5px", backgroundColor: "#FF9500" }}
                onClick={clearPath}
              >
                Clear path
              </Button>
            </div>
          </Box>
          <Box sx={{ mr: 3, display: "flex", justifyContent: "flex-end" }}>
            <SpeedMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Controls;
