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
}

export enum Algorithm {
  Dijkstra = "Dijkstra",
  AStar = "A*",
}
