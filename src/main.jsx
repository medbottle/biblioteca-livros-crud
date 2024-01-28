import "./reset.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@radix-ui/themes/styles.css';
import App from './App.jsx'
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme appearance="dark" align={'center'} >
      <App />
    </Theme>
  </React.StrictMode>,
)
