import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Bubbles from './pages/Bubbles';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/bubble-game" element={<Bubbles/>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
