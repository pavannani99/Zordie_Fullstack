import React from 'react';

function SimpleTest() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'blue' }}>Simple Test Page</h1>
      <p>This is a very basic React component with no dependencies.</p>
      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: 'green', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </div>
  );
}

export default SimpleTest;
