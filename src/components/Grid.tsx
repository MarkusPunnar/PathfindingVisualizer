import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilCallback } from "recoil";
import "../css/grid.scss";
import {
  isDrawingWallsAtom,
  startNodeAtom,
  endNodeAtom,
  nodeAtom,
} from "../state/atoms";
import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";
import GridNode from "./GridNode";
import { Node } from "../types";
import { dijkstra } from "../algorithms/dijkstra";

interface GridProps {
  setOnVisualize: (childVisualize: () => void) => void;
  setOnClear: (childClear: () => void) => void;
}

const getShortestPath = (endNode: Node): Node[] => {
  const shortestPath: Node[] = [];
  let node = endNode.parent;
  while (!!node && node.parent) {
    shortestPath.push(node);
    node = node.parent;
  }
  return shortestPath;
};

const getArrayIndex = (array: Node[], row: number, column: number): number => {
  return array.length !== 0
    ? array.findIndex(
        (node) => node.position.row === row && node.position.column === column
      )
    : -1;
};

const Grid = ({ setOnVisualize, setOnClear }: GridProps) => {
  const setIsDrawingWalls = useSetRecoilState(isDrawingWallsAtom);
  const startNodePosition = useRecoilValue(startNodeAtom);
  const endNodePosition = useRecoilValue(endNodeAtom);
  const [visitedNodes, setVisitedNodes] = useState<Node[]>([]);
  const [shortestPathNodes, setShortestPathNodes] = useState<Node[]>([]);
  useEffect(() => {
    setOnVisualize(visualizeDijkstra);
    setOnClear(() => {
      resetGridState();
      setVisitedNodes([]);
      setShortestPathNodes([]);
    });
  });
  const getGridState = useRecoilCallback(
    ({ snapshot: { getLoadable } }) =>
      () => {
        let nodes: Node[] = [];
        for (let i = 0; i < NUM_OF_ROWS; i++) {
          for (let j = 0; j < NUM_OF_NODES; j++) {
            nodes = [...nodes, getLoadable(nodeAtom([i, j])).getValue()];
          }
        }
        return nodes;
      }
  );
  const resetGridState = useRecoilCallback(({ reset }) => () => {
    for (let i = 0; i < NUM_OF_ROWS; i++) {
      for (let j = 0; j < NUM_OF_NODES; j++) {
        reset(nodeAtom([i, j]));
      }
    }
  });
  const visualizeDijkstra = () => {
    const newVisitedNodes = dijkstra(
      getGridState(),
      startNodePosition,
      endNodePosition
    );
    const endNode = newVisitedNodes[newVisitedNodes.length - 1];
    if (
      endNode.position.row === endNodePosition.row &&
      endNode.position.column === endNodePosition.column
    ) {
      setShortestPathNodes(getShortestPath(endNode));
    }
    setVisitedNodes(newVisitedNodes);
  };
  return (
    <div
      className="grid"
      onMouseDown={() => setIsDrawingWalls(true)}
      onMouseUp={() => setIsDrawingWalls(false)}
    >
      {Array.from(Array(NUM_OF_ROWS * NUM_OF_NODES).keys()).map((index) => {
        const row = Math.floor(index / NUM_OF_NODES);
        const column = index % NUM_OF_NODES;
        const isStart =
          startNodePosition.row === row && startNodePosition.column === column;
        const isEnd =
          endNodePosition.row === row && endNodePosition.column === column;
        return (
          <GridNode
            position={{ row, column }}
            isStart={isStart}
            isEnd={isEnd}
            visitedNumber={getArrayIndex(visitedNodes, row, column)}
            visitedCount={visitedNodes.length}
            pathNumber={getArrayIndex(
              shortestPathNodes.slice().reverse(),
              row,
              column
            )}
            key={index}
          ></GridNode>
        );
      })}
    </div>
  );
};

export default Grid;
