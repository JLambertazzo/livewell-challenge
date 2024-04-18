import { Box, Typography, Button, Grid, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatboxProps, Message } from "../types";
import { useState } from "react";
import { UserRole } from "@/app/types/user";

type MessageItemProps = {
  message: Message;
  userId: string;
};

function MessageItem(props: MessageItemProps) {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          textAlign:
            props.message.sender === UserRole.Doctor ? "left" : "right",
        }}
      >
        {props.message.body}
      </Typography>
    </Box>
  );
}

export default function Chatbox(props: ChatboxProps) {
  const [input, setInput] = useState("");

  function submitInput() {
    props.addMessage({ sender: UserRole.Patient, body: input });
    setInput("");
  }

  return (
    <Stack
      direction="column-reverse"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        marginLeft: "15vw",
        width: "82vw",
        height: "95%",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          border: "black solid 1px",
          p: 2,
        }}
      >
        <Grid item xs={11} spacing={2}>
          <TextField
            sx={{ width: "100%" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ transform: "translateX(-50%)", marginLeft: "50%" }}
            onClick={submitInput}
          >
            Send
          </Button>
        </Grid>
      </Grid>
      <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
        {props.messages.map((msg) => (
          <MessageItem key={msg.body} message={msg} userId={props.userId} />
        ))}
      </Stack>
      <Typography variant="h4">Chat with Name</Typography>
      <Box sx={{ borderRadius: "50%" }}>D1</Box>
    </Stack>
  );
}
