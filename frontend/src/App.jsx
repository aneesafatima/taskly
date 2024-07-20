import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, Dashboard, Settings } from "./components";

function App() {
  return <BrowserRouter>
  <Routes>
  <Route path="/" element={<Auth />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
  </Routes>
  
  </BrowserRouter>;
}

export default App;
 