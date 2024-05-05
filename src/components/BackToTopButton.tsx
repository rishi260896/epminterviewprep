// BackToTopButton.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const yOffset = window.scrollY;
      if (yOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <Button
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "25px",
            height: "40px",
            color: "#062642",
            background: "yellow",
            opacity: 0.7,
          }}
          onClick={scrollToTop}
          variant="contained"
        >
          <NavigationIcon fontSize="large" />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
