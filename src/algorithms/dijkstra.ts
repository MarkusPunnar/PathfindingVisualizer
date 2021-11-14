import Heap from "heap-js";
import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";
import { Node, NodePosition } from "../types";
import { getIndex, isEndNode } from "./common";

const nodeDistanceComparator = (a: Node, b: Node) => a.distance - b.distance;

export const dijkstra = (
  grid: Node[],
  startPosition: NodePosition,
  endPosition: NodePosition
): Node[] => {
  const visitedNodes: Node[] = [];
  if (!grid || startPosition === endPosition) {
    return visitedNodes;
  }
  //Set start node distance to 0
  grid[startPosition.row * NUM_OF_NODES + startPosition.column].distance = 0;
  const priorityQueue = new Heap(nodeDistanceComparator);
  priorityQueue.init(grid);
  const seenIndices = new Set<number>();
  while (!priorityQueue.isEmpty()) {
    const closestNode = priorityQueue.pop();
    if (!closestNode || closestNode.distance === Infinity) {
      break;
    }
    if (isEndNode(closestNode, endPosition)) {
      visitedNodes.push(closestNode);
      break;
    }
    if (closestNode.flags.isWall) {
      continue;
    }
    const index = getIndex(closestNode);
    if (!seenIndices.has(index)) {
      seenIndices.add(index);
      const neighbours = getNeighbours(grid, index);
      neighbours.forEach((neighbour) => {
        const newDistance = closestNode.distance + 1;
        if (newDistance < neighbour.distance) {
          const newNeighbour: Node = JSON.parse(JSON.stringify(neighbour));
          newNeighbour.distance = newDistance;
          newNeighbour.parent = closestNode;
          priorityQueue.push(newNeighbour);
        }
      });
      visitedNodes.push(closestNode);
    }
  }
  return visitedNodes;
};

const getNeighbours = (grid: Node[], index: number): Node[] => {
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
