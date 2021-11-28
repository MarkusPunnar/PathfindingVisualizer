import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useRecoilCallback } from "recoil";
import { NUM_OF_NODES, NUM_OF_ROWS } from "../../state/constants";
import { nodeAtom } from "../../state/atoms";

const PatternMenu = () => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchorElement);
  const handlePatternMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  const handleRandomMazeClick = () => {
    setMenuAnchorElement(null);
    generateRandomMaze();
  };
  const generateRandomMaze = useRecoilCallback(
    ({ set, snapshot: { getLoadable } }) =>
      () => {
        for (let i = 0; i < NUM_OF_ROWS; i++) {
          for (let j = 0; j < NUM_OF_NODES; j++) {
            const nodeValue = getLoadable(nodeAtom([i, j])).getValue();
            const { isStart, isEnd } = nodeValue.flags;
            const randomFactor = Math.random();
            if (randomFactor > 0.7 && !isStart && !isEnd) {
              set(nodeAtom([i, j]), {
                ...nodeValue,
                flags: { ...nodeValue.flags, isWall: true },
              });
            }
          }
        }
      }
  );
  return (
    <span>
      <Button
        sx={{ mx: "5px", backgroundColor: "#FF9500" }}
        color="inherit"
        size="small"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<BsFillCaretDownFill size="12" />}
        onClick={handlePatternMenuClick}
      >
        Patterns
      </Button>
      <Menu
        id="selectedPattern"
        open={open}
        anchorEl={menuAnchorElement}
        onClose={() => setMenuAnchorElement(null)}
      >
        <MenuItem onClick={handleRandomMazeClick}>Random maze</MenuItem>
      </Menu>
    </span>
  );
};

export default PatternMenu;
