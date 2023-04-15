const event = require("node:events")
class Collector extends event{
    constructor(bot, type, type2, options={}){
        super()
        this.type = type
        this.type2 = type2
        this.bot = bot
        this.options = options
        this.collection = []
        this.message_id = options.message_id
        this.interaction_id = options.interaction_id
        this.channel_id = options.channel_id
        this.guild_id = options.guild_id
        this.timeout = null
        this.HandleFunction = this._handlePacket.bind(this)
        this.UnHandleFunction = this._handleDeletePacket.bind(this)
        this.deploy = this.#start()
    }

    #start(){
        this.bot.setMaxListeners(this.bot.getMaxListeners() + 4)
        if(this.type === "message") this.bot.addListener("MESSAGE_CREATE", this.HandleFunction)
        if(this.type === "interaction") this.bot.addListener("INTERACTION_CREATE", this.HandleFunction)
        this.bot.addListener("CHANNEL_DELETE", this.UnHandleFunction)
        this.bot.addListener("GUILD_DELETE", this.UnHandleFunction)
        if(this.options.time) this.timeout = setTimeout(() => {
            this.timeout = null
            this._end()
        }, this.options.time * 1000)
    }

    _end(argu){
        if(this.type === "message") this.bot.removeListener("MESSAGE_CREATE", this.HandleFunction)
        if(this.type === "interaction") this.bot.removeListener("INTERACTION_CREATE", this.HandleFunction)
        this.bot.removeListener("CHANNEL_DELETE", this.UnHandleFunction)
        this.bot.removeListener("GUILD_DELETE", this.UnHandleFunction)
        this.bot.setMaxListeners(this.bot.getMaxListeners() - 4)
        if(!argu){
            if((this.options.number || this.options.time) && this.collection.length === 0) this.emit("end")
            else if(this.type2 === 0) this.emit("done", this.collection)
            else if(this.type2 === 1) this.emit("end")
        }
        if(this.timeout) clearTimeout(this.timeout)
    }

    _handlePacket(bot, datas){
        if(this.type === "message" && this.message_id){
            if(Array.isArray(this.message_id)){
                if(!this.message_id.includes(datas.id)) return
            } 
            else if(datas.id !== this.message_id) return
        }
        if(this.type === "interaction" && this.message_id){
            if(Array.isArray(this.message_id)){
                if(!this.message_id.includes(datas.message?.id)) return
            }
            else if(datas.message?.id !== this.message_id) return
        }
        if(this.interaction_id){
            if(Array.isArray(this.interaction_id)) {
                if(!(this.interaction_id.includes(datas.id) || this.interaction_id.includes(datas.custom_id))) return
            }
            else if((datas.custom_id !== this.interaction_id) && (datas.id !== this.interaction_id)) return
        }
        if(this.channel_id){
            if(Array.isArray(this.channel_id)){
                if(!this.channel_id.includes(datas.channel_id)) return
            }
            else if(datas.channel_id !== this.channel_id) return
        }
        if(this.guild_id){
            if(Array.isArray(this.guild_id)){
                if(!this.guild_id.includes(datas.guild_id)) return
            } 
            else if(datas.guild_id !== this.guild_id) return
        }
        if(this.options.user_id){
            if(Array.isArray(this.options.user_id)){
                if(!this.options.user_id.includes(datas.user_id)) return
            }
            else if(datas.user_id !== this.options.user_id) return
        }
        this.collection.push(datas)
        if(this.type2 === 1) this.emit("collecting", bot, datas)
        if(this.options.number && this.options.number === this.collection.length) this._end()
    }

    _handleDeletePacket(bot, datas){
        let states = []
        if(this.channel_id){
            if(Array.isArray(this.channel_id)){
                if(!this.channel_id.includes(datas.channel_id)) states.push(true)
            }
            else if(datas.channel_id !== this.channel_id) states.push(true)
        }
        if(this.guild_id){
            if(Array.isArray(this.guild_id)){
                if(!this.guild_id.includes(datas.guild_id)) states.push(true)
            } 
            else if(datas.guild_id !== this.guild_id) states.push(true)
        }
        if(states.includes(true)){
            this.emit("error")
            this._end("argu")
        }
    }
}

module.exports = async (bot, type, datas, options={}) => {
    return new Promise((resolve, reject) => {
        let test = check(datas, options, type)
        if(test.error) return reject(test)
        let Collecotrinstance = new Collector(bot, type, 0, test)
        Collecotrinstance.once("done", collection => resolve(collection))
        Collecotrinstance.once("end", () => resolve([]))
        Collecotrinstance.once("error", () => reject([]))
    })
}

module.exports.collect =  (bot, type, datas, options={}) => {
    let test = check(datas, options, type)
    if(test.error) return test
    let Collecotrinstance = new Collector(bot, type, 1, test)
    return Collecotrinstance
}

function check(datas, options, type){
    if(typeof options !== "object") return {error: "options are not object"}
    if(options.time && typeof options.time !== "number") return {error: "time in options is not number"}
    if(options.number && typeof options.number !== "number") return {error: "number in options is not number"}
    if(options.user_id && (typeof options.user_id !== "string" && !Array.isArray(options.user_id))) return {error: "user_id in options is not string or array"}
    options = {number: options.number || null, user_id: options.user_id || null, time: options.time || null, guild_id: datas.guild_id || null, channel_id: datas.channel_id || null}
    if(type === "message") options.message_id = datas.message_id || datas.id || null
    if(type === "interaction"){
        options.message_id = datas.message_id || null
        options.interaction_id = datas.interaction_id || datas.id || null
    }
    return options
}