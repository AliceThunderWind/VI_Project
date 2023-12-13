import React from 'react';

import WorldMap from '../components/WorldMap';

import '../App.css';

import '../styles/Legends.css'

function Home() {
  return (
    <>
      <WorldMap />
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#03b082' }}></div>
          <div className="legend-value">&lt; 5</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#fa7448' }}></div>
          <div className="legend-value">Entre 5 et 15</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#940f42' }}></div>
          <div className="legend-value">&gt; 15</div>
        </div>
      </div>
    </>
  );
}

export default Home;