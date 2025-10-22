import React from "react";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ReloadButton({ onReload }) {
  return (
    <IconButton onClick={onReload} sx={{ alignSelf: "center" }}>
      <RefreshIcon />
    </IconButton>
  );
}