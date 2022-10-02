import type { NextComponentType } from "next";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const CopyLink: NextComponentType = () => {
  const link = window.location.href.split("?")[0];
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex gap-3 items-center justify-center">
      <TextField
        variant="outlined"
        size="small"
        inputProps={{ readOnly: true }}
        value={link}
        onClick={copyLink}
      />
      <Button onClick={copyLink}>{copied ? "Copied!" : "Copy Link"}</Button>
    </div>
  );
};

export default CopyLink;
