import Heap from "heap-js";
import { NUM_OF_NODES } from "../state/constants";
import { AStarProps, NodePosition, Node } from "../types";
import { getIndex, isEndNode, getNeighbours } from "./common";

const nodeFComparator = (a: Node, b: Node) => {
  const aProps = a.props as AStarProps;
  const bProps = b.props as AStarProps;
  if (aProps.f === Infinity && bProps.f === Infinity) {
    return 0;
  }
  const fDifference = aProps.f - bProps.f;
  if (fDifference !== 0) {
    return fDifference;
  }
  return a.position.column - b.position.column;
};

export const aStar = (
  grid: Node[],
  startPosition: NodePosition,
  endPosition: NodePosition
): Node[] => {
  const visitedNodes: Node[] = [];
  const seenIndices = new Set<number>();
  if (!grid || startPosition === endPosition) {
    return visitedNodes;
  }
  const startNode =
    grid[startPosition.row * NUM_OF_NODES + startPosition.column];
  const discoveredNodes = new Heap(nodeFComparator);
  discoveredNodes.push(startNode);
  grid.forEach((node) => (node.props = { f: Infinity, g: Infinity }));
  setGScore(startNode, 0);
  setFScore(startNode, manhattanDistance(startNode, endPosition));
  while (!discoveredNodes.isEmpty()) {
    const currentNode = discoveredNodes.pop();
    if (!currentNode) {
      break;
    }
    if (!currentNode || isEndNode(currentNode, endPosition)) {
      visitedNodes.push(currentNode);
      break;
    }
    if (currentNode.flags.isWall) {
      continue;
    }
    const currentProps = currentNode.props as AStarProps;
    const index = getIndex(currentNode);
    if (!seenIndices.has(index)) {
      seenIndices.add(index);
      const neighbours = getNeighbours(grid, index);
      neighbours.forEach((neighbour) => {
        const newScore = currentProps.g + 1;
        if (newScore < getGScore(neighbour)) {
          neighbour.parent = currentNode;
          setGScore(neighbour, newScore);
          setFScore(
            neighbour,
            newScore + manhattanDistance(neighbour, endPosition)
          );
          discoveredNodes.add(neighbour);
        }
      });
    }
    visitedNodes.push(currentNode);
  }
  return visitedNodes;
};

const manhattanDistance = (a: Node, endPosition: NodePosition): number => {
  const { row, column } = a.position;
  return (
    Math.abs(row - endPosition.row) + Math.abs(column - endPosition.column)
  );
};

const getGScore = (node: Node): number => {
  const props = node.props as AStarProps;
  return props.g;
};

const setGScore = (node: Node, value: number) => {
  const props = node.props as AStarProps;
  props.g = value;
};

const setFScore = (node: Node, value: number) => {
  const props = node.props as AStarProps;
  props.f = value;
};
