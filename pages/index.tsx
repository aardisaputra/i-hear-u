import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Router from "next/router";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase/clientApp";
const createRoom = async () => {
  // const docRef = await addDoc(collection(db, "game"), {
  //   users: {},
  //   questions: {},
  //   results: {},
  //   state: 0,
  //   currentQuestion: 0,
  // });
  // Router.push(`/room/${docRef.id}`);

  Router.push("/room/BpR8tiltGitkbHgAP4NT");
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>I Hear U!</h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="15vh"
        >
          <Button size="large" variant="outlined" onClick={createRoom}>
            START
          </Button>
        </Box>
      </main>
    </div>
  );
};

export default Home;
