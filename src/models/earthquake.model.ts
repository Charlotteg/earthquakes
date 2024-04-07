export interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: null;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: 0 | 1;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
  title: string;
}

export interface EarthquakeFeature {
  type: 'Feature';
  properties: EarthquakeProperties;
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
  id: string;
}

export interface EarthquakeFeatureCollection {
  type: 'FeatureCollection';
  metadata: {
    generated: number;
    url: string;
    title: string;
    api: string;
    count: number;
    status: number;
  };
  bbox?: number[];
  features: EarthquakeFeature[];
}
