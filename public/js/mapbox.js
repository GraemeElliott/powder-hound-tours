/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log (locations)

mapboxgl.accessToken = 'pk.eyJ1IjoiZGltZWRvdXQiLCJhIjoiY2swOXF0bHBwMGFzYTNicXZpN3FzaHhnZCJ9.3TMcO4udBHOGeK4qbV5xtg'; // Default Public Key
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dimedout/ck09r5l5o24wp1cnvxm5l2gbl',
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Add a marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  
  new mapboxgl.Popup({
    offset: 30
  }).setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    },
  });
});