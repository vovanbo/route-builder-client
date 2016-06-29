import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showRoute(route) {
      this.sendAction('showRoute', route);
    },

    removeRoute(route) {
      this.sendAction('removeRoute', route);
    }
  }
});
