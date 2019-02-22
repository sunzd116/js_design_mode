class consoleProxy{
    constructor(){
        this.data = [];
    }

    log(msg){
        this.data.push(msg);
        if (window.miniconsoleLoaded) {
            window._miniconsole.log(msg);
        }
    }

}

window.miniconsole = new consoleProxy();