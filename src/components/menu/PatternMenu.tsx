import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { BsFillCaretDownFill } from "react-icons/bs";

const PatternMenu = () => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchorElement);
  const handlePatternMenuClick = (event: React.MouseEvent<HTMLElement>) => {
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
        <MenuItem data-my-value={"TODO"}>Recursive division</MenuItem>
      </Menu>
    </span>
  );
};

export default PatternMenu;
