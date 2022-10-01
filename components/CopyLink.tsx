import type { NextComponentType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

const CopyLink: NextComponentType = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex gap-3 items-center justify-center">
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        size="small"
        inputProps={{ readOnly: true }}
        value={window.location.href}
        onClick={copyLink}
      />
      <Button onClick={copyLink}>{copied ? "Copied!" : "Copy Link"}</Button>
    </div>
  );
};

export default CopyLink;
