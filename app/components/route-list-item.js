import Ember from 'ember';

export default Ember.Component.extend({
  // isCurrentRoute: Ember.computed.equal('id', 'currentRouteID'),
  actions: {
    viewRoute(route) {
      this.sendAction('viewRoute', route);
    }
  }
});
