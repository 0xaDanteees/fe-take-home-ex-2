import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//Using vite for the first time cause i know its better
//if you gonna pull a SPA (single-page app)
//We ofc using TS


//npm create vite@latest fronted --template react-ts
