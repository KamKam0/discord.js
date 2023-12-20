const origin = require("../bases/components/base")
const constants = require("../../utils/constants")
const utils = require("../../utils/functions")

class Embed extends origin{
    constructor(data={}){
        super(data)
        this.title = data.title || null
        this.description = data.description || null
        this.type = data.type || "rich"
        this.url = data.url || null
        this.color = data.color || null
        this.timestamp = data.timestamp || null
        this.fields = data.fields || []
        this.thumbnail = data.thumbnail || {url: null, proxy_url: null, height: null, width: null}
        this.image = data.image || {url: null, proxy_url: null, height: null, width: null}
        this.video = data.video || {url: null, proxy_url: null, height: null, width: null}
        this.author = data.author || {url: null, icon_url: null, name: null, proxy_icon_url: null}
        this.provider = data.provider || {url: null, name: null}
        this.footer = data.footer || {icon_url: null, text: null, proxy_icon_url: null}
    }
    
    /**
    * @param {string} description
    * @returns {Embed}
    */
    setDescription(description){
        if (typeof description === 'number') description = String(description)
        if(!description || typeof description !== "string" || description.length > 4096) return this
        else this.description = description
        return this
    }

    /**
    * @param {string} title 
    * @returns {Embed}
    */
    setTitle(title){
        if (typeof title === 'number') title = String(title)
        if(!title || typeof title !== "string" || title.length > 256) return this
        else this.title = title
        return this
    }

    /**
    * @param {string} url
    * @returns {Embed}
    */
    setURL(url){
        if(!url) return this
        if(typeof url !== "string" || url.length > 1000 || !url.split("http")[1]) return this
        else this.url = url
        return this
    }

    /**
    * @param {string} color
    * @returns {Embed}
    */
    setColor(color){
        if(!color) return this
        let list = ["DEFAULT", "AQUA","BLUE","DARK","DEFAULT","FUCHSIA","GOLD","GREEN","GREY","NAVY","ORANGE","PURPLE","RANDOM","RED","WHITE","YELLOW"]
        if(!list.includes(color) && utils.checks.checkColor(color) === false) return this
        if(list.includes(color)){
            const Colors = constants.colors
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
        if(!thumbnail) return this
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
        if((typeof image !== "string" || image.length > 1000) && (typeof image !== "object" || typeof image.url !== "string")) return this
        if(typeof image === "string"){
            if(image.startsWith("http")) this.image = {url: image}
            else{
                let splitted = image.split(".")
                let extension = splitted[splitted.length  - 1].toLowerCase()
                let extensions = ["jpg", "jpeg", "png", "webp", "gif"]
                if(image.includes(".") && extensions.find(ext => ext === extension)) this.image = {url: `attachment://${image}`}
            }

            return this
        } 
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
        if(!author) return this
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
        if(!author) return this
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
        if(!author) return this
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
        if(!name) return this
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
        if(!icon) return this
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
        if (this.fields.length === 25) {
            return this
        }
        if (typeof name === 'number') name = String(name)
        if (typeof value === 'number') value = String(value)
        if(typeof name !== "string" || name.length > 256 || typeof value !== "string" || value.length > 1024) return this
        this.fields.push({name: name, value: value, inline: inline ?? false})
        return this
    }
}

module.exports = Embed