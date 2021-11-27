import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSetRecoilState } from "recoil";
import { selectedAlgorithmAtom } from "../../state/atoms";
import { Algorithm } from "../../types";
import Button from "@mui/material/Button";
import { BsFillCaretDownFill } from "react-icons/bs";

const AlgorithmMenu = () => {
  const setSelectedAlgorithm = useSetRecoilState(selectedAlgorithmAtom);
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchorElement);
  const handleAlgorithmChange = (event: any) => {
    const { myValue: selectedAlgorithm } = event.currentTarget.dataset;
    setSelectedAlgorithm(selectedAlgorithm);
    setMenuAnchorElement(null);
  };
  const handleAlgorithmMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };
  return (
    <span>
      <Button
        sx={{ mx: "5px", backgroundColor: "#FF9500" }}
        color="inherit"
        size="small"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<BsFillCaretDownFill size="12" />}
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
    </span>
  );
};

export default AlgorithmMenu;
