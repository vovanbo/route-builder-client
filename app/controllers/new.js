import Ember from 'ember';
// import { polyline } from 'bower_components/polyline/src/polyline.js';

export default Ember.Controller.extend({
  origin: 'Санкт-Петербург',
  destination: 'Москва',

  actions: {
    createRoute() {
      let origin = this.get('origin');
      let destination = this.get('destination');
      Ember.Logger.info(origin, destination);
      this.store.query('direction', { origin: origin, destination: destination }).then((directions) => {
        return directions.get('firstObject');
      }).then((direction) => {
        let route = direction.get('route');
        let leg = route.legs[0];
        let routePreview = Ember.Object.create({
          "origin": {
            "type": "Point",
            "coordinates": [leg.start_location.lng, leg.start_location.lat]
          },
          "originName": leg.start_address,
          "destination": {
            "type": "Point",
            "coordinates": [leg.end_location.lng, leg.end_location.lat]
          },
          "destinationName": leg.end_address,
          "bounds": route.bounds,
          "polyline": polyline.toGeoJSON(route.overview_polyline.points)
        });
        Ember.Logger.info(routePreview);
        this.set('routePreview', routePreview);
      });
    }
  }
});
