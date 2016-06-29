import Ember from 'ember';

export default Ember.Route.extend({
  fetchRoutes() {
    return this.store.findAll('route', { reload: true });
  },

  model() {
    return this.fetchRoutes();
  },

  actions: {
    didTransition: function() {
      this.controller.set('currentRoute', undefined);
      Ember.Logger.info('index.js didTransition', this.controller.get('currentRoute'));
    },

    viewRoute(route) {
      this.controller.set('currentRoute', route);
      this.transitionTo('index.route', route.id);
    },

    removeRoute(route) {
      route.destroyRecord();
    },

    refresh() {
      this.controller.set('currentRoute', undefined);
      this.store.unloadAll('route');
      this.set('model', this.fetchRoutes());
      this.transitionTo('index');
    }
  }
});
