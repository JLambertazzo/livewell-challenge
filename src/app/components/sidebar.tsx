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
import useAuth, { useForceAuth } from "@/app/context/auth";

export default function Sidebar(props: SidebarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { setUser } = useAuth();
  const user = useForceAuth();
  const menuItemSelect = (id: UserId) => () => {
    props.addPartner(id);
    const filter: Pick<Conversation, UserRole.Patient | UserRole.Doctor> =
      user.role === UserRole.Doctor
        ? {
            doctor: user.id,
            patient: id,
          }
        : {
            doctor: id,
            patient: user.id,
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
              user.role === UserRole.Patient
                ? {
                    doctor: partner,
                    patient: user.id,
                  }
                : { doctor: user.id, patient: partner }
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
