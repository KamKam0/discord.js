const constances = require("../../../utils/constants")

class commandBase {
    constructor(){
        this.name = null
        this.name_localizations = {}
        this.description = null
        this.description_localizations = {}
    }

    setName(name){
        return this._setString("name", name, 32)
    }

    setNameLocalization(object){
        let check = this._setLocalisation(object, 32)
        if(check) this.name_localizations = object
        return this
    }

    setDescriptions(description){
        return this._setString("description", description, 100)
    }

    setDescriptionLocalizations(object){
        let check = this._setLocalisation(object, 100)
        if(check) this.name_localizations = object
        return this
    }
    
    _handleInitiationData(data){
        if(typeof data !== "object") return this
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(method => method !== "constructor")
        methods.push(...Object.getOwnPropertyNames(commandBase.prototype).filter(method => !["constructor", "handleInitiationData"].includes(method)))

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

    _setLocalisation(object, length){
        if(typeof object !== "object" || Object.entries(object).length < 1) return false
        const languages = constances.languagesAvailable
        let filteredObject = Object.entries(object).filter(correspondance => {
            let language = languages.find(langue => langue.name === correspondance[0])
            let description = (typeof correspondance[1] !== "string" || correspondance[1].length > length || correspondance[1].length < 1)
            if(!language || !description) return false
            return true
        })
        if(filteredObject.length !==  Object.entries(object).length) return false
        return true
    }

    _setString(property, value, length){
        if(typeof value !== "string" || value.length > length || value.length < 1) return this
        this[property] = value
        return this
    }

    _setNumber(property, value, length){
        if(typeof value !== "number" || value > length || value < 1) return this
        this[property] = value
        return this
    }

    _setBoolean(property, value){
        if(typeof value !== "boolean") return this
        this[property] = value
        return this
    }

    compare(slash){
        for (const point of Object.keys(this).filter(e => !["id", "version", "application_id", "onlydm"].includes(e))){
            let point2 = slash[point]
            if(["description_localizations", "name_localizations"].includes(point)){
                let ppoint = Object.entries(this[point])
                let ppoint2 = Object.entries(point2)
                let errors
                ppoint.forEach(po => {
                    let po2 = ppoint2.find(e => e[0] === po[0])
                    if(!po2) errors = true
                    else if(po[1] !== po2[1]) errors=true
                })
                if(errors) return false
            }else if(["options", "choices"].includes(point)){
                for(const option of this[point]){
                    if(!point2.find(opt => opt.name === option.name)) return false
                    if(!option.compare(point2.find(opt => opt.name === option.name))) return false
                }
                for(const option of slash[point]) if(!this[point].find(opt => opt.name === option.name)) return false
            }else if(this[point] !== point2) return false
        }
        return true
    }
}

module.exports = commandBase