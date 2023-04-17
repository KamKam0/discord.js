const base = require("../bases/components/base")
const menuTypes = require("../../types/contextmenu")
const selectOption = require("./selectoption")

class SelectMenu extends base{

    constructor(data={}){
        super(data)
        
        this.type = data.type || 3
        this.options = data.options ? data.options.map(option => new selectOption(option)) : []
        this.placeholder = data.placeholder || null
        this.min_values = data.min_values || 1
        this.max_values = data.max_values || 1
        this.disabled = data.disabled || false
    }
    
    setDisabled(state){
        if(typeof state !== "boolean") this.disabled = null
        else this.disabled = state
        return this
    }

    setMaxValues(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 25) return this
        else{
            if(this.min_values > num) this.max_values = this.min_values
            else this.max_values = num
        }
        return this
    }

    setMinValues(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 25) return this
        else{
            if(this.max_values < num) this.min_values = this.max_values
            else this.min_values = num
        }
        return this
    }

    setPlaceHolder(texte){
        if(typeof texte !== "string" || texte.length < 1 || texte.length > 100)return this
        else this.placeholder = texte
        return this
    }

    addOption(obj){
        if(this.type !== menuTypes.types["String"]) return this
        if(obj instanceof selectOption){
            this.options.push(obj)
            return this
        }
        if(!obj || typeof obj !== "object" || !obj.label || !obj.value) return this
        let instanceOption = new selectOption()
        .setDescription(obj.description)
        .setEmoji(obj.emoji)
        .setLabel(obj.label)
        .setValue(obj.value)
        
        this.options.push(instanceOption)
        return this
    }

    setType(type){
        let verifiedType = menuTypes.types[type]
        if(!verifiedType) return this

        this.type = verifiedType
        
        return this
    }

    addOptions(array){
        if(this.type !== menuTypes.types["String"]) return this
        if(!Array.isArray(array)) array = undefined
        let options = array || [...arguments]
        options.forEach(obj => this.addOption(obj))
        return this
    }
}

module.exports = SelectMenu