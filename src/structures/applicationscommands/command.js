const Option = require("./commandoption")
const Base = require("../bases/commands/base")
class Slash extends Base{
    constructor(slash){
        super()
        this.id = null
        this.application_id = null
        this.version = null
        this.default_member_permissions = null
        this.onlydm = false
        this.dm_permission = null
        this.options = slash.options ? slash.options.map(opt => new Option(opt)) : []
        this.type = 1
        this.nsfw = false

        if(slash) this._handleInitiationData(slash)
    }

    #analyseDMPerm(dm_perm){
        switch(dm_perm){
            case(null):
                this.onlydm = true
                return false
            case(true):
                return true
            default:
                return false
        }
    }

    #analyseDefaultMember(mem_perm){
        if(!mem_perm) return null
        if(typeof mem_perm === "number") return mem_perm
        let bit
        if(String(mem_perm).toLowerCase() === "aucune") bit = null
        else bit = require("../utils/functions").get_bitfield([mem_perm])
        if(bit === 8) bit = 0
        return bit
    }

    toJSON(){
        let returnObject = {...this}
        delete returnObject.id
        delete returnObject.application_id
        delete returnObject.version
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

    setDMPermissions(value){
        this.dm_permission = this.#analyseDMPerm(value)
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
        choices.filter(e => typeof e === "object").forEach(choice => this.addChoice(choice))
        return this
    }
}
module.exports = Slash