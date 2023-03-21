const BaseGuild = require("./baseguild")
const Embed = require("../components/Embed")
class baseReplying extends BaseGuild {
    constructor(datas, bot){
        super(datas, bot)
        this.receivingType = datas.custom_id ? "interaction" : "message"
    }

    async #SendSpe(msg, truetype, type){
        return new Promise(async (resolve, reject) => {
            if(!type) type = "reply"
            let embed = new Embed()
            switch(truetype){
                case("error"): 
                    embed
                    .setDescription(`❌ | ${msg}`)
                    .setColor("RED")
                break;
                case("success"): 
                    embed
                    .setDescription(`✅ | ${msg}`)
                    .setColor("GREEN")
                break;
                case("warn"): 
                    embed
                    .setDescription(`❗️ | ${msg}`)
                    .setColor("ORANGE")
                break;
                case("info"): 
                    embed
                    .setDescription(`📣 | ${msg}`)
                    .setColor("WHITE")
                break;
                case("wait"): 
                    embed
                    .setDescription(`💤 | ${msg}`)
                    .setColor("YELLOW")
                break;
                default: 
                    return reject(new Error("invalid truetype"))
            }
            if(type === "reply" && this.receivingType === "message"){
                require("../../methods/message").send(this.bot_token, this.channel_id, {embeds: [embed], replyto: this.id}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            } 
            else if(type === "reply" && this.receivingType === "interaction"){
                require("../../methods/interaction").reply(this._token, this, {embeds: [embed], replyto: this.id}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            }
            else if(type === "send"){
                require("../../methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            }
        })
    }

    async error(msg, type){
        return this.#SendSpe(msg, "error", type)
    }

    async success(msg, type){
        return this.#SendSpe(msg, "success", type)
    }

    async warn_se(msg, type){
        return this.#SendSpe(msg, "warn", type)
    }

    async info(msg, type){
        return this.#SendSpe(msg, "info", type)
    }

    async wait(msg, type){
        return this.#SendSpe(msg, "wait", type)
    }
}

module.exports = baseReplying