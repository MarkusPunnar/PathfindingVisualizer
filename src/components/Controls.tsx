import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { selectedAlgorithmAtom } from "../state/atoms";
import { Algorithm } from "../types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../css/controls.scss";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

interface ControlsProps {
  visualizeGrid: () => void;
  resetGrid: () => void;
}

const Controls = ({ visualizeGrid, resetGrid }: ControlsProps) => {
  const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);
  const open = Boolean(menuAnchorElement);
  const [selectedAlgorithm, setSelectedAlgorithm] = useRecoilState(
    selectedAlgorithmAtom
  );
  const handleAlgorithmChange = (event: any) => {
    const { myValue: selectedAlgorithm } = event.currentTarget.dataset;
    setSelectedAlgorithm(selectedAlgorithm);
    setMenuAnchorElement(null);
  };
  const handleAlgorithmMenuClick = (event: any) => {
    setMenuAnchorElement(event.currentTarget);
  };
  return (
    <div className="controls">
      <AppBar
        position="static"
        sx={{
          alignItems: "center",
          mb: 10,
          backgroundColor: "#247BA0",
        }}
      >
        <Toolbar id="toolbar" sx={{ width: "100%" }}>
          <Typography variant="h4" sx={{ ml: 3, flex: 1 }}>
            Pathfinder
          </Typography>
          <Box>
            <Button
              sx={{ ml: 3 }}
              color="inherit"
              size="large"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              endIcon={<BsFillCaretDownFill size="15" />}
              onClick={handleAlgorithmMenuClick}
            >
              Algorithms
            </Button>
            <Menu
              id="selectedAlgorithm"
              open={open}
              anchorEl={menuAnchorElement}
              onClose={() => setMenuAnchorElement(null)}
            >
              <MenuItem
                data-my-value={Algorithm.Dijkstra}
                onClick={handleAlgorithmChange}
              >
                Dijkstra
              </MenuItem>
              <MenuItem
                data-my-value={Algorithm.AStar}
                onClick={handleAlgorithmChange}
              >
                A*
              </MenuItem>
            </Menu>
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
