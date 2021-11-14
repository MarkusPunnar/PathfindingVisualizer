import { Node, NodePosition } from "../types";
import { NUM_OF_NODES } from "../state/constants";

export const getIndex = ({ position: { row, column } }: Node): number => {
  return row * NUM_OF_NODES + column;
};

export const isEndNode = (node: Node, endPosition: NodePosition): boolean => {
  return (
    node.position.row === endPosition.row &&
    node.position.column === endPosition.column
  );
};
