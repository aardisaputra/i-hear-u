import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof id !== "string" || id === undefined) {
      return;
    }
    const fetchData = async () => {
      console.log("id", String(id));
      const docRef = doc(db, "game", String(id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoaded(true);
      } else {
        console.log("not exist");
        router.push("/");
      }
    };
    fetchData();
  }, [id]);

  return loaded ? (
    <div className={styles.container}>
      <Head>
        <title>{id}</title>
        <meta name="description" content="MIT Hacks 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>I {id} U!</h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="15vh"
        ></Box>
      </main>
    </div>
  ) : (
    <></>
  );
};

export default GamePage;
