import { useNavigate } from "react-router-dom";
import React from "react";
import "../App.css";
import { Question } from "./Question";
import { TopNav } from "./TopNav";
import InputModal from "./InputModal";
import { useAuth } from "./Auth";

const Home = () => {
  const auth = useAuth();
  return (
    <div className="App">
      <TopNav />
      {auth?.user && (
        <div>
          <span
            style={{ float: "right", marginRight: "20px", marginTop: "10px" }}
          >
            <InputModal />
          </span>
        </div>
      )}
      <br />
      <div style={{ margin: "20px" }}>
        <Question />
      </div>
    </div>
  );
};

export default Home;
