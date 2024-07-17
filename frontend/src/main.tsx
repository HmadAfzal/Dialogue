import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import SocketContextProvider from './context/SocketContext.tsx'

let persistor = persistStore(store)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContextProvider>
    <App /> 
    </SocketContextProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
