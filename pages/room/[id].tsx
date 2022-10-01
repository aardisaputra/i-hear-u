import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Icon } from "@iconify/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import {
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import CopyLink from "../../components/CopyLink";
import { Button, IconButton } from "@mui/material";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id, user } = router.query;
  const [data, setData] = useState<DocumentData | null | undefined>(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (typeof id !== "string" || id === undefined) {
      return;
    }
    if (typeof user !== "string" || user === undefined) {
      router.push("/auth?redirect=" + window.location.href.split("?")[0]);
    }
    onSnapshot(doc(db, "game", String(id)), (doc) => {
      const data = doc.data();
      console.log("data: ", data);
      setData(data);
      if (data) {
        setUsers(Object.fromEntries(Object.entries(data!.users).sort()));
        console.log(
          "data: ",
          Object.fromEntries(Object.entries(data!.users).sort())
        );
      }
    });
  }, [id]);

  const toggleReady = () => {
    if (!user) return;
    const updatedUser = { ...users[user], ready: !users[user].ready };

    setDoc(
      doc(db, "game", String(id)),
      { ...data, users: { ...users, [user]: updatedUser } },
      { merge: true }
    );
  };
  return data !== null ? (
    <div className={styles.container}>
      <Head>
        <title>iHearU</title>
        <meta name="description" content="MIT Hacks 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CopyLink />
        <h1 className="text-3xl m-3">Participants</h1>
        <div className="flex flex-col gap-3 m-2 items-center">
          {Object.entries(users).map(([id, u]) => {
            return (
              <div key={id}>
                {u.name}
                {user === id ? " (You)" : ""}
                {u.ready ? " ✅" : ""}
              </div>
            );
          })}
        </div>
        <Button onClick={toggleReady}>I&apos;m ready!</Button>
      </main>
    </div>
  ) : (
    <></>
  );
};

export default GamePage;
