import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { nodeAtom, visualizationSpeedAtom } from "../../state/atoms";
import { getRandomPatternWalls } from "../../patterns/random";
import { getRecursiveDivisionWallNodes } from "../../patterns/recursive";

interface PatternMenuProps {
  isDisabled: boolean;
}

const PatternMenu = ({ isDisabled }: PatternMenuProps) => {
  const visualizationSpeed = useRecoilValue(visualizationSpeedAtom);
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
  const handleRecursiveDivisionClick = () => {
    setMenuAnchorElement(null);
    generateRecursiveDivisionMaze();
  };
  const generateRandomMaze = useRecoilCallback(
    ({ set, snapshot: { getLoadable } }) =>
      () => {
        const getNodeFunction = (i: number, j: number) => {
          return getLoadable(nodeAtom([i, j])).getValue();
        };
        getRandomPatternWalls(getNodeFunction).forEach((wallNode) => {
          const { row, column } = wallNode.position;
          set(nodeAtom([row, column]), {
            ...wallNode,
            flags: {
              ...wallNode.flags,
              isVisited: false,
              isPath: false,
              isWall: true,
            },
          });
        });
      }
  );
  const generateRecursiveDivisionMaze = useRecoilCallback(
    ({ set, snapshot: { getLoadable } }) =>
      () => {
        const getNodeFunction = (i: number, j: number) => {
          return getLoadable(nodeAtom([i, j])).getValue();
        };
        getRecursiveDivisionWallNodes(getNodeFunction)
          .sort((a, b) => {
            return a.position.column - b.position.column;
          })
          .filter((wallNode) => {
            const { isStart, isEnd } = wallNode.flags;
            return !isStart && !isEnd;
          })
          .forEach((wallNode, i) => {
            const { row, column } = wallNode.position;
            setTimeout(() => {
              set(nodeAtom([row, column]), {
                ...wallNode,
                flags: {
                  ...wallNode.flags,
                  isVisited: false,
                  isPath: false,
                  isWall: true,
                },
              });
            }, (visualizationSpeed * (i + 1)) / 2);
          });
      }
  );
  return (
    <span>
      <Button
        sx={{
          "&": { mx: "5px", backgroundColor: "#FF9500" },
          "&:disabled": {
            color: "white",
            backgroundColor: "#B4876C",
          },
        }}
        color="inherit"
        size="small"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<BsFillCaretDownFill size="12" />}
        onClick={handlePatternMenuClick}
        disabled={isDisabled}
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
        <MenuItem onClick={handleRecursiveDivisionClick}>
          Recursive division
        </MenuItem>
      </Menu>
    </span>
  );
};

export default PatternMenu;
