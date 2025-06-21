import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/fonts.css"
import "./styles/defaults/page-setup.css";
import "./styles/defaults/transitions.css";
import "./styles/defaults/variables.css";
import Gauge from './Gauge.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gauge />
  </StrictMode>,
)
