const origin = require("./origin")

class componentBase extends origin{
    
    constructor(){
        super()
        this.custom_id = null
    }
    
    /**
    * @param {string} ID
    * @returns {Button}
    */
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }
    
    _handleInitiationData(data){
        if(typeof data !== "object") return this
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => method !== "constructor")
        methods.push(...Object.getOwnPropertyNames(componentBase.prototype).filter(method => !["constructor", "handleInitiationData"].includes(method)))

        let modifiedData = Object.entries(data)
        .map(element => { 
            element[0] = element[0].split("_").join("").toLowerCase()
            return {name: element[0], value: element[1]}
        })

        methods
        .map(method => {
            let returnedObject = {original: method, transformed: null, value: null}
            method = method.split("_").join("").toLowerCase().slice(3)
            returnedObject.transformed = method
            returnedObject.value = modifiedData.find(modifiedDataValue => modifiedDataValue.name === method)?.value
            return returnedObject
        })
        .filter(element => element.value || element.value === false)
        .forEach(element => {
            this[element.original](element.value)
        })
    }
}

module.exports = componentBase