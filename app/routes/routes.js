import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('route', { reload: true });
  },

  actions: {
    didTransition: function() {
      this.controller.set('currentRoute', undefined);
      return true;
    },

    showRoute(route) {
      this.controller.set('currentRoute', route);
      this.transitionTo('routes.show', route.id);
    },

    removeRoute(route) {
      let currentRoute = this.controller.get('currentRoute');
      route.destroyRecord().then(() => {
        if (currentRoute == route) {
          this.controller.set('currentRoute', undefined);
          this.transitionTo('routes');
        }
      });
    },

    refreshList() {
      this.controller.set('currentRoute', undefined);
      this.store.unloadAll('route');
      this.store.findAll('route', { reload: true }).then(() => {
        this.transitionTo('routes');
      });
    }
  }
});
