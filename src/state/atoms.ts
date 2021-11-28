import { atom, atomFamily } from "recoil";
import { Algorithm, Node } from "../types";
import {
  MEDIUM_NODE_UPDATE_SPEED,
  DEFAULT_END_COLUMN,
  DEFAULT_END_ROW,
  DEFAULT_START_COLUMN,
  DEFAULT_START_ROW,
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
  };
};

export const isDrawingWallsAtom = atom<boolean>({
  key: "isDrawingWalls",
  default: false,
});

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

export const visualizationSpeedAtom = atom<number>({
  key: "visualizationSpeed",
  default: MEDIUM_NODE_UPDATE_SPEED,
});
