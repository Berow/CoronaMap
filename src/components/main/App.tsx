import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { GeoJsonBordersLayer } from '../../utils/GeoJsonBorders';
import { Sidebar } from '../sidebar/Sidebar';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import { useGeodataFetch } from '../../hooks';

function App(): JSX.Element {
  return (
    <div className="container">
      <div className="map">
        <MapContainer center={[0, 0]} zoom={4} preferCanvas>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJsonBordersLayer />
        </MapContainer>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
