import {
  Drawer,
  Button,
  Typography,
  Divider,
  Menu,
  MenuItem,
  unstable_useEnhancedEffect,
} from "@mui/material";
import { SidebarProps, UserId } from "../types";
import { useEffect, useState } from "react";

export default function Sidebar(props: SidebarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuItemSelect = (id: UserId) => () => {
    props.addPartner(id);
    setAnchorEl(null);
  };
  const newPartners = props.availablePartners.filter(
    (available) => !props.activePartners.includes(available)
  );

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
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        + Add New Chat
      </Button>
      {newPartners.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {newPartners.map((partner) => (
            <MenuItem onClick={menuItemSelect(partner)} key={partner}>
              {partner}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Drawer>
  );
}
