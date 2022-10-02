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
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../firebase/clientApp";
import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const Results: NextPage = ({ id }) => {
  const [data, setData] = useState<DocumentData | null | undefined>(null);
  const [rankings, setRankings] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "game", String(id)), (doc) => {
      const data = doc.data();
      setData(data);
      if (data) {
        setRankings(
          Object.values(data!.users).sort(
            (user1, user2) => user2.score - user1.score
          )
        );
        setTopArtists(Object.values(data!.results.artists));
        setTopSongs(Object.values(data!.results.songs));
      }
    });
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game Finished! Congrats 🎉</h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="8vh"
        ></Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ranking</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.map((row, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ordinal_suffix_of(id + 1)}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="8vh"
        ></Box>
        <h1 className={styles.title}>Top 3 Songs for you 🎶</h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="8vh"
        ></Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ranking</TableCell>
                <TableCell>Song</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topSongs.map((song, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ordinal_suffix_of(id + 1)}
                  </TableCell>
                  <TableCell>{song}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="8vh"
        ></Box>
        <h1 className={styles.title}>3 Fav Artists from y'all 🎸</h1>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="8vh"
        ></Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ranking</TableCell>
                <TableCell>Artist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topArtists.map((artist, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ordinal_suffix_of(id + 1)}
                  </TableCell>
                  <TableCell>{artist}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Results;
