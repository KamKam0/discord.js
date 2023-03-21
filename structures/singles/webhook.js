const Base = require("../bases/baseguild")
class Webhook extends Base{
    constructor(webhook, bot){
        super(webhook, bot)
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
        return this._typechange({
            1: "Incoming",
            2: "Channel Follower",
            3: "Application"
        }, type)
    }

    _Modify_Datas(webhook){
        let tocheck = Object.entries(webhook)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type2(e[1])) this[e[0]] = this.#type2(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async execute(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            token: this.token,
            id: this.id
        }
        return require("../../methods/webhooks").create(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id
        }
        return require("../methods/webhooks").modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            bot: this._bot,
            botToken: this._token,
            id: this.id
        }
        return require("../../methods/webhooks").delete(informations)
    }
}
module.exports = Webhook