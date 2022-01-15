import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";
import { Node, GetNodeFunction } from "../types";

export const getRandomPatternWalls = (getNode: GetNodeFunction): Node[] => {
  const wallNodes = [];
  for (let i = 0; i < NUM_OF_ROWS; i++) {
    for (let j = 0; j < NUM_OF_NODES; j++) {
      const nodeValue = getNode(i, j);
      const { isStart, isEnd } = nodeValue.flags;
      const randomFactor = Math.random();
      if (randomFactor > 0.7 && !isStart && !isEnd) {
        wallNodes.push(nodeValue);
      }
    }
  }
  return wallNodes;
};
