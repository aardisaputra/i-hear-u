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
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  rank: string,
  name: string,
  qs: number,
  score: number,
) {
  return {rank, name, qs, score};
}

const rows = [
  createData('1st Place', "Austin", 6.0, 24),
  createData('2nd Place', "Andrew", 9.0, 37),
  createData('3rd Place', "Jay", 16.0, 24),
  createData('4th Place', "Jo", 3.7, 67),
  createData('5th Place', "Funny", 16.0, 49),
];

// export default function BasicTable() {
//   return (
    
//   );
// }

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Congrats!</h1>
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
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Stats</TableCell>
                <TableCell align="right">Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.rank}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.qs}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Home;
