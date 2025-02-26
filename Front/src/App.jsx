import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import PageTwo from "./Pages/PageTwo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Page-Two" element={<PageTwo />} />
      </Routes>
    </Router>
  );
};

export default App;
