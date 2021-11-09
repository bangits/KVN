import { MenuItem } from "@mui/material";
import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { API_URL } from "../configs/";
import { CssTextField } from "./JuryPage";

const JuryScoresPage = ({ jury }) => {
  const [players, setPlayers] = useState([]);

  const [fields, setFields] = useState({
    score: "",
    player: "",
  });

  const onFieldChange = (fieldName) => (e) => {
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (fields.score && fields.player) {
      axios
        .post("/juries/scores", {
          playerId: fields.player,
          juryId: jury._id,
          score: fields.score,
        })
        .then((data) => {
          cogoToast.success("Successfully updated!!");

          axios.get(`/totals/${fields.player}`).then((data) => {
            // eslint-disable-next-line no-undef
            const socket = io(API_URL);

            socket.on("connection", console.log);

            socket.emit("scoreUpdated", {
              playerId: fields.player,
              juryId: jury._id,
              totalScore: data.data.data,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          cogoToast.error("Something goes wrong!!");
        });
    }
  };

  useEffect(() => {
    axios.get("/players").then((players) => {
      setPlayers(players.data.data);
    });
  }, []);

  return (
    <>
      <section className="section-1" id="section-1">
        <main>
          <div className="text-container">
            <h3>KVN SHOW!!!</h3>
            <p>
              Welcome {jury.name}! Choose the players from list bellow and rate
              score!
            </p>

            <CssTextField
              margin="normal"
              label="Players"
              variant="outlined"
              size="small"
              select
              onChange={onFieldChange("player")}
            >
              {players.map((player) => (
                <MenuItem value={player._id}>{player.name}</MenuItem>
              ))}
            </CssTextField>

            <CssTextField
              margin="normal"
              label="Scores"
              variant="outlined"
              size="small"
              select
              onChange={onFieldChange("score")}
            >
              {new Array(5).fill(null).map((_, idx) => (
                <MenuItem value={idx + 1}>{idx + 1}</MenuItem>
              ))}
            </CssTextField>

            <img src="https://bangits.com/img/logo.svg" className="logo" />
          </div>
          <form>
            <div className="quiz-options jury-login"></div>
            <a id="btn" type="submit" onClick={onSubmit}>
              Update score
            </a>
          </form>
        </main>
      </section>
    </>
  );
};

export default JuryScoresPage;
