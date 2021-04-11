import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { GeoJSON } from 'geojson';
import './App.css';
import 'leaflet/dist/leaflet.css';

type countryInfo = {
  flag: string;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  _id: number;
};

type countryData = {
  active: number;
  activePerOneMillion: number;
  cases: number;
  casesPerOneMillion: number;
  continent: string;
  country: string;
  countryInfo: countryInfo;
  critical: number;
  criticalPerOneMillion: number;
  deaths: number;
  deathsPerOneMillion: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  population: number;
  recovered: number;
  recoveredPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  updated: number;
};

function GEOJson(data: Array<countryData>) {
  const hasData = Array.isArray(data) && data.length > 0;

  if (!hasData) return;

  const geoJson: GeoJSON = {
    type: 'FeatureCollection',
    features: data.map(country => {
      const { countryInfo } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      };
    }),
  };
}

function App(): JSX.Element {
  axios.get('https://corona.lmao.ninja/v2/countries').then(response => GEOJson(response.data));

  return (
    <div className="Map">
      <MapContainer center={[0, 0]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default App;
