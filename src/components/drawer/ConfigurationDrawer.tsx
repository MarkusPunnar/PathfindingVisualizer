import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/Divider";
import SpeedSelection from "./SpeedSelection";
import WeightNodeSelection from "./WeightNodeSelection";
import DrawingModeSelection from "./DrawingModeSelection";
import WeightNodeForm from "./WeightNodeForm";

const ConfigurationDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => (event: React.MouseEvent) => {
    if (event.type === "keydown") {
      return;
    }
    setOpen(newOpen);
  };
  return (
    <div>
      <React.Fragment key={"configurationDrawer"}>
        <IconButton onClick={toggleDrawer(true)}>
          <GiHamburgerMenu />
        </IconButton>
        <Drawer
          anchor={"right"}
          open={open}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: "20vw",
              display: "flex",
              backgroundImage: "linear-gradient(lightgray, white, lightgray)",
              flexDirection: "column",
            },
          }}
        >
          <DrawingModeSelection />
          <Divider />
          <WeightNodeSelection />
          <Divider />
          <WeightNodeForm />
          <Divider />

          <SpeedSelection />
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ConfigurationDrawer;
