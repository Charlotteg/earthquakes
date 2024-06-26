import type { FeatureCollection } from 'geojson';

export const mockEarthquakeFC: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        mag: 3.8,
        place: '7 km SW of Gladstone, New Jersey',
        time: 1712354353778,
        updated: 1712491632120,
        tz: null,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000mab9',
        detail:
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000mab9.geojson',
        felt: 12471,
        cdi: 5.9,
        mmi: 4.173,
        alert: 'green',
        status: 'reviewed',
        tsunami: 0,
        sig: 812,
        net: 'us',
        code: '7000mab9',
        ids: ',us7000mab9,',
        sources: ',us,',
        types:
          ',dyfi,general-header,losspager,moment-tensor,origin,phase-data,shakemap,',
        nst: 33,
        dmin: 0.65,
        rms: 0.43,
        gap: 107,
        magType: 'mwr',
        type: 'earthquake',
        title: 'M 3.8 - 7 km SW of Gladstone, New Jersey',
      },
      geometry: {
        type: 'Point',
        coordinates: [-74.7348, 40.6854, 8.518],
      },
      id: 'us7000mab9',
    },
    {
      type: 'Feature',
      properties: {
        mag: 4.8,
        place: '2024 Whitehouse Station, New Jersey Earthquake',
        time: 1712327000309,
        updated: 1712491504031,
        tz: null,
        url: 'https://earthquake.usgs.gov/earthquakes/eventpage/us7000ma74',
        detail:
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000ma74.geojson',
        felt: 181993,
        cdi: 6.5,
        mmi: 6.36,
        alert: 'green',
        status: 'reviewed',
        tsunami: 1,
        sig: 1004,
        net: 'us',
        code: '7000ma74',
        ids: ',at00sbh3yv,us7000ma74,',
        sources: ',at,us,',
        types:
          ',dyfi,earthquake-name,general-text,ground-failure,impact-link,losspager,moment-tensor,oaf,origin,phase-data,shakemap,',
        nst: 233,
        dmin: 0.642,
        rms: 0.66,
        gap: 54,
        magType: 'mwr',
        type: 'earthquake',
        title: 'M 4.8 - 2024 Whitehouse Station, New Jersey Earthquake',
      },
      geometry: {
        type: 'Point',
        coordinates: [-74.754, 40.689, 4.7],
      },
      id: 'us7000ma74',
    },
  ],
};
