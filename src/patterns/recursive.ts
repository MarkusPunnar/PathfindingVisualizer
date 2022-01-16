import { NUM_OF_NODES, NUM_OF_ROWS } from "../state/constants";
import { Node, GetNodeFunction } from "../types";

enum CutDirection {
  HORIZONTAL = 0,
  VERTICAL,
}

enum WallDirection {
  S = 1,
  E,
}

export const getRecursiveDivisionWallNodes = (
  getNode: GetNodeFunction
): Node[] => {
  let wallNodes: Node[] = [];
  wallNodes = [...wallNodes, ...getOuterWallNodes(getNode)];
  const halfResolutionGrid: number[][] = Array.apply(
    null,
    Array((NUM_OF_ROWS + 1) / 2)
  ).map(() => {
    return Array.apply(null, Array((NUM_OF_NODES + 1) / 2)).map(() => {
      return 0;
    });
  });
  divideBox(
    0,
    0,
    (NUM_OF_NODES + 1) / 2,
    (NUM_OF_ROWS + 1) / 2,
    halfResolutionGrid
  );
  halfResolutionGrid.forEach((row, x) => {
    row.forEach((rowElem, y) => {
      wallNodes.push(getNode(2 * x, 2 * y));
      if ((rowElem & WallDirection.S) !== 0) {
        wallNodes.push(getNode(2 * (x + 1), 2 * y + 1));
      }
      if ((rowElem & WallDirection.E) !== 0) {
        wallNodes.push(getNode(2 * x + 1, 2 * (y + 1)));
      }
    });
  });
  return wallNodes;
};

const divideBox = (
  x: number,
  y: number,
  width: number,
  height: number,
  halfResolutionGrid: number[][]
) => {
  if (width <= 2 || height <= 2) {
    return;
  }
  const direction = chooseDirection(width, height);
  const isHorizontal = direction === CutDirection.HORIZONTAL;
  //Choose where to draw the wall from
  let wallX = x + (isHorizontal ? 0 : getRandomInt(width - 2));
  let wallY = y + (isHorizontal ? getRandomInt(height - 2) : 0);

  //Choose where the hole in the wall is
  const holeX = wallX + (isHorizontal ? getRandomInt(width) : 0);
  const holeY = wallY + (isHorizontal ? 0 : getRandomInt(height));

  //Helper values
  const dx = isHorizontal ? 1 : 0;
  const dy = isHorizontal ? 0 : 1;
  const wallLength = isHorizontal ? width : height;
  const wallDirection = isHorizontal ? WallDirection.S : WallDirection.E;
  //Draw walls
  for (let i = 0; i < wallLength; i++) {
    if (wallY !== holeY || wallX !== holeX) {
      halfResolutionGrid[wallY][wallX] |= wallDirection;
    }
    wallX += dx;
    wallY += dy;
  }
  //Recursion
  if (isHorizontal) {
    divideBox(x, y, width, wallY - y + 1, halfResolutionGrid);
    divideBox(x, wallY + 1, width, y + height - wallY - 1, halfResolutionGrid);
  } else {
    divideBox(x, y, wallX - x + 1, height, halfResolutionGrid);
    divideBox(wallX + 1, y, x + width - wallX - 1, height, halfResolutionGrid);
  }
};

const chooseDirection = (width: number, height: number): CutDirection => {
  if (width <= height) {
    return CutDirection.HORIZONTAL;
  }
  return CutDirection.VERTICAL;
};

const getRandomInt = (maxExclusive: number) => {
  return Math.floor(Math.random() * maxExclusive);
};

const getOuterWallNodes = (getNode: GetNodeFunction): Node[] => {
  const outerRows = [0, NUM_OF_ROWS - 1];
  const outerColumns = [0, NUM_OF_NODES - 1];
  const outerWallNodes: Node[] = [];
  for (const rowIdx in outerRows) {
    const row = outerRows[rowIdx];
    for (let i = 0; i < NUM_OF_NODES; i++) {
      outerWallNodes.push(getNode(row, i));
    }
  }
  for (const columnIdx in outerColumns) {
    const column = outerColumns[columnIdx];
    for (let i = 0; i < NUM_OF_ROWS; i++) {
      outerWallNodes.push(getNode(i, column));
    }
  }
  return outerWallNodes;
};
