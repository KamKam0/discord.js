class Event{
    constructor(event){
        this.id = event.id
        this.guild_id = event.guild_id
        this.creator_id = event.creator_id
        this.creator = event.creator ? event.creator : null
        this.name = event.name
        this.description = event.description ? event.description : null
        this.scheduled_start_time = event.scheduled_start_time
        this.scheduled_end_time = event.scheduled_end_time
        this.privacy_level = this.privacy(event.privacy_level)
        this.status = this.status2(event.status)
        this.entity_type = this.type(event.entity_type)
        this.entity_id = event.entity_id
        this.entity_metadata = event.entity_metadata
        this.image = event.image ? event.image : null
        this.guild = event.guild ? event.guild : null
        this.bot_token = event.token
        this.vguild_id = event.guild ? event.guild.vguild_id : null
    }

    SetCreator(creator){
        this.creator = creator
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

    Modify_Datas(event){
        let tocheck = Object.entries(event)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "entity_type"){
                    if(this[e[0]] !== this.type(e[1])) this[e[0]] = this.type(e[1])
                }
                else if(e[0] === "status"){
                    if(this[e[0]] !== this.status2(e[1])) this[e[0]] = this.status2(e[1])
                }
                else if(e[0] === "privacy_level"){
                    if(this[e[0]] !== this.privacy(e[1])) this[e[0]] = this.privacy(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    type(type){
        if(isNaN(type)) return type
        else{
            let convert = {
                1: "STAGE_INSTANCE",
                2: "VOICE",
                3: "EXTERNAL"
            }
            return convert[type]
        }
    }

    status2(status){
        if(isNaN(status)) return status
        else{
            let convert = {
                1: "SCHEDULED",
                2: "ACTIVE",
                3: "COMPLETED",
                4: "CANCELED"
            }
            return convert[status]
        }
    }

    privacy(privacy){
        if(isNaN(privacy)) return privacy
        else{
            let convert = {
                2: "GUILD_ONLY"
            }
            return convert[privacy]
        }
    }


    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/events").modify(this.bot_token, this.guild_id, this.id, options)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - modify, events")
                er.content = err
                reject(er)
            })
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/events").delete(this.bot_token, this.guild_id, this.id)
            .then(datas => { return resolve(datas)})
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - delete, events")
                er.content = err
                reject(er)
            })
        })
    }

    get iconURL(){
        return require("../../Methods/general").iconURL(this.id, this.image, "event")
    }
}
module.exports = Event