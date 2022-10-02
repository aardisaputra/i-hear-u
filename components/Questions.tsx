import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Router from "next/router";
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';


const createRoom = () => {
  Router.push("/room/123");
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>I Hear U</title>
        <meta name="description" content="MIT Hacks 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Who loves this song the most? 🤔</h1>
        <h2> One Republic - Counting Stars</h2>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="12vh"
        >
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Button size="large" variant="outlined" className="text-4xl w-full">
                Austin
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="large" variant="outlined" className="text-4xl w-full">
                Austin
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="large" variant="outlined" className="text-4xl w-full">
                Austin
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="large" variant="outlined" className="text-4xl w-full">
                Austin
              </Button>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Home;
