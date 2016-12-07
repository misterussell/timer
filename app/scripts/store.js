import User from './models/user';
import Timer from './models/timer';
import Timers from './collections/timers';
import TimerStat from './models/timerStat';
import TimerStats from './collections/timerStats';

export default {
  user: new User(),
  timer: new Timer(),
  timers: new Timers(),
  timerStat: new TimerStat(),
  timerStats: new TimerStats()
};
