import React from "react";
import {
  styled,
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import logo_img from "../images/logo_edited.png";
import { NavLink, useNavigate } from "react-router-dom";
import login_img from "../images/login_img_edited.jpg";
import { useAuth } from "./Auth";

export const TopNav: React.FC = ({ children }: any) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const goToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#49abc9" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goToHome}
          >
            <img height={50} width={50} src={logo_img} alt="LOGO" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Crimson Text" }}
          >
            EPM INTERVIEW PREP
          </Typography>
          {auth?.user ? (
            <>
              {/* <Avatar alt={auth?.user} src="" /> */}
              <Typography
                sx={{ flexGrow: 1, fontFamily: "Crimson Text", textAlign:"end", margin:"10px" }}
              >
                {auth?.user?.email}
              </Typography>
              <Button
                style={{ background: "red", color: "white" }}
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <NavLink style={{ textDecoration: "none" }} to="signin">
              <Avatar alt="Sign In" />
            </NavLink>
          )}
          {auth?.user && <></>}
        </Toolbar>
      </AppBar>
    </div>
  );
};
