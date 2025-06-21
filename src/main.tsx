import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import "./styles/fonts.css"
import "./styles/defaults/setup.css";
import "./styles/defaults/page-setup.css";
import "./styles/defaults/transitions.css";
import "./styles/defaults/variables.css";

import Example from './pages/Example.tsx'
import Gallery from './pages/Gallery.tsx';
import Header from './components/Header.tsx';
import Development from './pages/Development.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route index element={<Gallery />} />
        <Route path="example" element={<Example />} />
        <Route path="development" element={<Development />} />
      </Routes>
    </Router>
  </StrictMode>
);
