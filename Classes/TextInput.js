class TextInput {
    constructor(){
        this.type = 4
        this.custom_id = null
        this.label = null
        this.style = null
        this.min_length = 1
        this.value = null
        this.max_length = 50
        this.placeholder = null
        this.required = true
    }
    
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }

    setMaxLength(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 4000) this.max_length = null
        else{
            if(this.min_length > num) this.max_length = this.min_length
            else this.max_length = num
        }
        return this
    }

    setMinLength(num){
        if(!num || isNaN(num) || Number(num) < 0 || Number(num) > 4000) this.min_length = null
        else{
            if(this.max_length < num) this.min_length = this.max_length
            else this.min_length = num
        }
        return this
    }

    setPlaceHolder(texte){
        if(!texte || !isNaN(texte) || texte.length < 1 || texte.length > 100) this.placeholder = null
        else this.placeholder = texte
        return this
    }

    setRequired(state){
        if(typeof state !== "boolean") this.required = null
        else this.required = state
        return this
    }

    setStyle(style){
        if(!style || !isNaN(style)) this.style = null
        else{
            const conv = {
                "short": 1,
                "long": 2
            }
            style = conv[String(style).toLowerCase()]
            if(!style) this.style = null
            else this.style = style
        }
        return this
    }

    setValue(value){
        if(!value || value.length < 1 || value.length > 4000) this.value = null
        else this.value = String(value)
        return this
    }

    setLabel(label){
        if(!label || label.length < 1 || label.length > 75) this.label = null
        else this.label = String(label)
        return this
    }
}

module.exports = TextInput