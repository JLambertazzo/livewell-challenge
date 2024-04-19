"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UserRole, isUserRole } from "../types";
import { useRouter } from "next/navigation";
import { useUserApi } from "../context/api";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const router = useRouter();
  const { createUser } = useUserApi();

  const handleSubmit = () => {
    createUser({
      role: role ?? UserRole.Doctor,
      username,
      password,
      fullname,
    });
    router.push("/");
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    if (isUserRole(e.target.value)) {
      setRole(e.target.value);
    }
  };

  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack direction="column" spacing={2} justifyContent="center">
        <Typography variant="h4" textAlign="center">
          Welcome
        </Typography>
        <TextField
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="role-select-label">I am a...</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value={UserRole.Doctor}>Doctor</MenuItem>
            <MenuItem value={UserRole.Patient}>Patient</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!username || !password || !role}
        >
          Sign Up
        </Button>
        <Typography variant="caption" textAlign="center">
          Already have an account? <Link href="/login">Log in here</Link>
        </Typography>
      </Stack>
    </main>
  );
}
