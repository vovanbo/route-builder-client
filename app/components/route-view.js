import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setupBounds(map) {
      let bounds = this.get('route').get('bounds');
      map.fitBounds([
        [bounds.southwest.lat, bounds.southwest.lng],
        [bounds.northeast.lat, bounds.northeast.lng]
      ])
    }
  }
});
