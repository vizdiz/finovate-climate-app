import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Slide from "../modules/slider.js"

const Skeleton = (props) => {
  return (
    <div>
      <Slide defaultEnvironment = {0.7} defaultPrice = {10.95}/>
    </div>
  );
};

export default Skeleton;
