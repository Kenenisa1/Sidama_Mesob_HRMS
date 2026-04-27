import Home from "./pages/Home";
import Register from "./pages/Register";
import HelpPage from "./pages/HelpPage";
import About from "./pages/About"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPortal from './pages/admin/AdminPortal';
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
            <Route path="/register" element={<Register />} />
            <Route path="/featuredPosition" element={<FeaturedPosition />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App