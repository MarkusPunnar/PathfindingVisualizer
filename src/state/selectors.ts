import { selectorFamily } from "recoil";
import { nodeAtom } from "./atoms";

const WALL_CLASS = " wall";
const VISITED_CLASS = " visited";
const PATH_CLASS = " path";
const ANIMATION_CLASS = " node-animation";
const WEIGHT_CLASS = " weight-node";

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
      classes += weight > 1 ? WEIGHT_CLASS : "";
      classes += isWall || isVisited || weight > 1 ? ANIMATION_CLASS : "";
      return classes;
    },
});
