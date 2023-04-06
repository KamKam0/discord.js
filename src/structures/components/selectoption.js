class selectOption {
    constructor(data={}){
        this.label = data.label || null,
        this.value = data.value || null,
        this.description = data.description || null,
        this.emoji = data.emoji || {
            name: null,
            id: null
        }
    }

    setEmoji(emoji){
        if(!emoji || (typeof emoji !== "string" && (typeof emoji !== "object" || (typeof emoji.id !== "string" && emoji.id !== null) || typeof emoji.name !== "string"))) return this
        else if(!isNaN(emoji)) this.emoji = { name:  emoji, id: null} 
        else this.emoji = emoji
        return this
    }

    setDescription(description){
        if(!description || typeof description !== "string" || description.length > 4096) return this
        else this.description = description
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

module.exports = selectOption