const User = require("./user")
const Base = require("../bases/baseguild")
const eventMethod = require("../../methods/event")
const generalMethod = require("../../methods/general")
const eventTypes = require("../../types/event")

class Event extends Base{
    constructor(event, bot){
        super(event, bot)

        this._modifyConstants.push({name: "privacy_level", data: eventTypes.revert.privacyLevel()})
        this._modifyConstants.push({name: "status", data: eventTypes.revert.status()})
        this._modifyConstants.push({name: "entity_type", data: eventTypes.revert.entityType()})

        this.id = event.id
        this.creator_id = event.creator_id
        this.creator = bot.users.get(this.creator_id) ?? new User(this.creator, bot)
        this.name = event.name
        this.description = event.description || null
        this.scheduled_start_time = event.scheduled_start_time
        this.scheduled_end_time = event.scheduled_end_time
        this.privacy_level = this._typechange(this._modifyConstants.find(e => e.name === "privacy_level").data, event.privacy_level)
        this.status = this._typechange(this._modifyConstants.find(e => e.name === "status").data, event.status)
        this.entity_type = this._typechange(this._modifyConstants.find(e => e.name === "entity_type").data, event.entity_type)
        this.entity_id = event.entity_id
        this.entity_metadata = event.entity_metadata
        this.image = event.image || null
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
    async delete(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return eventMethod.delete(informations, options)
    }

    /**
    * @param {object} [queryParams] 
    * @param {string} [queryParams.before] ID
    * @param {string} [queryParams.after] ID
    * @param {number} [queryParams.limit] 
    * @param {boolean} [queryParams.with_member] 
    * @returns 
    */
    async getUsers(queryParams){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            guild_id: this.guild_id
        }
        return eventMethod.getusers(informations, queryParams)
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