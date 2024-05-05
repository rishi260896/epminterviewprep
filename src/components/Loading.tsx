import logo_img from "../images/logo_edited.png";
import { auth } from "./firebase.config";

export const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50%",
      }}
    >
      <img width={100} height={100} src={logo_img} alt="Loading..." />
    </div>
  );
};
