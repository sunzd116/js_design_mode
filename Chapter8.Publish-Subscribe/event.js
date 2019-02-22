//
class EventCenter {}

class EventHost {
  constructor() {
    this.eventMap = {};
    this.offlineEventTrigerMap = {};
  }

  listen(eventName, fn) {
    // 若有离线事件则执行离线事件
    if (this.offlineEventTrigerMap[eventName]) {
      const offlineEventArr = this.offlineEventTrigerMap[eventName];
      for (let i = 0; i < offlineEventArr.length; i++) {
        if ((fn.once && i === 0) || !fn.once) {
          fn.apply(this, offlineEventArr[i].args);
        }
        fn.executed = true;
      }
      this.offlineEventTrigerMap[eventName] = null;
    }

    this.eventMap[eventName] = this.eventMap[eventName] || [];
    if(!(fn.once && fn.executed)){
      this.eventMap[eventName].push(fn);
    }
  }

  triger(eventName, ...args) {
    if (!this.eventMap[eventName]) {
      // 缓存至离线事件
      this.offlineEventTrigerMap[eventName] =
        this.offlineEventTrigerMap[eventName] || [];
      this.offlineEventTrigerMap[eventName].push({
        args: args
      });
      return;
    }
    for (let i = 0; i < this.eventMap[eventName].length; i++) {
      const current = this.eventMap[eventName][i];
      // 此处可能是异步函数，怎么处理呢
      current.apply(this, args);
      if (current.once) {
        this.eventMap[eventName].splice(i, 1);
      }
    }
  }

  remove(eventName, fn) {
    const currentCallbackArr = this.eventMap[eventName] || [];
    for (let i = 0; i < currentCallbackArr.length; i += 1) {
      if (currentCallbackArr[i] === fn) {
        currentCallbackArr.splice(i, 1);
      }
    }
    return;
  }

  once(eventName, fn) {
    fn.once = true;
    this.listen(eventName, fn);
  }
}

const myEvent = new EventHost();

myEvent.triger("online", new Date());

// console.log(new Date());
// setTimeout(function(){
//   myEvent.listen('online',function(time){
//     console.log('online time,', time);
//   })
// }, 10000);

// class 的情况测试this的指向
class Test {
  constructor() {
    this.name = "water";
  }

  arrowFunctionListen() {
    myEvent.listen("online", time => {
      console.log("this in arrowFunctionListen:", this);
      console.log(`${this.name} online at ${time}`);
    });
  }

  normalFunctionListen() {
    myEvent.listen(
      "online",
      function(time) {
        console.log("this in normalFunctionListen:", this);
        console.log(`${this.name} online at ${time}`);
      }.bind(this)
    );
  }

  onceListen() {
    myEvent.once(
      "online",
      function(time) {
        console.log(`${this.name} online at ${time}`);
      }.bind(this)
    );
  }
}

const test = new Test();
// test.arrowFunctionListen();
test.normalFunctionListen();
test.onceListen();
myEvent.triger("online", new Date());
