import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { VscDebugStart } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import "../css/gridNode.scss";
import {
  isMovingStartAtom,
  isMovingEndAtom,
  isVisualizedAtom,
  nodeAtom,
  visualizationSpeedAtom,
  drawingModeAtom,
  selectedWeightNodeAtom,
} from "../state/atoms";
import { DrawingMode, NodePosition, VoidFunction } from "../types";
import { getIndex } from "../algorithms/common";
import { useTimeout } from "../hooks";
import { nodeClassesSelector } from "../state/selectors";
import {
  DEFAULT_END_COLUMN,
  DEFAULT_END_ROW,
  DEFAULT_START_COLUMN,
  DEFAULT_START_ROW,
} from "../state/constants";

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
  const isVisualized = useRecoilValue(isVisualizedAtom);
  const visualizationSpeed = useRecoilValue(visualizationSpeedAtom);
  const drawingMode = useRecoilValue(drawingModeAtom);
  const selectedWeightNode = useRecoilValue(selectedWeightNodeAtom);
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

  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const isLeftMouseButtonPressed = e.buttons === 1;
    const { isWall } = node.flags;
    if (!isWall && isMovingStart) {
      setIsStart(true);
    } else if (!isWall && isMovingEnd) {
      setIsEnd(true);
    } else if (isLeftMouseButtonPressed && !isMovingStart && !isMovingEnd) {
      drawNode();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { isStart, isEnd } = node.flags;
    if (isStart && !isVisualized) {
      setIsMovingStart(true);
    } else if (isEnd && !isVisualized) {
      setIsMovingEnd(true);
    } else {
      drawNode();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { isStart, isEnd } = node.flags;
    if (isStart && isMovingStart) {
      setIsStart(false);
    } else if (isEnd && isMovingEnd) {
      setIsEnd(false);
    }
  };

  const resetStart = useRecoilCallback(({ reset }) => () => {
    reset(nodeAtom([DEFAULT_START_ROW, DEFAULT_START_COLUMN]));
  });

  const resetEnd = useRecoilCallback(({ reset }) => () => {
    reset(nodeAtom([DEFAULT_END_ROW, DEFAULT_END_COLUMN]));
  });

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { isWall } = node.flags;
    if (isWall) {
      if (isMovingStart) {
        setIsStart(false);
        resetStart();
      } else if (isMovingEnd) {
        setIsEnd(false);
        resetEnd();
      }
    }
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  const drawNode = () => {
    if (!isVisualized) {
      if (drawingMode === DrawingMode.Wall) {
        setNode({
          ...node,
          flags: {
            ...node.flags,
            isWall: !node.flags.isWall,
          },
          weightProps: {
            weight: Infinity,
            color: "",
          },
        });
      } else {
        setNode({
          ...node,
          flags: {
            ...node.flags,
            isWall: false,
          },
          weightProps: {
            weight: selectedWeightNode.weight,
            color: selectedWeightNode.color,
          },
        });
      }
    }
  };
  if (node.weightProps.color.length !== 0) {
    document.documentElement.style.setProperty(
      "--weight-node-color",
      node.weightProps.color
    );
  }

  const styles: React.CSSProperties = {
    filter:
      node.flags.isVisited && node.weightProps.color.length !== 0
        ? "brightness(0.7)"
        : "brightness(1)",
  };
  return (
    <div
      className={nodeClasses}
      style={styles}
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
