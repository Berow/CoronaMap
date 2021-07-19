import React, { useCallback, useEffect, useMemo, useState } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import { FeatureCollection } from 'geojson';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './App.scss';
import 'leaflet/dist/leaflet.css';
import { setCountryName } from './actions/geodataActions';
import { useGeodataFetch, useGetCountry, useSetCountry } from './hooks';
import { countryData } from './utils/index';
import { geoJsonBorders } from './utils/Borders';

// function GeoJsonLayer(geoData: FeatureCollection): null {
//   const map = useMap();

//   const geoJsonMarkers = new L.GeoJSON<countryData>(geoData, {
//     pointToLayer: (feature, latlng) => {
//       let casesString: string;

//       const { country, updated, cases, deaths, recovered } = feature.properties;

//       casesString = `${cases}`;

//       if (cases && cases > 1000) {
//         casesString = `${casesString.slice(0, -3)}k+`;
//       }

//       const updatedFormatted = updated && new Date(updated).toLocaleString();

//       const html = `
//       <span class="icon-marker">
//         <span class="icon-marker-tooltip">
//           <h2>${country}</h2>
//           <ul>
//             <li><strong>Confirmed:</strong> ${cases}</li>
//             <li><strong>Deaths:</strong> ${deaths}</li>
//             <li><strong>Recovered:</strong> ${recovered}</li>
//             <li><strong>Last Update:</strong> ${updatedFormatted}</li>
//           </ul>
//         </span>
//         ${casesString}
//       </span>
//     `;

//       return L.marker(latlng, {
//         icon: L.divIcon({
//           className: 'icon',
//           html,
//         }),
//         riseOnHover: true,
//       });
//     },
//   });
//   geoJsonMarkers.addTo(map);
//   return null;
// }

function App(): JSX.Element {
  const [country, setCountry] = useState('');

  if (country !== '') {
    setCountryName(country);
  }

  const GeoJsonBordersLayer = (): null => {
    const map = useMap();

    let selected: null | LeafletMouseEvent = null;
    let previous: null | LeafletMouseEvent = null;

    const highlight = (e: LeafletMouseEvent) => {
      if (e.target._leaflet_id !== selected?.target._leaflet_id) {
        e.target.setStyle({
          weight: 4,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.1,
        });
      }

      if (!L.Browser.ie && !L.Browser.opera) {
        e.target.bringToFront();
      }
    };

    const dehighlight = (borders: L.GeoJSON<L.Layer>, e: LeafletMouseEvent) => {
      if (selected === null || selected.target._leaflet_id !== e?.target._leaflet_id) {
        borders.resetStyle(e.target);
      }
    };

    const select = (borders: L.GeoJSON<L.Layer>, e: LeafletMouseEvent) => {
      if (selected !== null) {
        previous = selected;
      }
      if (country !== e.target.feature.properties.name_en)
        setCountry(e.target.feature.properties.name_en);
      e.target.setStyle({
        weight: 15,
        color: '#f76c6c',
        dashArray: '',
        fillColor: '#eee',
        fillOpacity: 0.1,
      });
      map.fitBounds(e.target.getBounds());
      e.target.bringToFront();
      selected = e;
      if (previous) {
        dehighlight(borders, previous);
      }
    };

    const borders = new L.GeoJSON<L.Layer>(geoJsonBorders, {
      onEachFeature(feature, layer) {
        layer.on({
          click(e) {
            select(borders, e);
          },
          mouseover(e) {
            highlight(e);
          },
          mouseout(e) {
            dehighlight(borders, e);
          },
        });
      },
    });
    borders.addTo(map);

    return null;
  };

  return (
    <div className="map">
      <MapContainer center={[0, 0]} zoom={4} preferCanvas>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJsonBordersLayer />
      </MapContainer>
    </div>
  );
}

export default App;
