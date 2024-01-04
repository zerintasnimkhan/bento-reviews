import React from 'react';
import ImageSlider from './components/ImageSlider';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', width: '100%', paddingTop: '50px' }}>
        <ImageSlider />
      </div>
    </div>
  );
}

export default App;
