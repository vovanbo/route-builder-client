import Model from 'ember-data/model';
import attr from 'ember-data/attr';

// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  origin: attr(),
  originName: attr('string'),
  destination: attr(),
  destinationName: attr('string'),
  polyline: attr(),
  bounds: attr(),
  created: attr('date')
});
