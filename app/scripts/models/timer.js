import Backbone from 'backbone';

import store from '../store';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'http://api.backendless.com/v1/data/Templates',
  createTimer(object) {
    console.log(object);
  }
});
