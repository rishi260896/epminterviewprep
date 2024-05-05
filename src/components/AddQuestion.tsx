import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  runTransaction,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase.config";
import JoditEditor from "jodit-react";
import HomeIcon from "@mui/icons-material/Home";

export const AddQuestion = () => {
  const [que, setQue] = React.useState("");
  const [ans, setAns] = React.useState("");
  const collectionRef = collection(db, "interview_questions");
  const navigate = useNavigate();
  const editor = React.useRef(null);

  const handleBackButton = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    try {
      if (window.confirm("Are you sure you want to add this question?")) {
        if (que !== "" && ans !== "") {
          addDoc(collectionRef, {
            answer: ans,
            question: que,
            timestamp: serverTimestamp(),
          });
        } else {
          alert("Both Question and Answer are mandatory.");
          return;
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
    setQue("");
    setAns("");
    alert("Added succesfully!");
    navigate("/");
  };

  const testSubmit = () => {
    console.log("que", que);
    console.log("ans", ans);
  };
  return (
    <div style={{ margin: "30px" }}>
      <Button
        onClick={handleBackButton}
        variant="contained"
        style={{ marginBottom: "10px" }}
      >
        <HomeIcon fontSize="small" /> &nbsp; Back To Home Page
      </Button>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Add the Question
      </Typography>
      <TextField
        required
        fullWidth
        id="outlined-basic"
        variant="outlined"
        placeholder="Add your question here..."
        size="small"
        type="text"
        multiline
        onChange={(e) => setQue(e.target.value)}
      />
      <Typography
        id="transition-modal-description"
        variant="h6"
        component="h2"
        sx={{ mt: 2 }}
      >
        Answer of the Question
      </Typography>
      <JoditEditor
        ref={editor}
        onChange={(newContent) => {
          setAns(newContent);
        }}
        value={ans}
      />
      <br />
      <Button
        style={{ background: "#0f4b80" }}
        onClick={handleSubmit}
        variant="contained"
      >
        Submit
      </Button>
    </div>
  );
};
