import React, { useEffect } from "react";
import {
  useSetRecoilState,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "../css/grid.scss";
import {
  nodeAtom,
  isVisualizedAtom,
  visitedNodesAtom,
  shortestPathNodesAtom,
  selectedAlgorithmAtom,
} from "../state/atoms";
import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";
import GridNode from "./GridNode";
import { Algorithm, Node, NodePosition, VoidFunction } from "../types";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/astar";

interface GridProps {
  setOnVisualize: (childVisualize: VoidFunction) => void;
  setOnReset: (childReset: VoidFunction) => void;
  setOnClearPath: (childClearPath: VoidFunction) => void;
}

const startPositionFuncs: (() => NodePosition)[] = [];
const endPositionFuncs: (() => NodePosition)[] = [];
const clearNodeFuncs: VoidFunction[] = [];

const getShortestPath = (endNode: Node): Node[] => {
  const shortestPath: Node[] = [];
  let node: Node | undefined = endNode;
  while (node) {
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

const getNodePositionFromChildren = (
  positionFuncs: (() => NodePosition)[]
): NodePosition => {
  let nodePosition = { row: -1, column: -1 };
  for (let positionFunc of positionFuncs) {
    const childPosition = positionFunc();
    if (childPosition) {
      nodePosition = childPosition;
      break;
    }
  }
  return nodePosition;
};

const getStartNodePosition = (): NodePosition => {
  return getNodePositionFromChildren(startPositionFuncs);
};

const getEndNodePosition = (): NodePosition => {
  return getNodePositionFromChildren(endPositionFuncs);
};

const Grid = ({ setOnVisualize, setOnReset, setOnClearPath }: GridProps) => {
  const setIsStartPosition = (
    childStartPosition: () => NodePosition,
    childIndex: number
  ) => {
    startPositionFuncs[childIndex] = childStartPosition;
  };
  const setIsEndPosition = (
    childEndPosition: () => NodePosition,
    childIndex: number
  ) => {
    endPositionFuncs[childIndex] = childEndPosition;
  };
  const setClearNode = (childClearNode: VoidFunction, childIndex: number) => {
    clearNodeFuncs[childIndex] = childClearNode;
  };
  const setIsVisualized = useSetRecoilState(isVisualizedAtom);
  const [visitedNodes, setVisitedNodes] = useRecoilState(visitedNodesAtom);
  const [shortestPathNodes, setShortestPathNodes] = useRecoilState(
    shortestPathNodesAtom
  );
  const selectedAlgorithm = useRecoilValue(selectedAlgorithmAtom);
  useEffect(() => {
    setOnVisualize(() => {
      visualizeAlgorithm();
      setIsVisualized(true);
    });
    setOnReset(() => {
      resetGridState();
      setVisitedNodes([]);
      setShortestPathNodes([]);
      setIsVisualized(false);
    });
    setOnClearPath(() => {
      clearNodeFuncs.forEach((clearFunc) => clearFunc());
      setVisitedNodes([]);
      setShortestPathNodes([]);
      setIsVisualized(false);
    });
  });
  const getGridState = useRecoilCallback(
    ({ snapshot: { getLoadable } }) =>
      () => {
        let nodes: Node[] = [];
        for (let i = 0; i < NUM_OF_ROWS; i++) {
          for (let j = 0; j < NUM_OF_NODES; j++) {
            const nodeValue = getLoadable(nodeAtom([i, j])).getValue();
            nodes = [...nodes, JSON.parse(JSON.stringify(nodeValue))];
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
  const visualizeAlgorithm = () => {
    const startNodePosition = getStartNodePosition();
    const endNodePosition = getEndNodePosition();
    const gridNodes = getGridState();
    let newVisitedNodes: Node[] = [];
    switch (selectedAlgorithm) {
      case Algorithm.Dijkstra:
        newVisitedNodes = dijkstra(
          gridNodes,
          startNodePosition,
          endNodePosition
        );
        break;
      case Algorithm.AStar:
        newVisitedNodes = aStar(gridNodes, startNodePosition, endNodePosition);
        break;
    }
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
    <div className="grid">
      {Array.from(Array(NUM_OF_ROWS * NUM_OF_NODES).keys()).map((index) => {
        const row = Math.floor(index / NUM_OF_NODES);
        const column = index % NUM_OF_NODES;
        return (
          <GridNode
            position={{ row, column }}
            visitedNumber={getArrayIndex(visitedNodes, row, column)}
            visitedCount={visitedNodes.length}
            pathNumber={getArrayIndex(
              shortestPathNodes.slice().reverse(),
              row,
              column
            )}
            setIsStartPosition={setIsStartPosition}
            setIsEndPosition={setIsEndPosition}
            setClearNode={setClearNode}
            key={index}
          ></GridNode>
        );
      })}
    </div>
  );
};

export default Grid;
