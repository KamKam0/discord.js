const Base = require("../bases/baseguild")
const webhookTypes = require("../../types/webhook")
const webhookMethod = require("../../methods/webhooks")

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
        return this._typechange(webhookTypes.revert(), type)
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
        this._modifyGetDatas()
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
        return webhookMethod.create(informations, options)
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
        return webhookMethod.modify(informations, options)
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
        return webhookMethod.delete(informations)
    }
}
module.exports = Webhook