import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import JuryScoresPage from "./JuryScoresPage";

export const CssTextField = styled(TextField)({
  "&": {
    width: "70%",
  },
  "& label.Mui-focused, & label, & input, & .MuiInputBase-input, & svg": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#085769",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
});

const JuryPage = () => {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [jury, setJury] = useState(null);

  const onFieldChange = (fieldName) => (e) => {
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (fields.username.trim() && fields.password.trim()) {
      axios
        .post("/juries/login", fields)
        .then((data) => {
          setJury(data.data.data);
        })
        .catch(() => {
          cogoToast.error("Invalid credentials!!");
        });
    }
  };

  if (jury) return <JuryScoresPage jury={jury} />;

  return (
    <section className="section-1" id="section-1">
      <main>
        <div className="text-container">
          <h3>KVN SHOW!!!</h3>
          <p>Welcome best jury! Sign in to continue</p>

          <img src="https://bangits.com/img/logo.svg" className="logo" />
        </div>
        <form>
          <div className="quiz-options jury-login">
            <CssTextField
              margin="normal"
              label="Username"
              variant="outlined"
              size="small"
              onChange={onFieldChange("username")}
            />
            <CssTextField
              margin="normal"
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              onChange={onFieldChange("password")}
            />
          </div>
          <a id="btn" type="submit" onClick={onSubmit}>
            Sign in
          </a>
        </form>
      </main>
    </section>
  );
};

export default JuryPage;
