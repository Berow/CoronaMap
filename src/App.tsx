import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="Map">
      <MapContainer center={[0, 0]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"/>
      </MapContainer>
    </div>
  );
}

export default App;
