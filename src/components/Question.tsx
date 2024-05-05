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
  limit,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import parse from "html-react-parser";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";
import BackToTopButton from "./BackToTopButton";
import { Button } from "@mui/material";
import pdf_img from "../images/pdf_icon_edited.jpg";
import excel_img from "../images/excel_icon_edited.jpg";
import printer_img from "../images/printer_icon_edited.jpg";
import { useAuth } from "./Auth";

export const Question = () => {
  const [queAns, setQueAns] = useState<any>();
  let [len, setLen] = useState<number>(1);
  const navigate = useNavigate();
  const collectionRef = collection(db, "interview_questions");
  const auth = useAuth();

  useEffect(() => {
    allQuestions();
  }, []);

  const allQuestions = () => {
    getDocs(query(collectionRef, orderBy("timestamp", "desc"))).then((que) => {
      let queData = que.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQueAns(queData);
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 10; // Starting y-coordinate

    queAns?.forEach((item: any, index: any) => {
      const lineHeight = 3;
      const fontSize = 12;
      const questionLines = doc.splitTextToSize(
        `Question: ${item.question}`,
        190
      );
      const answerLines = doc.splitTextToSize(
        `Answer: ${DOMPurify.sanitize(item.answer, {
          ALLOWED_TAGS: [],
        })}`,
        190
      );

      if (y + (questionLines.length + answerLines.length) * lineHeight > 280) {
        doc.addPage();
        y = 10;
      }

      doc.setFontSize(fontSize);
      doc.text(questionLines, 10, y);
      y += questionLines.length * lineHeight + lineHeight;

      doc.text(answerLines, 10, y);
      y += answerLines.length * lineHeight + lineHeight;

      if (index < queAns?.length - 1) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("epm_questions_answers" + Date.now() + ".pdf");
  };

  const handleExportExcel = () => {
    console.log("queAns pdf", queAns);
    const worksheet = XLSX.utils.json_to_sheet(
      queAns.map((item: any) => ({
        Question: item.question,
        Answer: DOMPurify.sanitize(item.answer, {
          ALLOWED_TAGS: [],
        }),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions Answers");
    XLSX.writeFile(workbook, "epm_questions_answers" + Date.now() + ".xlsx");
  };

  const handlePrintPage = () => {
    window.print();
  };

  const updateQuestion = (id: any) => {
    navigate(`/edit/${id}`);
  };

  const deleteQuestion = async (id: any) => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        const documentRef = doc(db, "interview_questions", id);
        await deleteDoc(documentRef);
        allQuestions();
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <Button
          onClick={handleExportPDF}
          style={{
            marginRight: "10px",
            color: "red",
            background: "white",
          }}
          variant="contained"
        >
          <img
            height={40}
            width={40}
            src={pdf_img}
            alt="Download as PDF"
            title="Download as PDF"
          />
        </Button>
        <Button
          onClick={handleExportExcel}
          style={{
            marginRight: "10px",
            color: "green",
            backgroundColor: "white",
          }}
          variant="contained"
        >
          <img
            height={40}
            width={40}
            src={excel_img}
            alt="Download as EXCEL"
            title="Download as EXCEL"
          />
        </Button>
        <Button
          onClick={handlePrintPage}
          style={{
            marginRight: "10px",
            color: "blue",
            backgroundColor: "white",
          }}
          variant="contained"
        >
          <img
            height={40}
            width={40}
            src={printer_img}
            alt="Print PageF"
            title="Print Page"
          />
        </Button>
      </div>
      <br />
      <div>
        {queAns?.map(({ question, answer, id }: any) => (
          <Box
            sx={{
              boxShadow: 3,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              p: 3,
              marginBottom: "20px",
              borderRadius: 2,
              fontSize: "0.875rem",
              border: "2px solid #074263",
            }}
            key={(len += 1)}
          >
            {auth?.user && (
              <div style={{ margin: "10px" }}>
                <Button
                  type="button"
                  title="delete"
                  className="btn btn-danger float-end"
                  style={{
                    float: "right",
                    marginLeft: "10px",
                    border: "1px solid red",
                  }}
                  onClick={() => deleteQuestion(id)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </Button>
                <Button
                  type="button"
                  title="edit"
                  className="btn btn-danger float-end"
                  style={{ float: "right", border: "1px solid blue" }}
                  onClick={() => updateQuestion(id)}
                >
                  <EditRoundedIcon style={{ color: "blue" }} />
                </Button>
              </div>
            )}
            <div>
              <b>
                Question {len} : {question}
              </b>
            </div>
            <br />
            <hr style={{ border: "2px solid #074263", borderRadius: "5px" }} />
            <div>
              <b>Answer</b> : {parse(answer)}
            </div>
            <br></br>
          </Box>
        ))}
      </div>
      <BackToTopButton />
    </>
  );
};
