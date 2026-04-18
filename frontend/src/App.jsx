import Register from "./pages/Register";
import HelpPage from "./pages/HelpPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App