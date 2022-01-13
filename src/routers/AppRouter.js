import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import SignInSide from "../pages/Login";
import SignUp from "../pages/Register";
import Newblog from "../pages/NewBlog";
import BasicCard from "../pages/Profile";
import Details from "../pages/Details";
import UpdateBlog from "../pages/UpdateBlog";

const AppRouter = () => (
  <Router>
    <ResponsiveAppBar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<SignInSide />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/newblog" element={<Newblog />} />
      <Route path="/profile" element={<BasicCard />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/update/:id" element={<UpdateBlog />} />
    </Routes>
  </Router>
);

export default AppRouter;
