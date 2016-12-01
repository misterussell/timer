import Backbone from 'backbone';
import { browserHistory } from 'react-router';

import store from '../store';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    timerValue: '',
    title: '',
    note: ''
  }
});
