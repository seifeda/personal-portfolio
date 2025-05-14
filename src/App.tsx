import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App