import Ember from 'ember';

export default Ember.Component.extend({
  mapLayers: [],

  addGeoJSON() {
    let map = this.get('map');
    let route = this.get('route');
    let origin = L.geoJson(route.get('origin'), {
      onEachFeature(feature, layer) {
        layer.bindPopup(route.get('originName'));
      }
    });
    let destination = L.geoJson(route.get('destination'), {
      onEachFeature(feature, layer) {
        layer.bindPopup(route.get('destinationName'));
      }
    });
    let polyline = L.geoJson(route.get('polyline'));
    this.mapLayers.push(origin, destination, polyline);
    origin.addTo(map);
    destination.addTo(map);
    polyline.addTo(map);
  },

  setBounds() {
    let map = this.get('map');
    let bounds = this.get('route').get('bounds');
    map.fitBounds([
      [bounds.southwest.lat, bounds.southwest.lng],
      [bounds.northeast.lat, bounds.northeast.lng]
    ])
  },

  refreshMap: function() {
    let map = this.get('map');
    this.mapLayers.forEach(function(layer) {
      map.removeLayer(layer);
    });
    this.mapLayers = [];
    // map.eachLayer(function (layer) {
    //   map.removeLayer(layer);
    // });
    this.addGeoJSON();
    this.setBounds();
  }.on('didUpdateAttrs'),

  actions: {
    // Invoked on-load
    setupRoute(map) {
      this.set('map', map);
      this.addGeoJSON();
      this.setBounds();
    }
  }
});
