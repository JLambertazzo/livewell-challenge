import {
  Drawer,
  Button,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { SidebarProps } from "../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserId } from "@/app/types/user";
import useAuth from "@/app/context/user";

export default function Sidebar(props: SidebarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const menuItemSelect = (id: UserId) => () => {
    props.addPartner(id);
    setAnchorEl(null);
  };
  const newPartners = props.availablePartners.filter(
    (available) => !props.activePartners.includes(available)
  );

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

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
      <Button variant="outlined" onClick={logout} sx={{ marginTop: "auto" }}>
        Logout
      </Button>
    </Drawer>
  );
}
