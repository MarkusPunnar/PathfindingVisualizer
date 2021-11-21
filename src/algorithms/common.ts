import { Node, NodePosition } from "../types";
import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";

export const getIndex = ({ position: { row, column } }: Node): number => {
  return row * NUM_OF_NODES + column;
};

export const isEndNode = (node: Node, endPosition: NodePosition): boolean => {
  return (
    node.position.row === endPosition.row &&
    node.position.column === endPosition.column
  );
};

export const getNeighbours = (grid: Node[], index: number): Node[] => {
  const neighbours: Node[] = [];
  if (index % NUM_OF_NODES !== NUM_OF_NODES - 1) {
    neighbours.push(grid[index + 1]);
  }
  if (index % NUM_OF_NODES !== 0) {
    neighbours.push(grid[index - 1]);
  }
  if (index >= NUM_OF_NODES) {
    neighbours.push(grid[index - NUM_OF_NODES]);
  }
  if (index < NUM_OF_NODES * (NUM_OF_ROWS - 1)) {
    neighbours.push(grid[index + NUM_OF_NODES]);
  }
  return neighbours;
};
