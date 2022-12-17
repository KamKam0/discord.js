class Channel{
    constructor(channel){
        this.id = channel.id
        this.type = this.type0(channel.type)
        this.name = channel.name
        this.recipients = channel.recipients
        this.icon = channel.icon
        this.owner_id = channel.owner_id
        this.bot_token = channel.token
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

    addmember(userid, nick, accesstoken){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").adduser(this.bot_token, this.id, userid, nick, accesstoken)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - addmember, Channel2")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    removemember(userid){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/dm").removeuser(this.bot_token, this.id, userid)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - removemember, Channel2")
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
        return require("../../../Methods/channel").awaitMessages(this.bot_token, this.id, options)
    }*/
}
module.exports = Channel