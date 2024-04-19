import { Box, Typography, Button, Grid, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatboxProps, Message } from "../types";
import { useState } from "react";
import { useForceAuth } from "../context/auth";
import { UserRole } from "../types/user";

type MessageItemProps = {
  message: Message;
  userId: string;
};

function MessageItem(props: MessageItemProps) {
  const user = useForceAuth();
  const sentByUser = user.role === props.message.sender;
  const justifyContent = sentByUser ? "flex-end" : "flex-start";
  const background = sentByUser ? "lightblue" : "lightgray";
  const bottomBorderRadius = sentByUser ? "0px 20px" : "20px 0px";
  return (
    <Stack justifyContent={justifyContent} direction="row">
      <Typography
        variant="body1"
        sx={{
          background: background,
          width: "max-content",
          py: 0.5,
          px: 2,
          borderRadius: `20px 20px ${bottomBorderRadius}`,
          ml: sentByUser ? 2 : 1,
          mr: sentByUser ? 1 : 2,
        }}
      >
        {props.message.body}
      </Typography>
    </Stack>
  );
}

export default function Chatbox(props: ChatboxProps) {
  const [input, setInput] = useState("");
  const user = useForceAuth();

  function submitInput() {
    if (input === "") {
      return;
    }
    props.addMessage({ sender: user.role, body: input });
    setInput("");
  }

  return (
    Boolean(props.partner) && (
      <Stack
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          marginLeft: "14vw",
          width: "86vw",
          height: "100%",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            borderTop: "#dddddd solid 1px",
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
              sx={{
                transform: "translateX(-50%)",
                marginLeft: "50%",
                height: "100%",
              }}
              onClick={submitInput}
            >
              Send
            </Button>
          </Grid>
        </Grid>
        <Stack
          direction="column-reverse"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: "100%",
            overflowY: "scroll",
            mb: 2,
          }}
        >
          <Stack spacing={2} direction="column" sx={{ width: "90%", px: 2 }}>
            {props.messages.map((msg, i) => (
              <MessageItem
                key={`${i}-${msg}`}
                message={msg}
                userId={props.userId}
              />
            ))}
          </Stack>
          <Typography variant="h4" sx={{ mb: 8 }}>
            Chat with {props.partner?.role === UserRole.Doctor ? "Dr. " : ""}
            {props.partner?.username}
          </Typography>
          <Box
            sx={{
              borderRadius: "50%",
              background: "#DDDDDD",
              p: 4,
              fontSize: "xx-large",
              mb: 2,
            }}
          >
            {props.partner?.username.split(" ").map((el) => el.at(0))}
          </Box>
        </Stack>
      </Stack>
    )
  );
}
