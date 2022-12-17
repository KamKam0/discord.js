class SelectMenu {
    constructor(){
        this.type = null
        this.custom_id = null
        this.options = []
        this.placeholder = null
        this.min_values = 1
        this.max_values = 1
        this.disabled = false
    }
    
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }
    
    setDisabled(state){
        if(!state || !isNaN(state) || ["true", "false"].includes(String(state))) this.state = null
        else{
            if(String(state) === "true") this.disabled = true
            if(String(state) === "false") this.disabled = false
        }
        return this
    }

    setMaxValues(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 25) this.max_values = null
        else{
            if(this.min_values > num) this.max_values = this.min_values
            else this.max_values = num
        }
        return this
    }

    setMinValues(num){
        if(!num || isNaN(num) || Number(num) < 1 || Number(num) > 25) this.min_values = null
        else{
            if(this.max_values < num) this.min_values = this.max_values
            else this.min_values = num
        }
        return this
    }

    setPlaceHolder(texte){
        if(!texte || !isNaN(texte) || texte.length < 1 || texte.length > 100) this.placeholder = null
        else this.placeholder = texte
        return this
    }

    addOption(obj){
        if(!obj || typeof obj !== "object" || !obj.label || !obj.value) return this
        if(!obj.label || !isNaN(obj.label) || obj.label.length < 1 || obj.label.length > 100) return this
        if(!obj.value || !isNaN(obj.value) || obj.value.length < 1 || obj.value.length > 100) return this
        let description = obj.description
        if(description) if(!isNaN(description) || description.length < 1 || description.length > 100) description = null
        if(!description) description = null
        let defaulte = obj.default
        if(defaulte) if(typeof defaulte !== "boolean") defaulte = null
        if(!defaulte) defaulte = null
        let emoji = obj.emoji
        if(emoji) if(typeof emoji !== "string") emoji = null
        if(!emoji) emoji = null
        this.options.push({label: obj.label, value: obj.value, description: description, default: defaulte, emoji: emoji})
        return this
    }

    setType(type){
        if(!type || isNaN(type) || Number(type) < 1 || Number(type) > 25) this.type = null
        this.type = type
        return this
    }

    addOptions(array){
        if(!array || !Array.isArray(array) || !array[0]) return this
        array.forEach(obj => {
            let e;
            if(!obj || typeof obj !== "object" || !obj.label || !obj.value) e = "error"
            if(!e) if(!obj.label || !isNaN(obj.label) || obj.label.length < 1 || obj.label.length > 100) e = "error"
            if(!e) if(!obj.value || !isNaN(obj.value) || obj.value.length < 1 || obj.value.length > 100) e = "error"
            if(!e) var description = obj.description
            if(!e) if(description) if(!isNaN(description) || description.length < 1 || description.length > 100) description = null
            if(!e) if(!description) description = null
            if(!e) var defaulte = obj.default
            if(!e) if(defaulte) if(typeof defaulte !== "boolean") defaulte = null
            if(!e) if(!defaulte) defaulte = null
            if(!e) var emoji = obj.emoji
            if(!e) if(emoji) if(typeof emoji !== "string") emoji = null
            if(!e)  if(!emoji) emoji = null
            if(!e) this.options.push({label: obj.label, value: obj.value, description: description, default: defaulte, emoji: emoji})
        })
        return this
    }
}

module.exports = SelectMenu