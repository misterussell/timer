import Backbone from 'backbone';

import Timer from '../models/timer';

export default Backbone.Collection.extend({
  model: Timer,
  url: 'http://api.backendless.com/v1/data/Templates',
  parse(data) {
    return data.data;
  }
});
