import classNames from "classnames";
import React, { useEffect } from "react";
import { VscDebugStart } from 'react-icons/vsc';
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../css/gridNode.scss";
import { isDrawingWallsAtom, nodeAtom, nodeClassesAtom } from "../state/atoms";
import { NodePosition } from "../types";

const PATH_CLASS = "path";
const VISITED_CLASS = "visited";

interface NodeProps {
  position: NodePosition;
  isStart: boolean;
  isEnd: boolean;
  visitedNumber: number;
  visitedCount: number;
  pathNumber: number;
}

const getPathNodeDelay = (visitedCount: number, pathNumber: number): number => {
  return 4 * visitedCount + 5 * (pathNumber + 1);
}

const getVisitedNodeDelay = (visitedNumber: number) => {
  return 4 * (visitedNumber + 1);
}

const GridNode = ({
  position: { row, column },
  isStart,
  isEnd,
  visitedNumber,
  pathNumber,
  visitedCount,
}: NodeProps) => {
  const isDrawingWalls = useRecoilValue(isDrawingWallsAtom);
  const [node, setNode] = useRecoilState(nodeAtom([row, column]));
  const getClassNames = useCallback((): string => {
    const wallClass = node.flags.isWall ? "wall" : "";
    return classNames("node", wallClass);
  }, [node.flags.isWall]);
  const [classes, setClasses] = useRecoilState<string>(nodeClassesAtom([row, column]));
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (visitedNumber !== -1 && !node.flags.isVisited) {
      const visitTimerId = setTimeout(() => {
        setNode({
          ...node,
          flags: {
            ...node.flags,
            isVisited: true
          }
        })
        setClasses(classNames(getClassNames(), VISITED_CLASS));
      }, getVisitedNodeDelay(visitedNumber));
      timeouts.push(visitTimerId);
    } else if (pathNumber !== -1) {
      const pathTimerId = setTimeout(() => {
        setClasses(classNames(getClassNames(), PATH_CLASS));
      }, getPathNodeDelay(visitedCount, pathNumber));
      timeouts.push(pathTimerId);
    }
    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      })
    }
  }, [getClassNames, classes, visitedNumber, node, pathNumber, setNode, setClasses, visitedCount]);
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
      setClasses(`${classes} ${!node.flags.isWall ? "wall" : ""}`)
    }
  };
  return (
    <div
      className={classes}
      onMouseOver={handleMouseOver}
      onMouseDown={drawWall}
    >
      {isStart && <VscDebugStart size={28} />}
      {isEnd && <FaMapMarkerAlt size={22} />}
    </div>
  );
};

export default GridNode;
