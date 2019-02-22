## 学习本书的目的
学习更好的js代码组织方式
## 目标
熟悉常用的设计模式并将其运用在日常工作当中。
## flag
使用设计模式来完成单元格协同中对管理用户信息的重构工作。

## 设计原则学习
#### 1、开放封闭原则
类里的代码是可以扩展但是不能修改的

#### 2、单一职责原则
一个对象或者一个函数负责的职责尽量单一，低聚合

## 设计模式学习
通过合理使用设计模式使模块之间的耦合程度降低，可扩展性高
优秀代码的评判标准：可维护性，各个模块之间的耦合度，可扩展性，性能

#### 装饰器模式
在不改变原有方法的情况下在给原有方法加前置和后置方法
面向切片编程

#### 策略模式
通过传入不同的参数，选择不同的策略。
一般的形式如下： 
```
strategyMap {
    A: function(){},
    B: function(){},
    C: function(){},
}

strategyMap['A']()
```

#### 状态模式
给对象定义不同的状态，且在不同的状态下，对象有不同的行为。
对比策略模式，状态模式强调的是内部状态的变化。
```
class Light{
    constructor(){
        this.offState = new OffState();
        this.onState = new OnState();
        this.state = this.offState;
    }
    buttonPress(){
        state.change();
    }
}

class OffState{
    constructor(host){
        this.host = host;
    }
    change(){
        this.host.state = this.state.onState;
    }
}

class OnState{
    constructor(host){
        this.host = host;
    }
    change(){
        this.host.state = this.state.offState;
    }
}

```

#### 单例模式
惰性单例模式只在合适的场合才制造对象，并且只创造一个


#### 发布-订阅模式
解决了模块之间的强耦合性

#### 命令模式
将请求封装为一个对象，解除请求接受者和发起者之间的耦合
