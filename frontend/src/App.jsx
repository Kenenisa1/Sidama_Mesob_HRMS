import Home from "./pages/Home";
import Register from "./pages/Register";
import HelpPage from "./pages/HelpPage";
import Navbar from "./components/headerandfooter/Navbar";
import Footer from "./components/headerandfooter/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App