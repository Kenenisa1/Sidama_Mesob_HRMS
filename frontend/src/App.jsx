import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import About from "./pages/About";
import Register from "./pages/Register";
import Application from "./pages/Application";
import Footer from "./components/Footer";
import AdminPortal from './pages/admin/AdminPortal';
import Login from './pages/Login';
import FeaturedPosition from "./components/Homepage/FeaturedPositions";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/application" element={<Application />} />
            <Route path="/featuredpositions" element={<FeaturedPosition />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App