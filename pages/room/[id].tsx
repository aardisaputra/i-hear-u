import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import { doc, DocumentData, onSnapshot, setDoc } from "firebase/firestore";
import CopyLink from "../../components/CopyLink";
import { Button } from "@mui/material";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id, user } = router.query;
  const [data, setData] = useState<DocumentData | null | undefined>(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (typeof id !== "string" || id === undefined) {
      return;
    }
    if (!window.location.href.includes("user=")) {
      window.location.replace("http://localhost:3001");
    }
    onSnapshot(doc(db, "game", String(id)), (doc) => {
      const data = doc.data();
      setData(data);
      if (data) {
        setUsers(Object.fromEntries(Object.entries(data!.users).sort()));
      }
    });
  }, [id]);

  const toggleReady = () => {
    if (!user) return;
    const updatedUser = { ...users[user], ready: !users[user].ready };
    const updatedUsers = { ...users, [user]: updatedUser };
    if (Object.values(updatedUsers).every((user) => user.ready)) {
      // all players are ready
      setDoc(
        doc(db, "game", String(id)),
        { ...data, users: updatedUsers, state: 1 },
        { merge: true }
      );
      return;
    }
    setDoc(
      doc(db, "game", String(id)),
      { ...data, users: updatedUsers },
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
        {data.state === 0 ? (
          <>
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
          </>
        ) : (
          <>Game Started</>
        )}
      </main>
    </div>
  ) : (
    <></>
  );
};

export default GamePage;
