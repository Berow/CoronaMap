import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { useGeodataFetch, useGetCountry, useFetchCountry } from '../../hooks';
import { countryData } from '../../utils/index';

export function Sidebar(): JSX.Element {
  const country = useGetCountry();
  const [response, setData] = useState<FeatureCollection>();
  console.log(country);

  const { geoData, error, isFetching } = country ? useFetchCountry(country) : useGeodataFetch();

  if (geoData !== response && !response) setData(geoData);
  console.log(geoData);
  console.log(response);

  return <div>{response?.type}</div>;
}
