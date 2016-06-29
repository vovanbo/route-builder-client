import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    viewRoute(route) {
      this.sendAction('viewRoute', route);
    },

    removeRoute(route) {
      this.sendAction('removeRoute', route);
    }
  }
});
