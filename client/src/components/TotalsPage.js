import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../configs";

const TotalsPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("/totals").then((totals) => {
      setRows(totals.data.data);
    });

    // eslint-disable-next-line no-undef
    const socket = io(API_URL);

    socket.on("scoreUpdated", (data) => {
      setRows((rows) =>
        rows.map((row) => {
          if (row.playerInfo._id !== data.playerId) return row;

          return {
            ...row,
            totalScore: data.totalScore,
          };
        })
      );
    });
  }, []);

  return (
    <section className="section-1 totals-section" id="section-1">
      <main className="total-page">
        <div className="text-container">
          <h3>KVN SHOW!!!</h3>
          <p>
            The results <small>(page will automatically updated)</small>
          </p>

          <img src="https://bangits.com/img/logo.svg" className="logo" />
        </div>
        <Table aria-label="simple table" className="total-page__table">
          <TableHead>
            <TableRow>
              <TableCell>Player image</TableCell>
              <TableCell>Player name</TableCell>
              <TableCell align="right">Total score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.playerInfo.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.playerInfo.image}
                    style={{ width: 60, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.playerInfo.name}
                </TableCell>
                <TableCell align="right">{row.totalScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </section>
  );
};

export default TotalsPage;
