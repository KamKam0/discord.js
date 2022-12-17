class Channel{
    constructor(channel){
        this.id = channel.id
        this.type = this.type0(channel.type)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ? channel.nsfw : false
        this.bitrate = channel.bitrate
        this.user_limit = channel.user_limit
        this.parent_id = channel.parent_id
        this.parent = channel.parent ? channel.parent : null
        this.rtc_region = channel.rtc_region
        this.guild = channel.guild ? channel.guild : null
        this.bot_token = channel.token
        this.guild_id = channel.guild_id
        this.vguild_id = channel.guild ? channel.guild.vguild_id : null
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
    
    getinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").getinvites(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getinvites, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    createinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").createinvite(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createinvites, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").modify(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - edit, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").send(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - send, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    fetchmessages(limit){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, limit)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessages, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
    
    fetchmessage(ID){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, ID)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessage, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").modify(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - edit, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    /*AwaitMesssages(options){
        return require("../../../Methods/channel").awaitMessages(e, this.id, options)
    }*/

    getpins(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").getpins(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getpins, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    triggertyping(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").triggertyping(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - triggertyping, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    bulkdelete(number){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, number)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - bulkdelete, Channel2 fetch")
                er.content = err
                reject(er)
            })
            .then(datas => {
                require("../../../Methods/channel").bulkdelete(this.bot_token, this.id, datas.map(msg => msg.id))
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - bulkdelete, Channel2")
                    er.content = err
                    reject(er)
                })
                .then(vdatas => { return resolve(vdatas)})
            })
        })
    }
}
module.exports = Channel