import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState } from "recoil";
import { visualizationSpeedAtom } from "../state/atoms";
import Button from "@mui/material/Button";
import { BsFillCaretDownFill } from "react-icons/bs";
import {
  FAST_NODE_UPDATE_SPEED,
  MEDIUM_NODE_UPDATE_SPEED,
  SLOW_NODE_UPDATE_SPEED,
} from "../state/constants";

const SpeedMenu = () => {
  const [visualizationSpeed, setVisualizationSpeed] = useRecoilState(
    visualizationSpeedAtom
  );
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchorElement);
  const handleSpeedMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  const handleSpeedChange = (event: any) => {
    const { myValue: visualizationSpeed } = event.currentTarget.dataset;
    setVisualizationSpeed(Number.parseInt(visualizationSpeed));
    setMenuAnchorElement(null);
  };
  const getSpeedString = (): string => {
    switch (visualizationSpeed) {
      case FAST_NODE_UPDATE_SPEED:
        return "Fast";
      case MEDIUM_NODE_UPDATE_SPEED:
        return "Medium";
      case SLOW_NODE_UPDATE_SPEED:
        return "Slow";
    }
    return "Unknown";
  };
  return (
    <span>
      <Button
        sx={{ ml: 3 }}
        color="inherit"
        size="large"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<BsFillCaretDownFill size="15" />}
        onClick={handleSpeedMenuClick}
      >
        {`Speed: ${getSpeedString()}`}
      </Button>
      <Menu
        id="visualizationSpeed"
        open={open}
        anchorEl={menuAnchorElement}
        onClose={() => setMenuAnchorElement(null)}
      >
        <MenuItem
          data-my-value={FAST_NODE_UPDATE_SPEED}
          onClick={handleSpeedChange}
        >
          Fast
        </MenuItem>
        <MenuItem
          data-my-value={MEDIUM_NODE_UPDATE_SPEED}
          onClick={handleSpeedChange}
        >
          Medium
        </MenuItem>
        <MenuItem
          data-my-value={SLOW_NODE_UPDATE_SPEED}
          onClick={handleSpeedChange}
        >
          Slow
        </MenuItem>
      </Menu>
    </span>
  );
};

export default SpeedMenu;
