class Embed {
    constructor(){
        this.title = null
        this.description = null
        this.type = "rich"
        this.url = null
        this.color = null
        this.timestamp = null
        this.fields = []
        this.thumbnail = null
        this.image = null
        this.video = null
        this.author = null
        this.provider = null
        this.footer = null
    }

    /**
    * @param {string} description
    * @returns {Embed}
    */
    setDescription(description){
        if(!description || description.length > 4000) this.description = null
        else this.description = description
        return this
    }

    /**
    * @param {string} title 
    * @returns {Embed}
    */
    setTitle(title){
        if(!title || title.length > 4000) this.title = null
        else this.title = title
        return this
    }

    /**
    * @param {string} url
    * @returns {Embed}
    */
    setURL(url){
        if(!url || url.length > 1000 || !url.split("http")[1]) this.url = null
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
        if(!list.includes(color) && require("../Utils/functions").check_color(color) === false) {
            color = null
            this.color = color
            return this
        }
        if(list.includes(color)){
            const Colors = require("../constants").Colors
            this.color = Colors[color]
        }
        else{
            this.color = parseInt(color.replace('#', ''), 16)
        }
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
        if(!thumbnail || thumbnail.length > 1000 || !thumbnail.split("http")[1]) this.thumbnail = null
        else{
            if(thumbnail.startsWith("https://cdn.discordapp.com/") && thumbnail.endsWith("null.gif")) this.thumbnail = this.thumbnail 
            else this.thumbnail = {url: thumbnail}
        }
        return this
    }

    /**
    * @param {string} image
    * @returns {Embed}
    */
    setImage(image){
        if(!image || image.length > 1000 || !image.split("http")[1]) this.image = null
        else{
            if(image.startsWith("https://cdn.discordapp.com/") && image.endsWith("null.gif")) this.image = this.image
            else this.image = {url: image}
        } 
        return this
    }

    /**
    * @param {string} string
    * @returns {Embed}
    */
    setAuthorName(string){
        if(!string || string.length > 1000) this.author = null
        if(this.author === null) this.author = {}
        this.author.name = string
        return this
    }

    /**
    * @param {string} url
    * @returns {Embed}
    */
    setAuthorURL(url){
        if(url && url.length < 1000 && url.split("http")[1]){
            if(this.author === null) this.author = {}
            this.author.url = url
        }
        return this
    }

    /**
    * @param {string} iconurl
    * @returns {Embed}
    */
    setAuthorIconURL(iconurl){
        if(iconurl && iconurl.length < 1000 && iconurl.split("http")[1]){
            if(this.author === null) this.author = {}
            if(iconurl.startsWith("https://cdn.discordapp.com/") && iconurl.endsWith("null.gif")) this.author = this.author
            else this.author.iconurl = iconurl
            
        }
        return this
    }

    /**
    * @param {string} name
    * @returns {Embed}
    */
    setFooterText(name){
        if(!name || name.length > 1000) this.footer = null
        if(this.footer === null) this.footer = {}
        this.footer.text = name
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
    * @param {array} fields
    * @returns {Embed}
    */
    addFields(fields){
        fields.forEach(field => {
            if(String(field.name) !== "undefined" && String(field.value) !== "undefined" && this.fields.length < 25){
                field = {name: field.name, value: field.value, inline: field.inline ? field.inline : false}
                this.fields.push(field)
            }
        })
        return this
    }

    /**
    * @param {string} name
    * @param {string} value
    * @param {string} inline
    * @returns {Embed}
    */
    addField(name, value, inline){
        if(String(name) !== "undefined" && String(value) !== "undefined" && this.fields.length < 25){
            let field = {name: name, value: value, inline: inline ? inline : false}
            this.fields.push(field)
        }
        return this
    }
}

module.exports = Embed