import { WeightNode } from "../types";

export const NUM_OF_ROWS = 19;
export const NUM_OF_NODES = 49;

export const DEFAULT_START_ROW = 10;
export const DEFAULT_START_COLUMN = 5;
export const DEFAULT_END_ROW = 10;
export const DEFAULT_END_COLUMN = 45;

export const FAST_NODE_UPDATE_SPEED = 4;
export const MEDIUM_NODE_UPDATE_SPEED = 10;
export const SLOW_NODE_UPDATE_SPEED = 25;

export const DEFAULT_WEIGHT_NODES: WeightNode[] = [
  { weight: 5, color: "#ffff00" },
  { weight: 10, color: "#ff0000" },
];
