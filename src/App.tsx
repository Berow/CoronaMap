import React from 'react';
import L from 'leaflet';
import { FeatureCollection } from 'geojson';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import { useGeodataFetch } from './hooks/useGeodataFetch';
import { countryData } from './utils/index';

function GeoJsonLayer(geoData: FeatureCollection): null {
  const map = useMap();

  const geoJsonMarkers = new L.GeoJSON<countryData>(geoData, {
    pointToLayer: (feature, latlng) => {
      let casesString: string;

      const { country, updated, cases, deaths, recovered } = feature.properties;

      casesString = `${cases}`;

      if (cases && cases > 1000) {
        casesString = `${casesString.slice(0, -3)}k+`;
      }

      const updatedFormatted = updated && new Date(updated).toLocaleString();

      const html = `
      <span class="icon-marker">
        <span class="icon-marker-tooltip">
          <h2>${country}</h2>
          <ul>
            <li><strong>Confirmed:</strong> ${cases}</li>
            <li><strong>Deaths:</strong> ${deaths}</li>
            <li><strong>Recovered:</strong> ${recovered}</li>
            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
          </ul>
        </span>
        ${casesString}
      </span>
    `;

      return L.marker(latlng, {
        icon: L.divIcon({
          className: 'icon',
          html,
        }),
        riseOnHover: true,
      });
    },
  });
  geoJsonMarkers.addTo(map);
  return null;
}

function App(): JSX.Element {
  const { isFetching, geoData, error } = useGeodataFetch();

  return (
    <div className="map">
      <MapContainer center={[0, 0]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJsonLayer {...geoData} />
      </MapContainer>
    </div>
  );
}

export default App;
