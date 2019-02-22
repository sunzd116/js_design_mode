const Person1 = {
  name: "little bear",
  age: 18,
  sayHello: () => {
    console.log("我叫" + this.name + "我今年" + this.age + "岁!");
    // setInterval(() => {
    //   console.log("我叫" + this.name + "我今年" + this.age + "岁!");
    // }, 1000);
  }
};

class Person3 {
  constructor(){
    this.sayHello = () => {
        console.log("我叫" + this.name + "我今年" + this.age + "岁!");
        setTimeout(() => {
        console.log("我叫" + this.name + "我今年" + this.age + "岁!");
        }, 1000);
    };
  }

  say(){

  }
}

// Person1.sayHello();
new Person2().sayHello();