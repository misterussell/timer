import Backbone from 'backbone';

export default Backbone.Collection.extend({
  url: 'http://api.backendless.com/v1/data/Templates',
  parse(data) {
    return data.data;
  }
});
