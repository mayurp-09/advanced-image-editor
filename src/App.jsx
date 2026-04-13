import React from 'react'
import { Routes, Route } from "react-router-dom";
import Upload from './pages/Upload';
import Editor from './pages/Editor';
import Download from './pages/Download';

const App = () => {
  return (
      <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  )
}

export default App