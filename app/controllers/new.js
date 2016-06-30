import Ember from 'ember';

export default Ember.Controller.extend({
  origin: 'Санкт-Петербург',
  destination: 'Москва',

  actions: {
    resetForm() {
      this.set('isReadyToCreate', false);
      this.set('formErrors', undefined);
      this.set('routePreview', undefined);
    },

    createRoute() {
      let origin = this.get('origin');
      let destination = this.get('destination');
      let isReadyToCreate = this.get('isReadyToCreate');
      if (isReadyToCreate) {
        this.set('isLoading', true);
        let routePreview = this.get('routePreview');
        let routeProperties = routePreview.getProperties(
          'origin', 'originName', 'destination', 'destinationName',
          'bounds', 'polyline'
        );
        let newRoute = this.store.createRecord('route', routeProperties);
        newRoute.save().then((result) => {
          newRoute.set('id', result.get('id'));
          newRoute.set('created', result.get('created'));
          this.set('isLoading', false);
          this.transitionToRoute('routes.show', newRoute.get('id'));
        });
      }
      else {
        this.set('isLoading', true);
        this.store.query('direction', { origin: origin, destination: destination })
          .then((directions) => {
            return directions.get('firstObject');
          })
          .then((direction) => {
            this.set('isLoading', false);
            if (direction) {
              let route = direction.get('route');
              let leg = route.legs[0];
              let fullPolyline = {
                'type': 'LineString',
                'coordinates': []
              }
              leg.steps.forEach(function(step) {
                let geoJsonPoints = polyline.toGeoJSON(step.polyline.points);
                geoJsonPoints.coordinates.forEach(function(point) {
                  fullPolyline.coordinates.push(point);
                })
              });
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
                "polyline": fullPolyline
              });
              this.set('isReadyToCreate', true);
              this.set('routePreview', routePreview);
            }
            else {
              // this.set('isFormHasErrors', true);
              this.set('formErrors', ['Route cannot be builded for passed points.'])
            }
          }).catch((error) => {
            Ember.Logger.info(error);
          });
      }
    }
  }
});
