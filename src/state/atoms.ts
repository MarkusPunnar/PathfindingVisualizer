import { atom, atomFamily } from "recoil";
import {
  Algorithm,
  DrawingMode,
  Node,
  VisualizationSpeed,
  WeightNode,
} from "../types";
import {
  DEFAULT_END_COLUMN,
  DEFAULT_END_ROW,
  DEFAULT_START_COLUMN,
  DEFAULT_START_ROW,
  DEFAULT_WEIGHT_NODES,
} from "./constants";

const createNode = (row: number, column: number): Node => {
  return {
    position: {
      row,
      column,
    },
    flags: {
      isWall: false,
      isVisited: false,
      isPath: false,
      isStart: row === DEFAULT_START_ROW && column === DEFAULT_START_COLUMN,
      isEnd: row === DEFAULT_END_ROW && column === DEFAULT_END_COLUMN,
    },
    weightProps: {
      weight: 1,
      color: "",
    },
  };
};

export const isVisualizedAtom = atom<boolean>({
  key: "isVisualized",
  default: false,
});

export const isMovingStartAtom = atom<boolean>({
  key: "isMovingStart",
  default: false,
});

export const isMovingEndAtom = atom<boolean>({
  key: "isMovingEnd",
  default: false,
});

export const nodeAtom = atomFamily<Node, number[]>({
  key: "grid",
  default: ([row, column]) => createNode(row, column),
});

export const visitedNodesAtom = atom<Node[]>({
  key: "visitedNodes",
  default: [],
});

export const shortestPathNodesAtom = atom<Node[]>({
  key: "shortestPathNodes",
  default: [],
});

export const selectedAlgorithmAtom = atom<string>({
  key: "selectedAlgorithm",
  default: Algorithm.Dijkstra,
});

export const visualizationSpeedAtom = atom<VisualizationSpeed>({
  key: "visualizationSpeed",
  default: VisualizationSpeed.Medium,
});

export const drawingModeAtom = atom<DrawingMode>({
  key: "drawingMode",
  default: DrawingMode.Wall,
});

export const selectedWeightNodeAtom = atom<WeightNode>({
  key: "selectedWeightNode",
  default: DEFAULT_WEIGHT_NODES[0],
});

export const weightNodesAtom = atom<WeightNode[]>({
  key: "weightNodes",
  default: DEFAULT_WEIGHT_NODES,
});
