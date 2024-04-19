import {
  Drawer,
  Button,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { Conversation, SidebarProps, UserId, UserRole } from "../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth, { useForceAuth } from "@/app/context/auth";
import LogoutIcon from "@mui/icons-material/Logout";

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
    (available) => !props.activePartners.some((p) => p.id === available.id)
  );

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  const getHonorific = (role: UserRole) =>
    role === UserRole.Doctor ? "Dr. " : "";

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: "15vw",
        "& .MuiDrawer-paper": {
          width: "15vw",
          boxSizing: "border-box",
        },
      }}
    >
      <Typography
        variant="h3"
        textAlign={"center"}
        sx={{ p: 2 }}
        fontFamily="serif"
      >
        Livewell
        <br />
        Demo
      </Typography>
      <Divider />
      {props.activePartners.map((partner) => (
        <Button
          key={partner.id}
          variant={partner.id === props.activePartner ? "outlined" : "text"}
          onClick={() =>
            props.selectConversation(
              user.role === UserRole.Patient
                ? {
                    doctor: partner.id,
                    patient: user.id,
                  }
                : { doctor: user.id, patient: partner.id }
            )
          }
          sx={{ p: 2 }}
        >
          {getHonorific(partner.role)}
          {partner.fullname}
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
            <MenuItem onClick={menuItemSelect(partner.id)} key={partner.id}>
              {getHonorific(partner.role)}
              {partner.fullname}
            </MenuItem>
          ))}
        </Menu>
      )}
      <Button
        variant="outlined"
        onClick={logout}
        sx={{ marginTop: "auto", py: 1 }}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Drawer>
  );
}
