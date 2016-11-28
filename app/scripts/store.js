import User from './models/user';
import Timer from './models/timer';
import Timers from './collections/timers';

export default {
  user: new User(),
  timer: new Timer(),
  timers: new Timers()
};
