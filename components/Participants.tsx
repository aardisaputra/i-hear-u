import type { NextComponentType } from "next";
import styles from "../styles/Home.module.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CopyLink from "./CopyLink";
type Props = {
  user: string;
  users: Record<string, string | number | boolean>;
  toggleReady: () => {};
};

const Participants: NextComponentType<Props> = ({
  user,
  users,
  toggleReady,
}) => {
  return (
    <>
      <CopyLink />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      ></Box>
      <h1 className={styles.title}>Participants 🙋‍♀️</h1>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      ></Box>
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

export default Participants;
