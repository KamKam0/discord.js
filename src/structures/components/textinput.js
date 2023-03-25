const base = require("../bases/components/base")
const textInputTypes = require("../../types/textinput")

class TextInput extends base{
    constructor(data){
        super()

        this.type = 4
        this.label = null
        this.style = null
        this.min_length = 1
        this.value = null
        this.max_length = 50
        this.placeholder = null
        this.required = true

        if(data) this._handleInitiationData(data)
    }

    setMaxLength(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 4000) return this
        else{
            if(this.min_length > num) this.max_length = this.min_length
            else this.max_length = num
        }
        return this
    }

    setMinLength(num){
        if(!num || isNaN(num) || Number(num) < 0 || Number(num) > 4000) return this
        else{
            if(this.max_length < num) this.min_length = this.max_length
            else this.min_length = num
        }
        return this
    }

    setPlaceHolder(texte){
        if(typeof texte !== "string" || texte.length < 1 || texte.length > 100) return this
        else this.placeholder = texte
        return this
    }

    setRequired(state){
        if(typeof state !== "boolean") return this
        else this.required = state
        return this
    }

    setStyle(style){
        let styleValue = textInputTypes.types[style] || textInputTypes.revert()[style]
        if(!styleValue) return this

        this.style = styleValue
        
        return this
    }

    setValue(value){
        if(typeof value !== "string" || value.length < 1 || value.length > 4000) return this
        else this.value = String(value)
        return this
    }

    setLabel(label){
        if(typeof label !== "string" || label.length < 1 || label.length > 75) return this
        else this.label = String(label)
        return this
    }
}

module.exports = TextInput