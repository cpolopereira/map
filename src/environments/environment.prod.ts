export const environment = {
  production: true,
  mapbox: {
    accessToken: 'your_mapbox_api_key',
    country: 'CL',
    addressesLimit: '5',
    zoom: 12
  },
  addressSource: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  poligonSource: './assets/barrios_t1.geojson.json',
  property: 'score'
};
