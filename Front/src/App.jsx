import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePageAdmin from "./Pages/HomePageAdmin";
import UserManagementPage from "./Pages/UserManagePage";
import AddUserPage from "./Pages/AddUserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
        <Route path="/UserManagePage" element={<UserManagementPage />} />
        <Route path="/AddUserPage" element={<AddUserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
