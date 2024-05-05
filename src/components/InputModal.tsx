import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function InputModal() {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("add-question");
  };

  return (
    <div>
      <Button
        style={{
          marginTop: "30px",
          color: "#055cfc",
          background: "white",
          fontSize: "15px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        <AddCircleIcon />
        <b> Add Question</b>
      </Button>
    </div>
  );
}
