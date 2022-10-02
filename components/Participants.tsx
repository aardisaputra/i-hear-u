import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, ClassNames, EmotionCache } from "@emotion/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Router from "next/router";
import CopyLink from "./CopyLink";
import { userAgent } from "next/server";

const Home: NextPage = ({ user, users, toggleReady }) => {
  return (
    <>
      <h1 className={styles.title}>Participants 🙋‍♀️</h1>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      ></Box>
      <CopyLink />
      <div className="flex flex-col gap-3 m-2 items-center">
        {Object.entries(users).map(([id, u]) => {
          return (
            <div
              className={`${!u.ready ? "text-white" : "text-gray-400 italic"}`}
              key={id}
            >
              {u.name}
              {user === id ? " (You)" : ""}
              {u.ready ? " ✅" : ""}
            </div>
          );
        })}
      </div>
      <Button onClick={toggleReady}>I&apos;m ready!</Button>
    </>
  );
};

export default Home;
