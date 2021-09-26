import { useEffect } from 'react';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMap } from 'react-leaflet';
import { Feature } from 'geojson';
import chroma from 'chroma-js';
import { useDispatch } from 'react-redux';
import { setCountry } from '../actions/geodataActions';
import { geoJsonBorders } from './Borders';
import coronaV2 from '../api/coronaV2';
import { GEOJson } from '.';

function colorMap(data: Feature[]) {
  let maxCases = 0;
  const countryCases: Map<string, number> = data.reduce((map, el) => {
    if (el.properties?.cases >= maxCases) maxCases = el.properties?.cases;
    const country =
      el.properties?.country === 'Democratic Republic of the Congo'
        ? 'Congo'
        : el.properties?.country;
    return map.set(country, el.properties?.cases);
  }, new Map());
  const scale = chroma.scale(['green', 'red']).domain([0, maxCases]);

  return { map: countryCases, scale };
}

export const GeoJsonBordersLayer = (): null => {
  const map = useMap();
  const dispatch = useDispatch();

  let data: {
    map: Map<string, number>;
    scale: chroma.Scale<chroma.Color>;
  };

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

  const dehighlight = (border: L.GeoJSON<L.Layer>, e: LeafletMouseEvent) => {
    if (selected === null || selected.target._leaflet_id !== e?.target._leaflet_id) {
      border.resetStyle(e.target);
    }
  };

  const select = (border: L.GeoJSON<L.Layer>, e: LeafletMouseEvent) => {
    if (selected !== null) {
      previous = selected;
    }

    if (e.target.feature.properties.name_en) {
      if (e.target.feature.properties.name_en === 'Democratic Republic of the Congo') {
        dispatch(setCountry('Congo'));
      } else dispatch(setCountry(e.target.feature.properties.name_en));
    }

    e.target.setStyle({
      weight: 7,
      color: '#f76c6c',
      dashArray: '',
      fillColor: '#eee',
      fillOpacity: 0.1,
    });
    map.fitBounds(e.target.getBounds());
    e.target.bringToFront();
    selected = e;
    if (previous) {
      dehighlight(border, previous);
    }
  };

  useEffect(() => {
    coronaV2
      .get('/countries')
      .then(response => {
        data = colorMap(GEOJson(response.data).features);
        const borders = new L.GeoJSON(geoJsonBorders, {
          style: feature => {
            let color;
            if (data && data.map.get(feature?.properties.name_en)) {
              color = data.scale(data.map.get(feature?.properties.name_en)).hex();
            }
            return { fillColor: `${color}` };
          },
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
      })
      .catch(error => {
        data = error;
      });
  }, []);

  return null;
};
