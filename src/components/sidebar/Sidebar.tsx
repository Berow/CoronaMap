import React, { useRef, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { tileLayer } from 'leaflet';
import { GeodataState } from '../../reducers/geoDataReducer';
import { useGeodataFetch, useGetCountry, useFetchCountry } from '../../hooks';
import { countryData, HistoricalDataAll, HistoricalDataCountry } from '../../utils/index';
import { Chart } from '../../utils/Charts';

const isCountry = (f: FeatureCollection | countryData | undefined): f is countryData => {
  return (f as countryData).country !== undefined;
};
const isHistoricalCountry = (
  f: HistoricalDataAll | HistoricalDataCountry | Record<string, never> | undefined,
): f is HistoricalDataCountry => {
  return (f as HistoricalDataCountry).country !== undefined;
};

type HistoryDay = {
  cases: number;
  date: string;
};

function renderCountry(geoData: countryData, timeline: HistoryDay[]) {
  if (timeline.length < 10) return null;
  const { country, updated, cases, deaths, recovered } = geoData;
  const updatedFormatted = updated && new Date(updated).toLocaleString();

  return (
    <>
      <h2>{country}</h2>
      <ul>
        <li>
          <strong>Confirmed:</strong> {cases}
        </li>
        <li>
          <strong>Deaths:</strong> {deaths}
        </li>
        <li>
          <strong>Recovered:</strong> {recovered}
        </li>
        <li>
          <strong>Last Update:</strong> {updatedFormatted}
        </li>
      </ul>
      <Chart timeline={timeline} />
    </>
  );
}

export const Sidebar = (): JSX.Element => {
  const country = useGetCountry();

  const timeline = [];
  let data: Partial<GeodataState> = {};

  if (country) {
    data = useFetchCountry(country);

    if (data.historicalData && isHistoricalCountry(data.historicalData)) {
      const dates = Object.keys(data.historicalData.timeline.cases);
      const cases = Object.values(data.historicalData.timeline.cases);
      // eslint-disable-next-line
      for (let i = 0; i < dates.length; i++) {
        timeline.push({ cases: cases[i], date: dates[i] });
      }
    }
  }
  if (!country) data = useGeodataFetch();

  const render = isCountry(data.geoData) ? renderCountry(data.geoData, timeline) : 'All countries';

  return <div>{render}</div>;
};
