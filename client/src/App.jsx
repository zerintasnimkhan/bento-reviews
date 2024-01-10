import React from 'react';
//import ImageSlider from './components/ImageSlider';
import Reviews from './components/Reviews';
//import Feedback from './components/Feedback'

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Reviews />
      </div>
    </div>
  );
}

export default App;
