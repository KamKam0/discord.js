const origin = require("../bases/components/base")

class Embed extends origin{
    constructor(data){
        super()
        this.title = null
        this.description = null
        this.type = "rich"
        this.url = null
        this.color = null
        this.timestamp = null
        this.fields = []
        this.thumbnail = {url: null, proxy_url: null, height: null, width: null}
        this.image = {url: null, proxy_url: null, height: null, width: null}
        this.video = {url: null, proxy_url: null, height: null, width: null}
        this.author = {url: null, icon_url: null, name: null, proxy_icon_url: null}
        this.provider = {url: null, name: null}
        this.footer = {icon_url: null, text: null, proxy_icon_url: null}

        if(data) this._handleInitiationData(data)
    }
    
    /**
    * @param {string} description
    * @returns {Embed}
    */
    setDescription(description){
        if(!description || description.length > 4096) return this
        else this.description = description
        return this
    }

    /**
    * @param {string} title 
    * @returns {Embed}
    */
    setTitle(title){
        if(!title || title.length > 256) return this
        else this.title = title
        return this
    }

    /**
    * @param {string} url
    * @returns {Embed}
    */
    setURL(url){
        if(typeof url !== "string" || url.length > 1000 || !url.split("http")[1]) return this
        else this.url = url
        return this
    }

    /**
    * @param {string} color
    * @returns {Embed}
    */
    setColor(color){
        if(!color) this.color = null
        let list = ["DEFAULT", "AQUA","BLUE","DARK","DEFAULT","FUCHSIA","GOLD","GREEN","GREY","NAVY","ORANGE","PURPLE","RANDOM","RED","WHITE","YELLOW"]
        if(!list.includes(color) && require("../utils/functions").check_color(color) === false) return this
        if(list.includes(color)){
            const Colors = require("../constants").Colors
            this.color = Colors[color]
        }
        else this.color = parseInt(color.replace('#', ''), 16)
        return this
    }

    setTimestamp(){
        this.timestamp = new Date(Date.now()).toISOString("ISO8601")
        return this
    }

    /**
    * @param {string} thumbnail
    * @returns {Embed}
    */
    setThumbnail(thumbnail){
        if((typeof thumbnail !== "string" || thumbnail.length > 1000 || !thumbnail.split("http")[1]) && (typeof thumbnail !== "object" || typeof thumbnail.url !== "string"))return this
        else if(typeof thumbnail === "string") this.thumbnail = {url: thumbnail}
        else this.thumbnail = thumbnail
        return this
    }

    /**
    * @param {string} image
    * @returns {Embed}
    */
    setImage(image){
        if((typeof image !== "string" || image.length > 1000 || !image.split("http")[1]) && (typeof image !== "object" || typeof image.url !== "string"))return this
        else if(typeof image === "string") this.image = {url: image}
        else this.image = image
        return this
    }

    /**
     * 
     * @param {object} object 
     * @returns {Embed}
     */
    setAuthor(object){
        this.setAuthorName(object)
        this.setAuthorIconURL(object)
        this.setAuthorURL(object)
        return this
    }

    /**
    * @param {string} string
    * @returns {Embed}
    */
    setAuthorName(author){
        if((typeof author !== "string" || author.length > 256) && (typeof author !== "object" || typeof author.name !== "string")) return this
        else if(typeof author === "string") this.author.name = author
        else this.author.name = author.name
        return this
    }

    /**
    * @param {string} author
    * @returns {Embed}
    */
    setAuthorURL(author){
        if((typeof author !== "string" || author.length > 1000 || !author.split("http")[1]) && (typeof author !== "object" || typeof author.url !== "string")) return this
        else if(typeof author === "string") this.author.url = author
        else this.author.url = author.url
        return this
    }

    /**
    * @param {string} author
    * @returns {Embed}
    */
    setAuthorIconURL(author){
        if((typeof author !== "string" || author.length > 1000 || !author.split("http")[1]) && (typeof author !== "object" || typeof author.icon_url !== "string")) return this
        else if(typeof author === "string") this.author.icon_url = author
        else this.author.icon_url = author.icon_url
        return this
    }

    /**
     * 
     * @param {object} object 
     * @returns {Embed}
     */
    setFooter(object){
        this.setFooterIconURL(object)
        this.setFooterText(object)
        return this
    }

    /**
    * @param {string} name
    * @returns {Embed}
    */
    setFooterText(name){
        if((typeof name !== "string" || name.length > 2048) && (typeof name !== "object" || typeof name.text !== "string")) return this
        else if(typeof name === "string") this.footer.text = name
        else this.footer.text = name.text
        return this
    }

    /**
    * @param {string} icon
    * @returns {Embed}
    */
    setFooterIconURL(icon){
        if(icon && icon.length < 1000 && icon.split("http")[1]){
            if(this.footer === null) this.footer = {}
            if(icon.startsWith("https://cdn.discordapp.com/") && icon.endsWith("null.gif")) this.footer = this.footer
            else this.footer.icon_url = icon
            
        }
        return this
    }

    /**
    * @param {object} fields
    * @returns {Embed}
    */
    addFields(array){
        if(!Array.isArray(array)) array = undefined
        let fields = array || [...arguments]
        fields.filter(e => typeof e === "object").forEach(field => this.addField(field.name, field.value, field.inline))
        return this
    }

    /**
    * @param {string} name
    * @param {string} value
    * @param {string} inline
    * @returns {Embed}
    */
    addField(name, value, inline){
        if(typeof name !== "string" || name.length > 256 || typeof value !== "string" || value.length > 1024) return this
        this.fields.push({name: name, value: value, inline: inline ?? false})
        return this
    }
}

module.exports = Embed