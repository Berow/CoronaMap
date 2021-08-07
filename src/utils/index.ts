import { FeatureCollection } from 'geojson';

type countryInfo = {
  flag: string;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  _id: number;
};

export type countryData = {
  active?: number;
  activePerOneMillion?: number;
  cases?: number;
  casesPerOneMillion?: number;
  continent?: string;
  country: string;
  countryInfo: countryInfo;
  critical?: number;
  criticalPerOneMillion?: number;
  deaths?: number;
  deathsPerOneMillion?: number;
  oneCasePerPeople?: number;
  oneDeathPerPeople?: number;
  oneTestPerPeople?: number;
  population?: number;
  recovered?: number;
  recoveredPerOneMillion?: number;
  tests?: number;
  testsPerOneMillion?: number;
  todayCases?: number;
  todayDeaths?: number;
  todayRecovered?: number;
  updated?: number;
};

export type HistoricalDataAll = {
  cases: {
    [date: string]: number;
  };
  deaths: {
    [date: string]: number;
  };
  recovered: {
    [date: string]: number;
  };
};

export type HistoricalDataCountry = {
  country: string;
  province: string[];
  timeline: {
    cases: {
      [date: string]: number;
    };
    deaths: {
      [date: string]: number;
    };
    recovered: {
      [date: string]: number;
    };
  };
};

export function GEOJson(data: Array<countryData>): FeatureCollection {
  const geoJson: FeatureCollection = {
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
  return geoJson;
}
