class Webhook{
    constructor(webhook, bot){
        this.guild = webhook.guild ? webhook.guild : null
        this.guild_id = webhook.guild_id
        this.bot_token = webhook.bot_token
        this.type = this.type2(webhook.type)
        this.id = webhook.id
        this.channel_id = webhook.channel_id
        this.channel = webhook.channel ? webhook.channel : null
        this.user_id = webhook.user? webhook.user.id : null
        this.user = webhook.user ? webhook.user : null
        this.name = webhook.name ? webhook.name : null
        this.avatar = webhook.avatar ? webhook.avatar : null
        this.token = webhook.token
        this.application_id = webhook.application_id
        this.url = webhook.url
        this.vguild_id = webhook.guild ? webhook.guild.vguild_id : null
        this._bot = bot
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetChannel(channel){
        this.channel = channel
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    type2(type){
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
                    if(this[e[0]] !== this.type(e[1])) this[e[0]] = this.type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    execute(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").create(this.bot_token, this, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - execute, webhook")
                er.content = err
                reject(er)
            })
        })
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../Methods/webhooks").modify(this.bot_token, this.id, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, webhook")
                er.content = err
                reject(er)
            })
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").delete(this.bot_token, this.id, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, webhook")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Webhook