const BaseGuild = require("./baseguild")
const Embed = require("../components/embed")
class baseReplying extends BaseGuild {
    constructor(datas, bot){
        super(datas, bot)
        this.receivingType = datas.custom_id ? "interaction" : "message"
    }

    async #SendSpe(msg, truetype, type){
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
                return Promise.reject(new Error("invalid truetype"))
        }
        if(type === "reply" && this.receivingType === "message"){
            return this.reply({embeds: [embed], replyto: this.id})
        } 
        else if(type === "reply" && this.receivingType === "interaction"){
            return this.reply({embeds: [embed], replyto: this.id})
        }
        else if(type === "send"){
            return this.channel.send({embeds: [embed]})
        }
    }

    async error(msg, type){
        return this.#SendSpe(msg, "error", type)
    }

    async success(msg, type){
        return this.#SendSpe(msg, "success", type)
    }

    async warn(msg, type){
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