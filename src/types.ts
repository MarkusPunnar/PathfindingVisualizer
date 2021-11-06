export interface Node {
  position: NodePosition;
  flags: NodeFlags;
  distance: number;
  parent?: Node;
}

export interface NodePosition {
  row: number;
  column: number;
}

export interface NodeFlags {
  isWall: boolean;
  isVisited: boolean;
}
