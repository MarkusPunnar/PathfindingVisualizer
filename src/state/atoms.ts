import { atom, atomFamily } from "recoil";
import { Node, NodePosition } from "../types";

const createNode = (row: number, column: number): Node => {
  return {
    position: {
      row,
      column,
    },
    flags: {
      isWall: false,
      isVisited: false,
    },
    distance: Infinity,
  };
};

export const startNodeAtom = atom<NodePosition>({
  key: "startNode",
  default: {
    row: 10,
    column: 5,
  },
});

export const endNodeAtom = atom<NodePosition>({
  key: "endNode",
  default: {
    row: 10,
    column: 45,
  },
});

export const isDrawingWallsAtom = atom<boolean>({
  key: "isDrawingWalls",
  default: false,
});

export const nodeAtom = atomFamily<Node, number[]>({
  key: "grid",
  default: ([row, column]) => createNode(row, column),
});

export const nodeClassesAtom = atomFamily<string, number[]>({
  key: "nodeClasses",
  default: "node"
});