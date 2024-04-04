import React, { useContext, useEffect } from "react";
import { BEFORE_LOGIN_DATA } from "./Constants/Constants";
import SpotifyCard from "./SpotifyCard";
import { commonFetch, isUserLoggedIn } from "../Utils/Helper";
import UserContext from "../Utils/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  async function handleLogin() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const clientId = "5f44d5370e41460682e991dc74a0621c";
    const redirectUri = "http://localhost:3000";

    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }
  const getToken = async (code) => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "5f44d5370e41460682e991dc74a0621c",
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:3000",
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);
    const response = await body.json();
    console.log(response.access_token);
    localStorage.setItem("access_token", response.access_token);
    getUserData();
  };

  async function getUserData() {
    const userDetails = await commonFetch(
      "https://api.spotify.com/v1/me",
      "GET"
    );
    console.log(userDetails);
    setUserDetails(userDetails);
  }

  useEffect(() => {
    if (window.location.search.includes("?code") && !isUserLoggedIn()) {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");
      console.log(code);
      getToken(code);

      navigate("/");
    }

    if (!userDetails?.display_name && isUserLoggedIn()) {
      getUserData();
    }
  }, []);

  return (
    <div className="pl-5">
      {!isUserLoggedIn() ? (
        <div className="bg-[#090909] p-4  flex justify-between sticky top-0">
          <div>
            <div></div>
            <div></div>
          </div>
          <div>
            <button className=" cursor-pointer  pl-3 pr-3 pt-2 pb-2 hover:transform hover:scale-[1.08] duration-500">
              Sign Up
            </button>
            <button
              className="rounded-3xl cursor-pointer border border-white text-black bg-white pl-5 pr-5 pt-3 pb-3 hover:transform hover:scale-[1.08] duration-500 "
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          {userDetails?.display_name && (
            <img
              src={userDetails?.images[0]?.url}
              className="rounded-full"
              title={userDetails?.display_name}
            />
          )}
        </div>
      )}
      <div className="bg-[#121212]">
        <p className="text-3xl ">Spotify Playlists</p>
        <div className="flex flex-wrap">
          {BEFORE_LOGIN_DATA.map((ei) => {
            return <SpotifyCard key={ei?.uri} cardDetails={ei} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
