'use strict'

var something = "hello"

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

    something(name){
        console.log(name)
    }

}


const app = new App('Hello World')

something = "helloworld"


app.render('#app')
app.something(something)
