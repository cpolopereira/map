export const environment = {
  production: true,
  mapbox: {
    accessToken: 'pk.eyJ1IjoiY3BvbG9wZXJlaXJhY2wiLCJhIjoiY2tmc2QwYnczMDhkYTJybTZxdjE2cGp2ciJ9.dnN99V3A_-3_LKRQG27qXg',
    country: 'CL',
    addressesLimit: '5',
    zoom: 12
  },
  addressSource: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  poligonSource: './assets/barrios_t1.geojson.json',
  property: 'score'
};
