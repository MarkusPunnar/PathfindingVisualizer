import { selectorFamily } from "recoil";
import { nodeAtom } from "./atoms";

const WALL_CLASS = " wall";
const VISITED_CLASS = " visited";
const PATH_CLASS = " path";
const ANIMATION_CLASS = " node-animation";

export const nodeClassesSelector = selectorFamily<string, number[]>({
  key: "nodeClasses",
  get:
    ([row, column]) =>
    ({ get }) => {
      const node = get(nodeAtom([row, column]));
      const { isWall, isVisited, isPath } = node.flags;
      const { weight } = node.weightProps;
      let classes = "node";
      classes += isWall ? WALL_CLASS : "";
      classes += isVisited ? VISITED_CLASS : "";
      classes += isPath ? PATH_CLASS : "";
      classes += isWall || isVisited || weight > 1 ? ANIMATION_CLASS : "";
      return classes;
    },
});
