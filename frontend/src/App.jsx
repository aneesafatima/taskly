import { Routes, Route, useLocation } from "react-router-dom";
import { Auth, Dashboard, NavBar, Settings } from "./components";
import { useContext, useEffect, useState } from "react";
import { NotFound } from "./components";
import { GlobalState } from "./context/GlobalState";

function App() {
  const location = useLocation();
  const [active, setActive] = useState();
  const { giveAccess, refetch } = useContext(GlobalState);
  useEffect(() => {
    setActive(location.pathname), [location.pathname];
  });

  const showNavBar =
    location.pathname === "/dashboard" || location.pathname === "/settings";

  if (
    !giveAccess &&
    (location.pathname === "/dashboard" || location.pathname === "/settings") && !refetch
  )
    return (
      <NotFound
        code="400 - Bad Request"
        link="/"
        location="SignUp/LogIn"
        message="You are not logged in. Please log in to access the dashboard."
      />
    );

  return (
    <div className="flex">
      {showNavBar && <NavBar active={active} />}

      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        <Route
          path="*"
          element={
            <NotFound
              code="404 - Page not found"
              link="/"
              location="home"
              message="Sorry, the page you are looking for does not exist."
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
