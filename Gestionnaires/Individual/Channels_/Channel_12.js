class Channel{
    constructor(channel){
        this.id = channel.id
        this.type = this.type0(channel.type)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.rate_limit_per_user = channel.rate_limit_per_user ? channel.rate_limit_per_user : 0
        this.topic = channel.topic ? channel.topic : null
        this.nsfw = channel.nsfw ? channel.nsfw : false
        this.owner_id = channel.owner_id
        this.owner = channel.owner ? channel.owner : null
        this.parent_id = channel.parent_id
        this.parent = channel.parent ? channel.parent : null
        this.member_count = channel.member_count
        this.archived = channel.thread_metadata.archived
        this.auto_archive_duration =  channel.thread_metadata.auto_archive_duration,
        this.archive_timestamp = channel.thread_metadata.archive_timestamp
        this.locked = channel.thread_metadata.locked
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


    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").send(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - send, channel12")
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
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessages, channel12")
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
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessage, channel12")
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
                let er = new Error("Une erreur s'est produite lors de la requête - edit, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    /*AwaitMesssages(options){
        return require("../../../Methods/channel").awaitMessages(e, this.id, options)
    }*/

    bulkdelete(number){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").fetch_messages(this.bot_token, this.id, number)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - bulkdelete, channel12 fetch")
                er.content = err
                reject(er)
            })
            .then(datas => {
                require("../../../Methods/channel").bulkdelete(this.bot_token, this.id, datas.map(msg => msg.id))
                .catch(err => {
                    let er = new Error("Une erreur s'est produite lors de la requête - bulkdete, channel12")
                    er.content = err
                    reject(er)
                })
                .then(vdatas => { return resolve(vdatas)})
            })
        })
    }

    getinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").getinvites(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getinvites, channel12")
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
                let er = new Error("Une erreur s'est produite lors de la requête - createinvites, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    editpermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").editpermissions(this.bot_token, this.id, overwrites)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - editpermissions, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    deletepermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").deletepermission(this.bot_token, this.id, overwrites)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - deletepermissions, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    follownewsChannel(targetid){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").follownews(this.bot_token, this.id, targetid)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - follownewschannel, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    getpins(){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").getpins(this.bot_token, this.id)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getpins, channel12")
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
                let er = new Error("Une erreur s'est produite lors de la requête - triggertyping, channel12")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Channel