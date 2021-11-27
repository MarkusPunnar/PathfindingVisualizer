import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { selectedAlgorithmAtom } from "../state/atoms";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../css/controls.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import AlgorithmMenu from "./AlgorithmMenu";
import SpeedMenu from "./SpeedMenu";

interface ControlsProps {
  visualizeGrid: VoidFunction;
  resetGrid: VoidFunction;
}

const Controls = ({ visualizeGrid, resetGrid }: ControlsProps) => {
  const selectedAlgorithm = useRecoilValue(selectedAlgorithmAtom);
  return (
    <div className="controls">
      <AppBar
        position="static"
        sx={{
          alignItems: "center",
          mb: "5%",
          backgroundColor: "#247BA0",
        }}
      >
        <Toolbar id="toolbar" sx={{ width: "100%" }}>
          <Typography variant="h4" sx={{ ml: 3, flex: 1 }}>
            Pathfinder
          </Typography>
          <Box>
            <AlgorithmMenu />
            <Button
              size="large"
              color="inherit"
              sx={{ ml: 3 }}
              onClick={visualizeGrid}
            >
              {`Visualize ${selectedAlgorithm}`}
            </Button>
            <Button
              size="large"
              color="inherit"
              sx={{ ml: 3 }}
              onClick={resetGrid}
            >
              Reset grid
            </Button>
            <SpeedMenu />
          </Box>
          <Box
            sx={{ mr: 3, flex: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <GiHamburgerMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Controls;
