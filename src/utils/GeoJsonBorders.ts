import L, { LeafletMouseEvent } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import { setCountry } from '../actions/geodataActions';
import { geoJsonBorders } from './Borders';

export const GeoJsonBordersLayer = (): null => {
  const map = useMap();
  const dispatch = useDispatch();

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

    if (e.target.feature.properties.name_en)
      dispatch(setCountry(e.target.feature.properties.name_en));
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
