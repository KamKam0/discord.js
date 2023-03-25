const base = require("../bases/components/base")
const buttonTypes = require("../../types/button")
class Button extends base{
    
    constructor(data){
        super()

        this.type = 2
        this.style = null
        this.label = null
        this.emoji = null
        this.url = null
        this.disabled = null

        if(data) this._handleInitiationData(data)
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
        if(!emoji || (typeof emoji !== "string" && (typeof emoji !== "object" || typeof emoji.animated !== "boolean" || (typeof emoji.id !== "string" && emoji.id !== null) || typeof emoji.name !== "string"))) return this
        else if(!isNaN(emoji)) this.emoji = { animated: false, name:  emoji, id: null} 
        else this.emoji = emoji
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