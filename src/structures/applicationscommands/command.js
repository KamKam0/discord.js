const Option = require("./commandoption")
const Base = require("../bases/commands/base")
const interactionMethod = require("../../methods/interaction")
const utils = require("../../utils/functions")
const interactionTypes = require('../../types/slashcommand')
class Slash extends Base{
    constructor(slash, bot){
        super(slash)
        this.id = slash.id || null
        this.application_id = slash.application_id || null
        this.version = slash.version || null
        this.default_member_permissions = slash.default_member_permissions ? this.#analyseDefaultMember(slash.default_member_permissions) : null
        this.onlydm = slash.onlydm ?? false
        this.options = slash.options ? slash.options.map(opt => new Option(opt)) : []
        this.contexts = slash.contexts ? this.#getContexts(slash.contexts) : null
        this.type = 1
        this.nsfw = slash.nsfw ?? false
        this._bot = bot
        this._token = bot.token
    }
    
    create(){
        let ID = this._bot?.user?.id || this.application_id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID
        }
        return interactionMethod.createcommand(informations, this.toJSON())
    }

    modify(){
        let ID = this._bot?.user?.id || this.application_id
        let informations = {
            bot: this._bot,
            botToken: this._token,
            application_id: ID,
            id: this.id
        }
        return interactionMethod.modifycommand(informations, this.toJSON())
    }

    delete(){
        let ID = this._bot?.user?.id || this.application_id
        let informations = {
            botToken: this._token,
            bot: this._bot,
            application_id: ID,
            id: this.id
        }
        return interactionMethod.deletecommand(informations)
    }

    #getContexts(contexts) {
        if (!Array.isArray(contexts)) {
            return null
        }

        if (typeof contexts[0] === 'string') {
            contexts = contexts
            .map(context => {
                if (typeof context !== 'string') {
                    return null
                }
    
                return context.toLowerCase()
            })
            .filter(Boolean)
    
            let permissions = []
    
            if (contexts.includes('dm')) {
                permissions.push(interactionTypes.types.BotDm)
            }
    
            if (contexts.includes('guild')) {
                permissions.push(interactionTypes.types.Guild)
            }
    
            if (contexts.includes('private')) {
                permissions.push(interactionTypes.types.PrivateChannel)
            }
    
            return permissions
        } else {
            return contexts.filter(context => [0, 1, 2].includes(context))
        }
    }

    #analyseDefaultMember(mem_perm){
        if(!mem_perm) return null
        if(typeof mem_perm === "number") return mem_perm
        let bit
        if(String(mem_perm).toLowerCase() === "aucune") bit = null
        else bit = utils.gets.getBietfielfFromPermissions([mem_perm])
        if(bit === 8) bit = 0
        return bit
    }

    toJSON(){
        let returnObject = {...this}
        delete returnObject.id
        delete returnObject.application_id
        delete returnObject.version
        delete returnObject._bot
        delete returnObject._token
        return returnObject
    }

    setID(id){
        return this._setString("id", id, 20)
    }

    setApplicationID(id){
        return this._setString("application_id", id, 20)
    }

    setVersion(version){
        return this._setString("version", version, 50)
    }

    setNSFW(bool){
        return this._setBoolean("nsfw", bool)
    }

    setOnlyDM(bool){
        return this._setBoolean("onlydm", bool)
    }

    setDefaultMemberPermission(value){
        this.default_member_permissions = this.#analyseDefaultMember(value)
        return this
    }

    addOption(obj){
        if(!(obj instanceof Option) && (typeof obj !== "object" || typeof obj.description !== "string" || typeof obj.name !== "string" || typeof obj.required !== "boolean" || typeof obj.type !== "number")) return this
        if(obj instanceof Option) this.options.push(obj)
        else this.options.push(new Option(obj))
        return this
    }

    addOptions(array){
        if(!Array.isArray(array)) array = undefined
        let choices = array || [...arguments]
        choices.filter(e => typeof e === "object").forEach(choice => this.addOption(choice))
        return this
    }
}
module.exports = Slash