'use strict'

class App{
    
    constructor(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    render(elName){
        const el = document.querySelector(elName)
        if(el != null){
            console.log(el)
            el.innerHTML = this.name
        }            
    }

    something(){
        console.log("something")
    }

}


const app = new App('Hello World')
app.render('#app')
