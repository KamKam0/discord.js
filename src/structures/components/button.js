const base = require("../bases/components/base")
const buttonTypes = require("../../types/button")
class Button extends base{
    
    constructor(data={}){
        super(data)

        this.type = 2
        this.style = data.style || null
        this.label = data.label || null
        this.emoji = data.emoji || null
        this.url = data.url || null
        this.disabled = data.disabled || null
    }

    /**
    * @param {string} style
    * @returns {Button}
    */
    setStyle(style){
        let styleValue = buttonTypes.types[style] || buttonTypes.revert()[style]
        if(!styleValue) return this

        this.style = styleValue
        
        return this
    }

    /**
    * @param {string} emoji
    * @returns {Button}
    */
    setEmoji(emoji){
        if(typeof emoji === "string") this.emoji = { animated: false, name:  emoji, id: null} 
        else if(typeof emoji === "object") this.emoji = emoji
        return this
    }

    /**
    * @param {string} label
    * @returns {Button}
    */
    setLabel(label){
        if(typeof label !== "string" || label.length < 1 || label.length > 75) return this
        else this.label = label
        return this
    }

    /**
    * @param {string} url
    * @returns {Button}
    */
    setURL(url){
        if(typeof url !== "string" || !url.includes("http")) return this
        else this.url = url
        return this
    }

    /**
    * @param {string} state
    * @returns {Button}
    */
    setDisabled(state){
        if(typeof state !== "boolean") return this
        else this.disabled = state
        return this
    }
}

module.exports = Button