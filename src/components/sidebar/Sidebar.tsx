import React, { useRef, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { GeodataState } from '../../reducers/geoDataReducer';
import { useGeodataFetch, useGetCountry, useFetchCountry, usePrevious } from '../../hooks';
import { countryData } from '../../utils/index';

const isCountry = (f: FeatureCollection | countryData | undefined): f is countryData => {
  return (f as countryData).country !== undefined;
};

export const Sidebar = React.memo(
  (): JSX.Element => {
    const country = useGetCountry();

    let data: Partial<GeodataState> = {};

    if (country) {
      data = useFetchCountry(country);
    }
    if (!country) data = useGeodataFetch();

    const render = isCountry(data.geoData) ? data.geoData.country : 'All countries';

    return <div>{render}</div>;
  },
);

Sidebar.displayName = 'Sidebar';
