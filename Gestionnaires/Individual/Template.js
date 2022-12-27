class Template{
    constructor(template, bot){
        this.code = template.code
        this.name = template.name
        this.description = template.description ? template.description : null
        this.creator_id = template.creator_id
        this.creator = template.creator ? template.creator : null
        this.created_at = template.created_at
        this.updated_at = template.updated_at ? template.updated_at : null
        this.guild_id = template.source_guild_id
        this.guild = template.serialized_source_guild ? template.serialized_source_guild : null
        this.is_dirty = template.is_dirty ? template.is_dirty : false
        this.bot_token = template.token
        this.vguild_id = template.guild ? template.guild.vguild_id : null
        this._bot = bot
    }

    SetCreator(creator){
        this.creator = creator
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(template){
        let tocheck = Object.entries(template)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    createguildfrom(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").createguild(this.bot_token, this.source_guild_id, this.code, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createguildfrom, template")
                er.content = err
                reject(er)
            })
        })
    }

    sync(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").sync(this.bot_token, this.source_guild_id, this.code, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - sync, template")
                er.content = err
                reject(er)
            })
        })
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").modify(this.bot_token, this.source_guild_id, this.code, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, template")
                er.content = err
                reject(er)
            })
        })
    }

    deletetemplate(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").delete(this.bot_token, this.source_guild_id, this.code, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - deletetemplate, template")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Template