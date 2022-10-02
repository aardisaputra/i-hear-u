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
import Participants from "../../components/participants";
import Results from "../../components/results";
import Questions from "../../components/questions";

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id, user } = router.query;
  const [data, setData] = useState<DocumentData | null | undefined>(null);
  const [users, setUsers] = useState({});
  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (typeof id !== "string" || id === undefined) {
      return;
    }
    if (!window.location.href.includes("user=")) {
      window.location.replace(
        "https://us-central1-i-hear-u.cloudfunctions.net/auth"
      );
    }
    onSnapshot(doc(db, "game", String(id)), (doc) => {
      const data = doc.data();
      setData(data);
      if (data) {
        setUsers(Object.fromEntries(Object.entries(data!.users).sort()));
        setQuestions(Object.values(data!.questions));
      }
    });
  }, [id]);

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length() - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const answerCallback = (correct) => {
    if (correct) {
      const updatedUser = { ...users[user], score: users[user].score + 1 };
      const updatedUsers = { ...users, [user]: updatedUser };
      setDoc(
        doc(db, "game", String(id)),
        { ...data, users: updatedUsers },
        { merge: true }
      );
    }
  };

  const toggleReady = () => {
    if (!user) return;
    const updatedUser = { ...users[user], ready: !users[user].ready };
    const updatedUsers = { ...users, [user]: updatedUser };
    if (Object.values(updatedUsers).every((user) => user.ready)) {
      // all players are ready
      const updatedUsers = Object.fromEntries(
        Object.entries(users).map(([key, value]) => {
          return [key, { ...value, ready: false }];
        })
      );
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
          <Participants users={users} user={user} toggleReady={toggleReady} />
        ) : (
          <></>
        )}
        {data.state === 1 ? (
          <Questions
            question={questions ? questions[currentQuestion].question : null}
            answer={questions ? questions[currentQuestion].answer : null}
            users={users}
            answerCallback={answerCallback}
          />
        ) : (
          <></>
        )}
        {data.state === 2 ? <Results /> : <></>}
      </main>
    </div>
  ) : (
    <></>
  );
};

export default GamePage;
