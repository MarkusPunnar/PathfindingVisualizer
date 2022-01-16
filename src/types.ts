import {
  FAST_NODE_UPDATE_SPEED,
  MEDIUM_NODE_UPDATE_SPEED,
  SLOW_NODE_UPDATE_SPEED,
} from "./state/constants";

export type VoidFunction = () => void;
export type GetNodeFunction = (i: number, j: number) => Node;

export interface Node {
  position: NodePosition;
  flags: NodeFlags;
  weightProps: WeightNode;
  parent?: Node;
  props?: any;
}

export interface WeightNode {
  weight: number;
  color: string;
}

export interface DijkstraProps {
  distance: number;
}

export interface AStarProps {
  f: number;
  g: number;
}

export interface NodePosition {
  row: number;
  column: number;
}

export interface NodeFlags {
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export enum Algorithm {
  Dijkstra = "Dijkstra",
  AStar = "A*",
}

export enum VisualizationSpeed {
  Fast = FAST_NODE_UPDATE_SPEED,
  Medium = MEDIUM_NODE_UPDATE_SPEED,
  Slow = SLOW_NODE_UPDATE_SPEED,
}

export enum DrawingMode {
  Wall = "Wall",
  Weighted = "Weighted",
}
