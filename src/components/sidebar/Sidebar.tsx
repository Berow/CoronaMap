import React from 'react';
import { FeatureCollection } from 'geojson';
import { timeFormat } from 'd3-time-format';
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

type casesTimelineType = {
  cases: number;
  date: string;
}[];
type deathsTimelineType = {
  deaths: number;
  date: string;
}[];
type recoveredTimelineType = {
  recovered: number;
  date: string;
}[];

function renderCountry(
  geoData: countryData,
  casesTimeline: casesTimelineType,
  deathsTimeline: deathsTimelineType,
  recoveredTimeline: recoveredTimelineType,
) {
  if (!geoData) return null;

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
      <h3>Cases</h3>
      <Chart data={casesTimeline} dataKey="cases" color="orange" />
      <Chart data={deathsTimeline} dataKey="deaths" color="red" />
      <Chart data={recoveredTimeline} dataKey="recovered" color="green" />
    </>
  );
}

export const Sidebar = (): JSX.Element => {
  const country = useGetCountry();

  const casesTimeline = [];
  const deathsTimeline = [];
  const recoveredTimeline = [];
  const formatDate = timeFormat("%b %d, '%y");
  let data: Partial<GeodataState> = {};

  if (country) {
    data = useFetchCountry(country);

    if (data.historicalData && isHistoricalCountry(data.historicalData)) {
      const dates = Object.keys(data.historicalData.timeline.cases);
      const cases = Object.values(data.historicalData.timeline.cases);
      const deaths = Object.values(data.historicalData.timeline.deaths);
      const recovered = Object.values(data.historicalData.timeline.recovered);
      // eslint-disable-next-line
      for (let i = 0; i < dates.length; i++) {
        casesTimeline.push({
          cases: cases[i],
          date: formatDate(new Date(dates[i])),
        });
        deathsTimeline.push({
          deaths: deaths[i],
          date: formatDate(new Date(dates[i])),
        });
        recoveredTimeline.push({
          recovered: recovered[i],
          date: formatDate(new Date(dates[i])),
        });
      }
    }
  }
  if (!country) data = useGeodataFetch();

  const render = isCountry(data.geoData)
    ? renderCountry(data.geoData, casesTimeline, deathsTimeline, recoveredTimeline)
    : 'All countries';

  return <div>{render}</div>;
};
