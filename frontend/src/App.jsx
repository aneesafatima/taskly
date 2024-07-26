import {Routes, Route, useLocation } from "react-router-dom";
import { Auth, Dashboard, NavBar, Settings } from "./components";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [active, setActive] = useState();
  const showNavBar = location.pathname === "/dashboard" || location.pathname === "/settings"
  useEffect(() => setActive(location.pathname), [location.pathname])
    return (

        <div className="flex">
         {showNavBar &&  <NavBar active={active}/>}
          
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </div>
   
   
  );
}

export default App;
