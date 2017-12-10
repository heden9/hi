const Event = {
  listeners: {},
  addEvent(type, fn) {
    if (typeof this.listeners[type] === 'undefined') {
      this.listeners[type] = [];
    }
    if (typeof fn === 'function') {
      this.listeners[type].push(fn);
    }
    return this;
  },
  fireEvent(type, ...arg) {
    const arrayEvent = this.listeners[type];
    if (arrayEvent instanceof Array) {
      for (let i = 0, length = arrayEvent.length; i < length; i += 1) {
        if (typeof arrayEvent[i] === 'function') {
          arrayEvent[i](...arg);
        }
      }
    }
    return this;
  },
  removeEvent(type, fn) {
    const arrayEvent = this.listeners[type];
    if (typeof type === 'string' && arrayEvent instanceof Array) {
      if (typeof fn === 'function') {
        for (let i = 0, length = arrayEvent.length; i < length; i += 1) {
          if (arrayEvent[i] === fn) {
            this.listeners[type].splice(i, 1);
            break;
          }
        }
      } else {
        delete this.listeners[type];
      }
    }
    return this;
  },
};


export default Event;
