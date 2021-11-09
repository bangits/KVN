import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const ChoicePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (!selectedRole) return;

    if (selectedRole === "jury")
      cogoToast.success("Right choice!! Click next and give terrible grades");
    else cogoToast.warn("Unfortunately you are not a jury :(");
  }, [selectedRole]);

  return (
    <>
      <section className="section-1" id="section-1">
        <main>
          <div className="text-container">
            <h3>KVN SHOW!!!</h3>
            <p>Choose your role and we will start!</p>

            <img src="https://bangits.com/img/logo.svg" className="logo" />
          </div>
          <form>
            <div className="quiz-options">
              <input
                type="radio"
                className="input-radio one-a jshdgdgwgdwfdfwdwjfdjwwdwdco"
                id="one-a"
                name="yes-1"
                required
                onChange={() => {
                  setSelectedRole("jury");
                }}
              />
              <label className="radio-label jsjwjdwjdwjdwco" for="one-a">
                <span className="alphabet">A</span> I'm the best jury!
              </label>
              <input
                type="radio"
                className="input-radio one-b jshdgdgwgdwfdfwdwjfdjwwdwdin"
                id="one-b"
                name="yes-1"
                onChange={() => {
                  setSelectedRole("participant");
                }}
              />
              <label className="radio-label jsjwjdwjdwjdwin" for="one-b">
                <span className="alphabet">B</span> I'm the participant and
                wan't see show results!
              </label>
            </div>
            <a
              id="btn"
              type="submit"
              onclick="window.location.href='#section-2'"
              onClick={() => {
                if (selectedRole === "jury") {
                  history.push("/jury");
                } else {
                  history.push("/totals");
                }
              }}
            >
              Next
            </a>

            <p style={{ textAlign: "center" }}>Created with ❤</p>
            <small style={{ textAlign: "center", display: "block" }}>
              With the help of Google Translation ☺
            </small>
          </form>
        </main>
      </section>
    </>
  );
};

export default ChoicePage;
