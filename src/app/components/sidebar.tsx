import {
  Drawer,
  Button,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { Conversation, SidebarProps } from "../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserId, UserRole } from "@/app/types/user";
import useAuth from "@/app/context/user";

export default function Sidebar(props: SidebarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const menuItemSelect = (id: UserId) => () => {
    props.addPartner(id);
    const filter: Pick<Conversation, "patient" | "doctor"> =
      user?.role === UserRole.Doctor
        ? {
            doctor: user?.id ?? "0-0",
            patient: id,
          }
        : {
            doctor: id,
            patient: user?.id ?? "0-0",
          };
    props.selectConversation(filter);
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
            props.selectConversation(
              user?.role === UserRole.Patient
                ? {
                    doctor: partner,
                    patient: user?.id ?? "0-0",
                  }
                : { doctor: user?.id ?? "0-0", patient: partner }
            )
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
