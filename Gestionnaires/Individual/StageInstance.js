class StageInstance{
    constructor(stage){
        this.id = stage.id
        this.guild_id = stage.guild_id
        this.channel_id = stage.channel_id
        this.channel = stage.channel ? stage.channel : null
        this.topic = stage.topic ? stage.topic : null
        this.privacy_level = stage.privacy_level ? stage.privacy_level : null
        this.discoverable_disabled = stage.discoverable_disabled ? stage.discoverable_disabled : false
        this.guild = stage.guild ? stage.guild : null
        this.bot_token = stage.token
        this.vguild_id = stage.guild ? stage.guild.vguild_id : null
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

    Modify_Datas(stage){
        let tocheck = Object.entries(stage)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/stages").modify(this.bot_token, this.guild_id, this.id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, stage")
                er.content = err
                reject(er)
            })
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/stages").delete(this.bot_token, this.guild_id, this.id)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, stage")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = StageInstance