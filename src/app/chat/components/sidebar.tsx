import { Drawer, Button, Typography, Divider } from "@mui/material";
import { useState } from "react";

export default function Sidebar() {
  return (
    <Drawer variant={"permanent"}>
      <Typography variant="h3" textAlign={"center"} sx={{ p: 2 }}>
        Livewell
        <br />
        Demo
      </Typography>
      <Divider />
      {/* chats go here */}
      <Button
        variant="outlined"
        sx={{ borderRadius: 0, p: 2, borderStyle: "dashed" }}
      >
        + Add New Chat
      </Button>
    </Drawer>
  );
}
