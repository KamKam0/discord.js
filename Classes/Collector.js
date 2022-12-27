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
        this.HandleFunction = this.handlePacket.bind(this)
        this.UnHandleFunction = this.handleDeletePacket.bind(this)
        this.deploy = this.start()
    }

    start(){
        if(this.type === "message") this.bot.addListener("MESSAGE_CREATE", this.HandleFunction)
        if(this.type === "interaction") this.bot.addListener("INTERACTION_CREATE", this.HandleFunction)
        this.bot.addListener("CHANNEL_DELETE", this.UnHandleFunction)
        this.bot.addListener("GUILD_DELETE", this.UnHandleFunction)
        if(this.options.time) this.timeout = setTimeout(() => {
            this.timeout = null
            this.end()
        }, this.options.time * 1000)
    }

    end(argu){
        if(this.type === "message") this.bot.removeListener("MESSAGE_CREATE", this.HandleFunction)
        if(this.type === "interaction") this.bot.removeListener("INTERACTION_CREATE", this.HandleFunction)
        this.bot.removeListener("CHANNEL_DELETE", this.UnHandleFunction)
        this.bot.removeListener("GUILD_DELETE", this.UnHandleFunction)
        if(!argu){
            if((this.options.number || this.options.time) && this.collection.length === 0)this.emit("error")
            else if(this.type2 === 0)this.emit("done", this.collection)
            else if(this.type2 === 1)this.emit("end")
        }
        if(this.timeout) clearTimeout(this.timeout)
    }

    handlePacket(bot, datas){
        if(this.message_id && datas.id !== this.message_id) return
        if(this.interaction_id && datas.custom_id !== this.interaction_id) return
        if(this.channel_id && datas.channel_id !== this.channel_id) return
        if(this.guild_id && datas.guild_id !== this.guild_id) return
        if(this.options.user_id && datas.user_id !== this.options.user_id) return
        this.collection.push(datas)
        if(this.type2 === 1) this.emit("collecting", bot, datas)
        if(this.options.number && this.options.number === this.collection.length) this.end()
    }

    handleDeletePacket(bot, datas){
        if((this.guild_id || this.channel_id) && (this.guild_id === datas.id || this.channel_id === datas.id)){
            this.emit("error")
            this.end("argu")
        }
    }
}

module.exports = async (bot, type, datas, options={}) => {
    return new Promise((resolve, reject) => {
        let test = check(datas, options)
        if(test.error) return reject(test)
        let Collecotrinstance = new Collector(bot, type, 0, test)
        Collecotrinstance.once("done", collection => resolve(collection))
        Collecotrinstance.once("end", () => resolve(null))
        Collecotrinstance.once("error", () => reject([]))
    })
}

module.exports.collect =  (bot, type, datas, options={}) => {
    let test = check(datas, options)
    if(test.error) return test
    let Collecotrinstance = new Collector(bot, type, 1, test)
    return Collecotrinstance
}

function check(datas, options){
    if(typeof options !== "object") return {error: "options are not object"}
    if(options.time && typeof options.time !== "number") return {error: "time in options is not number"}
    if(options.number && typeof options.number !== "number") return {error: "number in options is not number"}
    if(options.user_id && typeof options.user_id !== "string") return {error: "user_id in options is not string"}
    return options = {number: options.number || null, user_id: options.user_id || null, time: options.time || null, message_id: datas.message_id || null, interaction_id: datas.interaction_id || null, guild_id: datas.guild_id || null, channel_id: datas.channel_id || null}
}