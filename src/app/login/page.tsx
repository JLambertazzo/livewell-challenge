"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { setUser } from "../context/user";
import { UserRole } from "../types/user";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    let success = false;
    if (username === "doctor" && password === "doctor") {
      setUser({
        id: "654-321",
        role: UserRole.Doctor,
      });
      success = true;
    } else if (username === "patient" && password === "patient") {
      setUser({
        id: "123-456",
        role: UserRole.Patient,
      });
      success = true;
    }
    console.log("succ", success);
    if (success) {
      router.push("/chat");
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
          Welcome Back
        </Typography>
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
        <Button variant="contained" onClick={handleSubmit}>
          Log In
        </Button>
        <Typography variant="caption" textAlign="center">
          Demo user? Try: <br />
          user=doctor pass=doctor <br />
          or user=patient pass=patient
        </Typography>
      </Stack>
    </main>
  );
}