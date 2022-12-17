class Button {
    constructor(){
        this.type = 2
        this.style = null
        this.label = null
        this.emoji = null
        this.custom_id = null
        this.url = null
        this.disabled = null
    }

    /**
    * @param {string} style
    * @returns {Button}
    */
    setStyle(style){
        if(!style || !isNaN(style)) this.style = null
        else{
            const conv = {
                "PRIMARY": 1,
                "SECONDARY": 2,
                "SUCCESS": 3,
                "DANGER": 4,
                "LINK": 5
            }
            style = conv[String(style).toUpperCase()]
            if(!style) this.style = null
            else this.style = style
        }
        return this
    }

    /**
    * @param {string} emoji
    * @returns {Button}
    */
    setEmoji(emoji){
        if(!emoji || !isNaN(emoji)) this.emoji = null
        else this.emoji = {"animated":false,"name": emoji,"id":null} 
        return this
    }

    /**
    * @param {string} label
    * @returns {Button}
    */
    setLabel(label){
        if(!label || !isNaN(label) || label.length < 1 || label.length > 75) this.label = null
        else this.label = label
        return this
    }

    /**
    * @param {string} ID
    * @returns {Button}
    */
    setCustomID(ID){
        if(!ID || !isNaN(ID) || ID.length < 1 || ID.length > 75) this.custom_id = null
        else this.custom_id = ID
        return this
    }

    /**
    * @param {string} url
    * @returns {Button}
    */
    setURL(url){
        if(!url || !isNaN(url) || !url.includes("http")) this.url = null
        else this.url = url
        return this
    }

    /**
    * @param {string} state
    * @returns {Button}
    */
    setDisabled(state){
        if(!state || typeof state !== "boolean" || !["true", "false"].includes(String(state))) this.disabled = null
        else{
            if(String(state) === "true") this.disabled = true
            if(String(state) === "false") this.disabled = false
        }
        return this
    }
}

module.exports = Button