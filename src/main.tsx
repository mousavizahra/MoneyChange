import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CurrencyConverter from './components/CurrencyConverter'
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyConverter />
  </StrictMode>,
)
