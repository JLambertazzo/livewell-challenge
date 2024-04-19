"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { UserRole } from "../types";
import { useRouter } from "next/navigation";
import useAuth from "../context/auth";
import { useUserApi } from "../context/api";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();
  const { users } = useUserApi();

  const handleSubmit = () => {
    let success = false;
    const matchingUser = users.find(
      (u) => u.username === username && u.username === password
    );
    if (matchingUser !== undefined) {
      setUser(matchingUser);
      success = true;
    }
    if (success) {
      router.push("/");
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
        <Typography variant="caption" textAlign="center">
          Don&apos;t have an account? <Link href="/signup">Sign up here</Link>
        </Typography>
      </Stack>
    </main>
  );
}
