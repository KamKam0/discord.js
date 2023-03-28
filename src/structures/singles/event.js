const User = require("./user")
const Base = require("../bases/baseguild")
const eventMethod = require("../../methods/event")
const generalMethod = require("../../methods/general")
const eventTypes = require("../../types/event")

class Event extends Base{
    constructor(event, bot){
        super(event, bot)
        this.id = event.id
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
    }

    _Modify_Datas(event){
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
        this._modifyGetDatas()
        return this
    }

    #type(type){
        return this._typechange(eventTypes.revert.entityType(), type)
    }

    #status2(status){
        return this._typechange(eventTypes.revert.status(), status)
    }

    #privacy(privacy){
        return this._typechange(eventTypes.revert.privacyLevel(), privacy)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return eventMethod.modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return eventMethod.delete(informations)
    }

    async getUsers(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return eventMethod.getusers(informations)
    }

    get iconURL(){
        return generalMethod.iconURL(this.id, this.image, "event")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayIconURL(extension){
        return generalMethod.iconURL(this.id, this.image, "event", extension)
    }
}
module.exports = Event