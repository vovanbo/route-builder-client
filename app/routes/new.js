import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition() {
      this.controller.set('routePreview', undefined);
      this.controller.set('isReadyToCreate', false);
      this.controller.set('formErrors', undefined);
      return true;
    },

    loading(transition, originRoute) {
      this.controller.set('isLoading', true);
      transition.promise.finally(function() {
          this.controller.set('isLoading', false);
      });
    }
  }
});
