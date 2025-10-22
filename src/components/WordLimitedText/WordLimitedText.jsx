import { Typography } from "@mui/material";

export default function WordLimitedText({ text, wordLimit = 20 }) {
  const words = text?.split(" ");
  const limitedText =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;

  return (
    <Typography variant="body1">
      {limitedText}
    </Typography>
  );
}