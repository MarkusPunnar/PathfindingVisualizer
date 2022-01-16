import React from "react";
import { WeightNode } from "../../types";
import WeightNodeRow from "./WeightNodeRow";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedWeightNodeAtom, weightNodesAtom } from "../../state/atoms";

const WeightNodeSelection = () => {
  const weightNodes = useRecoilValue(weightNodesAtom);
  const [selectedWeightNode, setSelectedWeightNode] = useRecoilState(
    selectedWeightNodeAtom
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = (event.target as HTMLInputElement).value;
    const newWeightNode = weightNodes.find((weightNode) => {
      return weightNode.color === color;
    });
    if (newWeightNode) {
      setSelectedWeightNode(newWeightNode);
    }
  };
  return (
    <FormControl sx={{ flex: "2", ml: 2 }}>
      <FormLabel sx={{ color: "black", fontWeight: "bold", mt: 1 }}>
        Weight nodes
      </FormLabel>
      <RadioGroup value={selectedWeightNode.color} onChange={handleChange}>
        {[...weightNodes]
          .sort((a, b) => a.weight - b.weight)
          .map((weightNode: WeightNode, i) => {
            return (
              <WeightNodeRow
                key={i}
                weight={weightNode.weight}
                color={weightNode.color}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default WeightNodeSelection;
