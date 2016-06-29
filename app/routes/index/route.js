import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('route', params.route_id, { reload: true });
  },

  actions: {
    didTransition: function() {
      this.controllerFor('index').set('currentRoute', this.currentModel);
      Ember.Logger.info('route.js didTransition', this.controllerFor('index').get('currentRoute'));
    }
  }
});
