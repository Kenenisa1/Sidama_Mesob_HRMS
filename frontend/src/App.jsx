import Register from "./pages/Register";
import HelpPage from "./pages/HelpPage";
import Navbar from "./components/headerandfooter/Navbar";
import Footer from "./components/headerandfooter/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App