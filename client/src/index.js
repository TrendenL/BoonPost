import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import UserProvider from './context/UserProvider'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>
)