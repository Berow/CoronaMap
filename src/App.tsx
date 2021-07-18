import React, { useEffect } from 'react';
import L from 'leaflet';
import { FeatureCollection } from 'geojson';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import { useGeodataFetch } from './hooks/useGeodataFetch';
import { countryData } from './utils/index';
import { geoJsonBorders } from './utils/Borders';

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

function GeoJsonBordersLayer(geoData: FeatureCollection): null {
  const map = useMap();

  const borders = new L.GeoJSON<L.Layer>(geoJsonBorders, {
    onEachFeature(feature, layer) {
      layer.on('click', (e: L.LeafletMouseEvent) => {
        map.fitBounds(e.target._bounds);
      });
      layer.on('mouseover', e => {
        e.target.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.1,
        });
      });
      layer.on('mouseout', e => {
        borders.resetStyle(e.target);
      });
    },
  });
  borders.addTo(map);

  return null;
}

function App(): JSX.Element {
  const { isFetching, geoData, error } = useGeodataFetch();
  console.log(geoData);

  return (
    <div className="map">
      <MapContainer center={[0, 0]} zoom={4} preferCanvas>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJsonBordersLayer {...geoData} />
      </MapContainer>
    </div>
  );
}

export default App;
