const Base = require("./base")
class Webhook extends Base{
    constructor(webhook, bot){
        super(bot)
        this.guild = webhook.guild || bot.guilds.get(webhook.guild_id) || null
        this.guild_id = webhook.guild_id || null
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
    }

    #type2(type){
        return this.__typechange({
            1: "Incoming",
            2: "Channel Follower",
            3: "Application"
        }, type)
    }

    __Modify_Datas(webhook){
        let tocheck = Object.entries(webhook)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type2(e[1])) this[e[0]] = this.#type2(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this.__Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    execute(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").create(this.bot_token, this, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise((resolve, reject) => {
            require("../Methods/webhooks").modify(this.bot_token, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").delete(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
}
module.exports = Webhook