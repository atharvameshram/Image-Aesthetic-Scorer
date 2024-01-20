// AestheticScoreDisplay.js
import React from 'react';

const AestheticScoreDisplay = ({ score, onCheckScore }) => {
  return (
    <div>
      <h2>Aesthetic Score: {score}</h2>
      <button onClick={onCheckScore}>Check Score</button>
      {/* Additional UI elements based on your needs */}
    </div>
  );
};

export default AestheticScoreDisplay;
