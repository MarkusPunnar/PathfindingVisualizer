import { selectorFamily } from "recoil";
import { nodeAtom } from "./atoms";

const WALL_CLASS = " wall";
const VISITED_CLASS = " visited";
const PATH_CLASS = " path";

export const nodeClassesSelector = selectorFamily<string, number[]>({
  key: "nodeClasses",
  get:
    ([row, column]) =>
    ({ get }) => {
      const { isWall, isVisited, isPath } = get(nodeAtom([row, column])).flags;
      let classes = "node";
      classes += isWall ? WALL_CLASS : "";
      classes += isVisited ? VISITED_CLASS : "";
      classes += isPath ? PATH_CLASS : "";
      return classes;
    },
});
