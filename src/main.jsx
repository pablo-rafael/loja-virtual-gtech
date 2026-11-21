import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Estilos do PrimeReact (tema + componentes), ícones e PrimeFlex (layout)
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
