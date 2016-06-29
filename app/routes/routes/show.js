import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('route', params.route_id, { reload: true });
  },

  actions: {
    didTransition: function() {
      this.controllerFor('routes').set('currentRoute', this.currentModel);
    }
  }
});
