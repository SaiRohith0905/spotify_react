import { Outlet } from "react-router-dom";
import "./App.css";
import SideMenu from "./Components/SideMenu";
import { useState } from "react";
import UserContext from "./Utils/UserContext";

function App() {
  const [userDetails, setUserDetails] = useState({});
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <div className="flex">
        <div className="w-[20%]">
          <SideMenu />
        </div>
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
