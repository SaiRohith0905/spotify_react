import React from "react";
import { SPOTIFY_LOGO_URL } from "./Constants/Images";

import AppLogo from "../Assets/Images/AppLogo.svg";
const SideMenu = () => {
  return (
    <div className="sticky top-0">
      <img
        className="ml-3"
        src={SPOTIFY_LOGO_URL}
        width="110px"
        height="34px"
        alt="Spotify-Logo"
      />
      <div className="bg-[#242424] rounded-lg mt-2 mb-2 mr-2 ml-4 ">
        <div className="pl-5 pb-2 pt-2 pr-2 text-xl text-[#b3b3b3] hover:text-white font-semibold">
          <span className="mr-2">
            <i className="fa-solid fa-house-chimney"></i>
          </span>
          Home
        </div>
        <div className="pl-5 pb-2 pt-2 pr-2 text-xl text-[#b3b3b3] hover:text-white font-semibold">
          <span className="mr-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          Search
        </div>
      </div>
      <div className="bg-[#242424] rounded-lg mt-2 mb-2 mr-2 ml-4">
        <div className="pl-5 pb-2 pt-2 pr-2 text-xl text-[#b3b3b3] hover:text-white font-semibold">
          <span className="mr-2">
            <i className="fa-solid fa-layer-group"></i>
          </span>
          Your Library
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
