const User = require("./User")
const Base = require("./base")
class Event extends Base{
    constructor(event, bot){
        super(bot)
        this.id = event.id
        this.guild_id = event.guild_id
        this.creator_id = event.creator_id
        this.creator = bot.users.get(this.creator_id) ?? new User(this.creator, bot)
        this.name = event.name
        this.description = event.description || null
        this.scheduled_start_time = event.scheduled_start_time
        this.scheduled_end_time = event.scheduled_end_time
        this.privacy_level = this.#privacy(event.privacy_level)
        this.status = this.#status2(event.status)
        this.entity_type = this.#type(event.entity_type)
        this.entity_id = event.entity_id
        this.entity_metadata = event.entity_metadata
        this.image = event.image || null
        this.guild = event.guild || bot.guilds.get(this.guild_id) || null
    }

    __Modify_Datas(event){
        let tocheck = Object.entries(event)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "entity_type"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(e[0] === "status"){
                    if(this[e[0]] !== this.#status2(e[1])) this[e[0]] = this.#status2(e[1])
                }
                else if(e[0] === "privacy_level"){
                    if(this[e[0]] !== this.#privacy(e[1])) this[e[0]] = this.#privacy(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this.__Modify_Get_Datas()
        return this
    }

    #type(type){
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

    #status2(status){
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

    #privacy(privacy){
        if(isNaN(privacy)) return privacy
        else{
            let convert = {
                2: "GUILD_ONLY"
            }
            return convert[privacy]
        }
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/events").modify(this.bot_token, this.guild_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/events").delete(this.bot_token, this.guild_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    get iconURL(){
        return require("../../Methods/general").iconURL(this.id, this.image, "event")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayIconURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.image, "event", extension)
    }
}
module.exports = Event