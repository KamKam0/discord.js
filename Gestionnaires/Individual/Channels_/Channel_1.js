class Channel{
    constructor(channel){
        this.id = channel.id
        this.type = this.type0(channel.type)
        this.recipients = channel.recipients
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
    
    send(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/message").send(this.bot_token, this.id, options)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - send, Channel1")
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
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessages, Channel1")
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
                let er = new Error("Une erreur s'est produite lors de la requête - fetchmessage, Channel1")
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
                let er = new Error("Une erreur s'est produite lors de la requête - edit, Channel1")
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
                let er = new Error("Une erreur s'est produite lors de la requête - getpins, Channel1")
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
                let er = new Error("Une erreur s'est produite lors de la requête - triggertyping, Channel1")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }
}
module.exports = Channel