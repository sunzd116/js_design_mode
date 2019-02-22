Function.prototype.before = function(fn){
    const _self = this;
    return function(){
        console.log('this in before', this);
        fn.apply(this, arguments);
        return _self.apply(this, arguments)
    }
}
Function.prototype.after = function(fn){
    const _self = this;
    return function(){
        console.log('this in after', this);
        const result = _self.apply(this, arguments)
        fn.apply(this, arguments);
        return result;
    }
}

function beforeTest(){
    console.log('before test');
}

function afterTest(){
    console.log('after test');
}

const dev = {
    name: 'snake',
}

dev.test = () => {
    console.log("this:", this);
    console.log(`I am ${this.name}`);
}
dev.test = dev.test.before(beforeTest);
dev.test = dev.test.after(afterTest);
dev.test();