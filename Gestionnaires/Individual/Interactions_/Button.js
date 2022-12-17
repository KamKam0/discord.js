const Message = require("../Message")
const User = require("../User")
class Button{
    constructor(button){
        this.id = button.id
        this.application_id = button.application_id
        this.custom_id = button.data.custom_id
        this.guild_id = button.guild_id
        this.channel_id = button.channel_id
        this.message = button.message ? (new Message({...button.message, guild_id: button.guild_id, channel_id: button.channel_id, token: button.bot_token})) : null
        this.channel = button.channel ? button.channel : require("../../../Utils/functions").channel_backup(button.channel_id, button.bot_token)
        this.user_id = button.user ? button.user.id : button.member.user.id
        this.user = button.user ? new User({...button.user, token: button.token}) : new User({...button.member.user, token: button.token})
        this.member = button.member ? button.member : null
        this.token = button.token
        this.version = button.version
        this.guild_locale = button.guild_locale
        this.locale = button.locale
        this.guild = button.guild ? button.guild : null
        this.bot_token = button.bot_token
        this.bot_id = button.bot_id
        this.vguild_id = button.guild ? button.guild.vguild_id : null
        this.typee = "boutton"
    }

    get isButton(){
        return true
    }

    get isSlash(){
        return false
    }

    get isContextMenu(){
        return false
    }

    get isForm(){
        return false
    }

    SetMember(member){
        this.member = member
        if(this.message) this.message.SetMember(member)
        return this
    }

    SetUser(user){
        this.user = user
        return this
    }

    SetChannel(channel){
        this.channel = channel
        if(this.message) this.message.SetChannel(channel)
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        if(this.message) this.message.SetGuild(guild)
        return this
    }

    Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    reply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").reply(this.bot_token, this, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - reply, button")
                er.content = err
                reject(er)
            })
        })
    }

    modifyreply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").modifyreply(this.bot_token, this.bot_id, this, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modifyreply, button")
                er.content = err
                reject(er)
            })
        })
    }

    deletereply(){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").deletereply(this.bot_token, this.bot_id, this)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - deletereply, button")
                er.content = err
                reject(er)
            })
        })
    }
    
    get createdAt(){
        return  require("../../../Methods/general").createdAt(this.id, "interaction")
    }

    SendSpe(msg, truetype, type){
        return new Promise(async (resolve, reject) => {
            if(!type) type = "reply"
            let embed = new (require("../../../Classes/Embed"))()
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
                break;
            }
            if(type === "reply"){
                require("../../../Methods/interaction").reply(this.bot_token, this, {embeds: [embed]})
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - reply, button sendspe")
                    er.content = err
                    reject(er)
                })
            } 
            if(type === "send"){
                require("../../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]})
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - send, button sendspe")
                    er.content = err
                    reject(er)
                })
            }
        })
    }

    error(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "error", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - error, button")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    success(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "success", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - success, button")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    warn_se(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "warn", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - warn_se, button")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    info(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "info", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - info, button")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    wait(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "wait", type)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - wait, button")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Button