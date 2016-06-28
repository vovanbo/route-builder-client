import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('route');
  },

  actions: {
    viewRoute(route) {
      this.transitionTo('index.route', route);
    }
  }
});
