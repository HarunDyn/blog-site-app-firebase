import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Stack
      sx={{
        height: "100vh",
        color: "grey.500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
