const Choice = require("./commandchoice")
const Base = require("../bases/commands/base")
const optionTypes = require("../../types/option")
class Option extends Base{
    constructor(option){
        super(option)
        this.type = option.type || 3
        this.required = option.required || false
        this.choices = option.choices ? option.choices.map(cho => new Choice(cho)) : []
        this.min_value = option.min_value || 0
        this.max_value = option.max_value || 1000000000
        this.min_length = option.min_length || 1
        this.max_length = option.max_length || 6000
        this.autocomplete = option.autocomplete ?? false
    }

    setMinValue(value){
        return this._setNumber("min_value", value, 1000000000)
    }

    setMaxValue(value){
        return this._setNumber("max_value", value, 1000000000)
    }

    setMinLength(value){
        return this._setNumber("min_length", value, 6000)
    }

    setMaxLength(value){
        return this._setNumber("max_length", value, 6000)
    }
       
    setType(type){
        if(optionTypes.types[type] || optionTypes.revert()[type]) this.type = optionTypes.types[type] || optionTypes.revert()[type]
        return this
    }

    setRequired(bool){
        return this._setBoolean("required", bool)
    }

    setAutoComplete(bool){
        return this._setBoolean("autocomplete", bool)
    }

    addChoice(obj){
        if(!(obj instanceof Choice) && (typeof obj !== "object" || typeof obj.value !== "string" || typeof obj.name !== "string")) return this
        if(obj instanceof Choice) this.choices.push(obj)
        else this.choices.push(new Choice(obj))
        return this
    }

    addChoices(array){
        if(!Array.isArray(array)) array = undefined
        let choices = array || [...arguments]
        choices.filter(e => typeof e === "object").forEach(choice => this.addChoice(choice))
        return this
    }
}

module.exports = Option