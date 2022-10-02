import type { NextComponentType, NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

type Props = {
  items: { question: string; answer: string; preview: string; img: string };
  users: Record<string, string | number | boolean>;
  answerCallback: (correct: boolean) => void;
};
const Questions: NextComponentType<Props> = ({
  item: { question, answer, preview, img },
  users,
  answerCallback,
}) => {
  const [answered, setAnswered] = useState("");
  useEffect(() => setAnswered(""), [question]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Who loves this song the most? 🤔</h1>
        <p className="text-2xl">{question}</p>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5vh"
        ></Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="12vh"
        >
          <Image width="150px" height="150px" src={img} alt="cover_img" />
          <audio controls autoPlay key={preview}>
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
        ></Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            {answered && (
              <>
                <Grid item xs={6}>
                  <span>The correct answer is: </span>
                  <Button
                    size="large"
                    variant="outlined"
                    className="text-4xl w-full"
                  >
                    {answer} ✅
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <span>You answered: </span>
                  <Button
                    size="large"
                    variant="outlined"
                    className="text-4xl w-full"
                  >
                    {answered} {answer === answered ? "✅" : "❌"}
                  </Button>
                </Grid>
              </>
            )}
            {!answered &&
              Object.entries(users).map(([id, u]) => (
                <Grid item xs={6} key={id}>
                  <Button
                    size="large"
                    variant="outlined"
                    className="text-4xl w-full"
                    onClick={() => {
                      answerCallback(u.name === answer);
                      setAnswered(u.name);
                    }}
                    disabled={!!answered}
                  >
                    {u.name}
                    {!!answered ? (u.name === answer ? "✅" : "❌") : ""}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Box>
        {answered && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minHeight="12vh"
          >
            <h3>Leaderboard</h3>
            {Object.entries(users)
              .sort(
                ([key1, value1], [key2, value2]) => value2.score - value1.score
              )
              .map(([key, value]) => {
                return (
                  <p key={key}>
                    {value.name} - {value.score}
                  </p>
                );
              })}
          </Box>
        )}
      </main>
    </div>
  );
};

export default Questions;
