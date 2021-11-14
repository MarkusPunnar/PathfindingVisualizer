import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { VscDebugStart } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "../css/gridNode.scss";
import {
  isDrawingWallsAtom,
  isMovingStartAtom,
  isMovingEndAtom,
  isVisualizedAtom,
  nodeAtom,
  nodeClassesAtom,
} from "../state/atoms";
import { NodePosition } from "../types";
import { getIndex } from "../algorithms/common";
import {
  DEFAULT_END_COLUMN,
  DEFAULT_END_ROW,
  DEFAULT_START_COLUMN,
  DEFAULT_START_ROW,
} from "../state/constants";

const PATH_CLASS = "path";
const VISITED_CLASS = "visited";

interface NodeProps {
  position: NodePosition;
  visitedNumber: number;
  visitedCount: number;
  pathNumber: number;
  setIsStartPosition: any;
  setIsEndPosition: any;
  setResetNode: any;
}

const getPathNodeDelay = (visitedCount: number, pathNumber: number): number => {
  return 4 * visitedCount + 5 * (pathNumber + 1);
};

const getVisitedNodeDelay = (visitedNumber: number) => {
  return 4 * (visitedNumber + 1);
};

const GridNode = ({
  position: { row, column },
  visitedNumber,
  pathNumber,
  visitedCount,
  setIsStartPosition,
  setIsEndPosition,
  setResetNode,
}: NodeProps) => {
  const isDrawingWalls = useRecoilValue(isDrawingWallsAtom);
  const isVisualized = useRecoilValue(isVisualizedAtom);
  const [isMovingStart, setIsMovingStart] = useRecoilState(isMovingStartAtom);
  const [isMovingEnd, setIsMovingEnd] = useRecoilState(isMovingEndAtom);
  const [node, setNode] = useRecoilState(nodeAtom([row, column]));
  const isDefaultStart = () =>
    row === DEFAULT_START_ROW && column === DEFAULT_START_COLUMN;
  const isDefaultEnd = () =>
    row === DEFAULT_END_ROW && column === DEFAULT_END_COLUMN;
  const [isStart, setIsStart] = useState<boolean>(isDefaultStart());
  const [isEnd, setIsEnd] = useState<boolean>(isDefaultEnd());
  const getClassNames = useCallback((isWall: boolean): string => {
    const wallClass = isWall ? "wall" : "";
    return classNames("node", wallClass);
  }, []);

  const [classes, setClasses] = useRecoilState<string>(
    nodeClassesAtom([row, column])
  );
  const isStartPosition = () => {
    return isStart ? { row, column } : undefined;
  };
  const isEndPosition = () => {
    return isEnd ? { row, column } : undefined;
  };
  const resetNode = () => {};
  useEffect(() => {
    setIsStartPosition(isStartPosition, getIndex(node));
    setIsEndPosition(isEndPosition, getIndex(node));
    setResetNode(resetNode, getIndex(node));
  });
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (visitedNumber !== -1 && !node.flags.isVisited) {
      const visitTimerId = setTimeout(() => {
        ReactDOM.unstable_batchedUpdates(() => {
          setNode({
            ...node,
            flags: {
              ...node.flags,
              isVisited: true,
            },
          });
          setClasses(
            classNames(getClassNames(node.flags.isWall), VISITED_CLASS)
          );
        });
      }, getVisitedNodeDelay(visitedNumber));
      timeouts.push(visitTimerId);
    } else if (pathNumber !== -1) {
      const pathTimerId = setTimeout(() => {
        setClasses(classNames(getClassNames(node.flags.isWall), PATH_CLASS));
      }, getPathNodeDelay(visitedCount, pathNumber));
      timeouts.push(pathTimerId);
    }
    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [
    getClassNames,
    classes,
    visitedNumber,
    node,
    pathNumber,
    setNode,
    setClasses,
    visitedCount,
  ]);
  const handleMouseOver = () => {
    if (isMovingStart) {
      setIsStart(true);
    } else if (isMovingEnd) {
      setIsEnd(true);
    } else if (isDrawingWalls) {
      drawWall();
    }
  };

  const handleMouseDown = () => {
    if (isStart && !isVisualized) {
      setIsMovingStart(true);
    } else if (isEnd && !isVisualized) {
      setIsMovingEnd(true);
    } else {
      drawWall();
    }
  };

  const handleMouseLeave = () => {
    if (isStart && isMovingStart) {
      setIsStart(false);
    } else if (isEnd && isMovingEnd) {
      setIsEnd(false);
    }
  };

  const handleMouseUp = () => {
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  const drawWall = () => {
    if (!isVisualized) {
      setNode({
        ...node,
        flags: {
          ...node.flags,
          isWall: !node.flags.isWall,
        },
      });
      setClasses(getClassNames(!node.flags.isWall));
    }
  };
  return (
    <div
      className={classes}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      {isStart && <VscDebugStart className="icon" />}
      {isEnd && <FaMapMarkerAlt className="icon" />}
    </div>
  );
};

export default GridNode;
