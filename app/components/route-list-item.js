import Ember from 'ember';

export default Ember.Component.extend({
  isCurrentRoute: Ember.computed('currentRoute', 'route', function() {
    let currentRoute = this.get('currentRoute');
    if (currentRoute) {
      return currentRoute.get('id') == this.get('route').get('id')
    }
    else {
      return false;
    }
  }),

  actions: {
    showRoute(route) {
      this.sendAction('showRoute', route);
    },

    removeRoute(route) {
      this.sendAction('removeRoute', route);
    }
  }
});
