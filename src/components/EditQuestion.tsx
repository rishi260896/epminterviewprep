import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  runTransaction,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import JoditEditor from "jodit-react";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

export const EditQuestion = () => {
  const { idParam } = useParams();
  const [id, setId] = useState<any | null>(idParam);
  const [que, setQue] = useState<any | null>("");
  const [ans, setAns] = useState<any | null>("");
  const editor = React.useRef(null);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  useEffect(() => {
    setId(idParam);
    const queDocument = doc(db, "interview_questions", id);
    getDoc(queDocument).then((que) => {
      const { question, answer }: any = { ...que.data() };
      setQue(question);
      setAns(answer);
    });
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure you want to update this question?")) {
        const queDocument = doc(db, "interview_questions", id);
        await updateDoc(queDocument, {
          answer: ans,
          question: que,
          timestamp: serverTimestamp(),
        });
        alert("Updated succesfully!");
        navigate("/");
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
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
        Update your question
      </Typography>
      <TextField
        required
        fullWidth
        id="outlined-basic"
        variant="outlined"
        defaultValue={que}
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
        onClick={handleUpdate}
        variant="contained"
        style={{ background: "#0f4b80" }}
      >
        Update
      </Button>
    </div>
  );
};
