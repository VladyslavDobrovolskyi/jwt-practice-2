import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Store from './store/store.js'
const store = new Store();

export const Context = React.createContext({
  store
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);