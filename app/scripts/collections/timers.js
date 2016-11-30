import Backbone from 'backbone';

import Timer from '../models/timer';

export default Backbone.Collection.extend({
  model: Timer,
  parse(data) {
    return data.data;
  }
});
