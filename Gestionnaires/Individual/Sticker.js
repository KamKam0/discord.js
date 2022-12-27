class Sticker{
    constructor(sticker, bot){
        this.id = sticker.id
        this.pack_id = sticker.pack_id ? sticker.pack_id : null
        this.name = sticker.name
        this.description = sticker.description ? sticker.description : null
        this.tags = sticker.tags ? sticker.tags : []
        this.asset = sticker.asset ? sticker.asset : null
        this.type = sticker.type ? sticker.type : null
        this.format_type = sticker.format_type ? sticker.format_type : null
        this.available = sticker.available ? sticker.available : false
        this.guild = sticker.guild ? sticker.guild : null
        this.guild_id = sticker.guild_id
        this.bot_token = sticker.token
        this.sort_value = sticker.sort_value ? sticker.sort_value : null
        this.vguild_id = sticker.guild ? sticker.guild.vguild_id : null
        this._bot = bot
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    Modify_Datas(sticker){
        let tocheck = Object.entries(sticker)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/stickers").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, sticker")
                er.content = err
                reject(er)
            })
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/stickers").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, sticker")
                er.content = err
                reject(er)
            })
        })
    }
}
module.exports = Sticker