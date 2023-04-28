class selectOption {
    constructor(data={}){
        this.label = data.label || null,
        this.value = data.value || null,
        this.description = data.description || null
        this.default = false
        if(data.emoji) this.emoji = data.emoji
    }

    setEmoji(emoji){
        if(typeof emoji === "string") this.emoji = { name:  emoji, id: null} 
        else if(typeof emoji === "object") this.emoji = emoji
        return this
    }

    setDefault(state){
        if(typeof state !== "boolean") return this
        this.default = state
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