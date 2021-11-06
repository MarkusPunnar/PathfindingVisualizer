import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../css/gridNode.scss";
import { isDrawingWallsAtom, nodeAtom } from "../state/atoms";
import { NodePosition } from "../types";

interface NodeProps {
  position: NodePosition;
  isStart: boolean;
  isEnd: boolean;
  visitedNumber: number;
  visitedCount: number;
  pathNumber: number;
}

const GridNode = ({
  position: { row, column },
  isStart,
  isEnd,
  visitedNumber,
  pathNumber,
  visitedCount,
}: NodeProps) => {
  const getClassNames = (): string => {
    const startClass = isStart ? "start" : "";
    const endClass = isEnd ? "end" : "";
    const wallClass = node.flags.isWall ? "wall" : "";
    return classNames("node", startClass, endClass, wallClass);
  };
  const isDrawingWalls = useRecoilValue(isDrawingWallsAtom);
  const [node, setNode] = useRecoilState(nodeAtom([row, column]));
  const [classes, setClasses] = useState<string>(getClassNames());
  useEffect(() => {
    if (pathNumber !== -1) {
      const pathTimerId = setTimeout(() => {
        const pathClass = !isStart && !isEnd ? "path" : "";
        setClasses(classNames(getClassNames(), pathClass));
      }, 4 * visitedCount + 30 * (pathNumber + 1));
      return () => {
        clearTimeout(pathTimerId);
      };
    } else if (visitedNumber !== -1) {
      const visitTimerId = setTimeout(() => {
        const visitedClass = !isStart && !isEnd ? "visited" : "";
        setClasses(classNames(getClassNames(), visitedClass));
      }, 4 * (visitedNumber + 1));
      return () => {
        clearTimeout(visitTimerId);
      };
    } else {
      setClasses(getClassNames());
    }
  });
  const handleMouseOver = () => {
    if (isDrawingWalls) {
      drawWall();
    }
  };

  const drawWall = () => {
    if (!isStart && !isEnd) {
      setNode({
        ...node,
        flags: {
          ...node.flags,
          isWall: !node.flags.isWall,
        },
      });
    }
  };
  return (
    <div
      className={classes}
      onMouseOver={handleMouseOver}
      onMouseDown={drawWall}
    ></div>
  );
};

export default GridNode;
