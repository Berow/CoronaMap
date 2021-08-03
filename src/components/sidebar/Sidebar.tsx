import React, { useRef, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { GeodataState } from '../../reducers/geoDataReducer';
import {
  useGeodataFetch,
  useGetCountry,
  useFetchCountry,
  usefetchHistoricalData,
} from '../../hooks';
import { countryData } from '../../utils/index';

const isCountry = (f: FeatureCollection | countryData | undefined): f is countryData => {
  return (f as countryData).country !== undefined;
};

function renderCountry(geoData: countryData) {
  console.log(geoData);
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
    </>
  );
}

export const Sidebar = (): JSX.Element => {
  const country = useGetCountry();

  let data: Partial<GeodataState> = {};
  // const historical: Partial<GeodataState> = {};

  if (country) {
    data = useFetchCountry(country);
    // historical = usefetchHistoricalData(country);
    console.log(data);
  }
  if (!country) data = useGeodataFetch();

  const render = isCountry(data.geoData) ? renderCountry(data.geoData) : 'All countries';

  return <div>{render}</div>;
};
