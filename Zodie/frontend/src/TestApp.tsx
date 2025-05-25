import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Test Home Page</h1>
    <p>This is a simple test page.</p>
  </div>
);

function TestApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TestApp;
