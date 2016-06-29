import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      this.controller.set('routePreview', undefined);
      return true;
    }
  }
});
