class Channel{
    constructor(channel){
        this.id = channel.id
        this.type = this.type0(channel.type)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ? channel.nsfw : false
        this.parent_id = channel.parent_id
        this.parent = channel.parent ? channel.parent : null     
        this.guild = channel.guild ? channel.guild : null
        this.bot_token = channel.token
        this.guild_id = channel.guild_id
        this.vguild_id = channel.guild ? channel.guild.vguild_id : null
        this.topic = channel.topic
        this.rate_limit_per_user = channel.rate_limit_per_user
        this.template = channel.template
        this.default_sort_order = channel.default_sort_order
        this.default_reaction_emoji = channel.default_reaction_emoji
        this.available_tags = channel.available_tags
        this.flags = channel.flags
    }

    SetParent(parent){
        this.parent = parent
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    type0(type){
        if(isNaN(type)) return type
        else return require("../../../constants").convert_channels[type]
    }

    Modify_Datas(channel){
        let tocheck = Object.entries(channel)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.type0(e[1])) this[e[0]] = this.type0(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").modify(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - edit, Channel15")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    createthread(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/threads").create_tforum(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createthread, Channel15")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Channel