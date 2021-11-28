import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { VscDebugStart } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import "../css/gridNode.scss";
import {
  isDrawingWallsAtom,
  isMovingStartAtom,
  isMovingEndAtom,
  isVisualizedAtom,
  nodeAtom,
  visualizationSpeedAtom,
} from "../state/atoms";
import { NodePosition, VoidFunction } from "../types";
import { getIndex } from "../algorithms/common";
import { useTimeout } from "../hooks";
import { nodeClassesSelector } from "../state/selectors";

interface NodeProps {
  position: NodePosition;
  visitedNumber: number;
  visitedCount: number;
  pathNumber: number;
  setIsStartPosition: any;
  setIsEndPosition: any;
  setClearNode: (childClearNode: VoidFunction, index: number) => void;
}

const getPathNodeDelay = (
  visualizationSpeed: number,
  visitedCount: number,
  pathNumber: number
): number => {
  return visualizationSpeed * (visitedCount + 2 * (pathNumber + 1));
};

const getVisitedNodeDelay = (
  visualizationSpeed: number,
  visitedNumber: number
) => {
  return visualizationSpeed * (visitedNumber + 1);
};

const GridNode = ({
  position: { row, column },
  visitedNumber,
  pathNumber,
  visitedCount,
  setIsStartPosition,
  setIsEndPosition,
  setClearNode,
}: NodeProps) => {
  const isDrawingWalls = useRecoilValue(isDrawingWallsAtom);
  const isVisualized = useRecoilValue(isVisualizedAtom);
  const visualizationSpeed = useRecoilValue(visualizationSpeedAtom);
  const [isMovingStart, setIsMovingStart] = useRecoilState(isMovingStartAtom);
  const [isMovingEnd, setIsMovingEnd] = useRecoilState(isMovingEndAtom);
  const [node, setNode] = useRecoilState(nodeAtom([row, column]));
  const nodeClasses = useRecoilValue<string>(
    nodeClassesSelector([row, column])
  );
  const isStartPosition = () => {
    return node.flags.isStart ? { row, column } : undefined;
  };
  const isEndPosition = () => {
    return node.flags.isEnd ? { row, column } : undefined;
  };
  const clearNode = () => {
    setNode({
      ...node,
      flags: {
        ...node.flags,
        isVisited: false,
        isPath: false,
      },
    });
  };
  const setIsStart = (isStart: boolean) => {
    setNode({
      ...node,
      flags: {
        ...node.flags,
        isStart,
      },
    });
  };
  const setIsEnd = (isEnd: boolean) => {
    setNode({
      ...node,
      flags: {
        ...node.flags,
        isEnd,
      },
    });
  };
  useEffect(() => {
    setIsStartPosition(isStartPosition, getIndex(node));
    setIsEndPosition(isEndPosition, getIndex(node));
    setClearNode(clearNode, getIndex(node));
  });
  useTimeout(() => {
    if (visitedNumber !== -1 && !node.flags.isVisited) {
      ReactDOM.unstable_batchedUpdates(() => {
        setNode({
          ...node,
          flags: {
            ...node.flags,
            isVisited: true,
          },
        });
      });
    }
  }, getVisitedNodeDelay(visualizationSpeed, visitedNumber));

  useTimeout(() => {
    if (pathNumber !== -1) {
      setNode({
        ...node,
        flags: {
          ...node.flags,
          isPath: true,
        },
      });
    }
  }, getPathNodeDelay(visualizationSpeed, visitedCount, pathNumber));

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
    const { isStart, isEnd } = node.flags;
    if (isStart && !isVisualized) {
      setIsMovingStart(true);
    } else if (isEnd && !isVisualized) {
      setIsMovingEnd(true);
    } else {
      drawWall();
    }
  };

  const handleMouseLeave = () => {
    const { isStart, isEnd } = node.flags;
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
    }
  };
  return (
    <div
      className={nodeClasses}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      {node.flags.isStart && <VscDebugStart className="icon" />}
      {node.flags.isEnd && <FaMapMarkerAlt className="icon" />}
    </div>
  );
};

export default GridNode;
