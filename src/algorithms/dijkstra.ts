import Heap from "heap-js";
import { NUM_OF_NODES } from "../state/constants";
import { DijkstraProps, Node, NodePosition } from "../types";
import { getIndex, isEndNode, getNeighbours } from "./common";

const nodeDistanceComparator = (a: Node, b: Node) => {
  const aProps = a.props as DijkstraProps;
  const bProps = b.props as DijkstraProps;
  if (aProps.distance === Infinity && bProps.distance === Infinity) {
    return 0;
  }
  const distanceDifference = aProps.distance - bProps.distance;
  if (distanceDifference !== 0) {
    return distanceDifference;
  }
  return a.position.row - b.position.row;
};

export const dijkstra = (
  grid: Node[],
  startPosition: NodePosition,
  endPosition: NodePosition
): Node[] => {
  const visitedNodes: Node[] = [];
  if (!grid || startPosition === endPosition) {
    return visitedNodes;
  }
  grid.forEach((node) => (node.props = { distance: Infinity }));
  //Set start node distance to 0
  setDistance(grid[startPosition.row * NUM_OF_NODES + startPosition.column], 0);
  const priorityQueue = new Heap(nodeDistanceComparator);
  priorityQueue.init(grid);
  const seenIndices = new Set<number>();
  while (!priorityQueue.isEmpty()) {
    const closestNode = priorityQueue.pop();
    if (!closestNode || getDistance(closestNode) === Infinity) {
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
        const newDistance = getDistance(closestNode) + 1;
        if (newDistance < getDistance(neighbour)) {
          const newNeighbour: Node = JSON.parse(JSON.stringify(neighbour));
          setDistance(newNeighbour, newDistance);
          newNeighbour.parent = closestNode;
          priorityQueue.push(newNeighbour);
        }
      });
      visitedNodes.push(closestNode);
    }
  }
  return visitedNodes;
};

const getDistance = (node: Node): number => {
  const props = node.props as DijkstraProps;
  return props.distance;
};

const setDistance = (node: Node, distance: number) => {
  const props = node.props as DijkstraProps;
  props.distance = distance;
};
