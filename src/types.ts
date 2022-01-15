export type VoidFunction = () => void;
export type GetNodeFunction = (i: number, j: number) => Node;

export interface Node {
  position: NodePosition;
  flags: NodeFlags;
  parent?: Node;
  props?: any;
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
