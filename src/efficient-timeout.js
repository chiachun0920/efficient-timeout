import PriorityQueue from './priority-queue';
import uuid from 'uuid/v4';

class EfficientTimeout {

  constructor() {
    this.PQ = new PriorityQueue((a, b) => a.timestamp < b.timestamp);
    this.activeTimer = null;
  }

  setTimeout(callback = () => {}, milliseconds) {
    if (milliseconds === undefined) {
      throw new Error('error/invalid-arguments');
    }
    let job = { _id: uuid(), timestamp: Date.now() + milliseconds, work: callback };
    this.PQ.push(job);

    this.checkPeek(job);
  }

  schedule(job) {
    let { date, callback = () => {} } = job;

    try {
      date = this.checkDate(date);
    } catch (e) {
      throw e;
    }

    let _job = { _id: uuid(), timestamp: date.getTime(), work: callback };
    this.PQ.push(_job);

    this.checkPeek(_job);
  }

  checkDate(date) {
    if (date instanceof Date) {
      return date;
    }
    if (typeof(date) === 'number') {
      return new Date(date);
    }
    throw new Error('error/invalid-date');
  }

  checkPeek(job) {
    if (!job) {
      return;
    }

    if (this.activeTimer && this.activeTimer._id !== this.PQ.peek()._id) {
      this.cancelTimer();
    }

    if (this.PQ.peek()._id === job._id) {
      this.startTimer(job);
    }
  }

  cancelTimer() {
    clearTimeout(this.activeTimer.timer);
    this.activeTimer = null;
  }

  startTimer(job) {
    this.activeTimer = {
      timer: null,
      _id: job._id
    };
    let { timestamp, work } = job;
    let duration = timestamp - Date.now();

    this.activeTimer.timer = setTimeout(() => {
      work();
      this.activeTimer = null;
      this.PQ.pop();
      this.checkPeek(this.PQ.peek());
    }, duration > 0 ? duration : 0);
  }
}

export default EfficientTimeout;
