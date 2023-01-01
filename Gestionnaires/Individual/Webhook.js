class Webhook{
    constructor(webhook, bot){
        this.guild = webhook.guild || bot.guilds.get(webhook.guild_id) || null
        this.guild_id = webhook.guild_id || null
        this.bot_token = bot.discordjs.token
        this.type = this.#type2(webhook.type)
        this.id = webhook.id
        this.channel_id = webhook.channel_id || null
        this.channel = webhook.channel_id ? bot.channels.get(webhook.channel_id) : null
        this.user_id = webhook.user ? webhook.user.id : null
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.name = webhook.name || null
        this.avatar = webhook.avatar || null
        this.token = webhook.token
        this.application_id = webhook.application_id
        this.url = webhook.url
        this.vguild_id = webhook.guild_id ? this.guild.vguild_id : null
        this._bot = bot
    }

    #type2(type){
        if(isNaN(type)) return type
        else{
            let convert = {
                1: "Incoming",
                2: "Channel Follower",
                3: "Application"
            }
            return convert[type]
        }
    }

    Modify_Datas(webhook){
        let tocheck = Object.entries(webhook)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type2(e[1])) this[e[0]] = this.#type2(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    execute(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").create(this.bot_token, this, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../Methods/webhooks").modify(this.bot_token, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").delete(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Webhook