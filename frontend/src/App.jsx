import Home from "./pages/Home";
<<<<<<< HEAD
import Application from "./pages/Application";
import Help from "./pages/Help";
import About from "./pages/About";
=======
import Register from "./pages/Register";
import HelpPage from "./pages/HelpPage";
import About from "./pages/About"
>>>>>>> 4b7018d5573e67daa94cfcc5797aaa1c374f26f9
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPortal from './pages/admin/AdminPortal';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeaturedPosition from "./components/Homepage/FeaturedPositions";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
<<<<<<< HEAD
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/application" element={<Application />} />
            <Route path="/featuredpositions" element={<FeaturedPosition />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
=======
            <Route path="/register" element={<Register />} />
            <Route path="/featuredPosition" element={<FeaturedPosition />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpPage />} />
>>>>>>> 4b7018d5573e67daa94cfcc5797aaa1c374f26f9
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App