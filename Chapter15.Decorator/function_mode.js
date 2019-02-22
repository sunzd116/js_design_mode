function addBefore(func, beforeFunc){
    return function(){
        beforeFunc.apply(this, arguments);
        return func.apply(this, arguments);
    }
}

function addAfter(func, afterFunc){
    return function(){
        const ret = func.apply(this, arguments);
        afterFunc.apply(this, arguments);
        return ret;
    }
}

function beforeTest() {
    console.log("this:", this);
    console.log('before test');
}

function afterTest() {
    console.log('after test');
}

const dev = {
    name: 'snake',
}

dev.test = function() {
    console.log(`I am ${this.name}`);
}
dev.test = addBefore(dev.test, beforeTest);
dev.test = addAfter(dev.test, afterTest);
dev.test();