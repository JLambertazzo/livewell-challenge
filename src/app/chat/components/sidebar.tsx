import { Drawer, Button, Typography, Divider } from "@mui/material";
import { SidebarProps } from "../types";

export default function Sidebar(props: SidebarProps) {
  return (
    <Drawer variant={"permanent"} sx={{ width: "15vw" }}>
      <Typography variant="h3" textAlign={"center"} sx={{ p: 2 }}>
        Livewell
        <br />
        Demo
      </Typography>
      <Divider />
      {props.activePartners.map((partner) => (
        <Button
          key={partner}
          variant={partner === props.activePartner ? "outlined" : "text"}
          onClick={() =>
            props.selectConversation({ doctor: partner, patient: "0-0" })
          }
        >
          {partner}
        </Button>
      ))}
      <Button
        variant="outlined"
        sx={{ borderRadius: 0, p: 2, borderStyle: "dashed" }}
      >
        + Add New Chat
      </Button>
    </Drawer>
  );
}
