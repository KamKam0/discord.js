class Slash{
    constructor(slash){
        this.name = slash.name
        this.name_localizations = slash.name_localizations ? slash.name_localizations : {}
        this.description = slash.description ? slash.description : null
        this.description_localizations = slash.description_localizations ? slash.description_localizations : {}
        this.default_member_permissions = this.#analyseDefaultMember(slash.mem_perm)
        this.dm_permission = this.#analyseDMPerm(slash.dm_perm)
        this.options = slash.options ? slash.options.map(opt => new (require("./Options"))(opt)) : []
        this.type = slash.type ? slash.type : 1
        this.nsfw = slash.nsfw ?? false
    }

    #analyseDMPerm(dm_perm){
        if(!dm_perm) return false
        else if(typeof dm_perm === "boolean") return dm_perm
        else if(dm_perm.includes("PV")) return true
        else return false
    }

    #analyseDefaultMember(mem_perm){
        if(!mem_perm) return null
        let bit
        if(String(mem_perm).toLowerCase() === "aucune") bit = require("../Utils/functions").get_bitfield(["SEND_MESSAGES"])
        else bit = require("../Utils/functions").get_bitfield([mem_perm])
        if(bit === 8) bit = 0
        return bit
    }

    compare(slash){
        for (const point of Object.keys(this)){
            let point2 = slash[point]
            if(point === "description_localizations" || point === "name_localizations"){
                let ppoint = Object.entries(this[point])
                let ppoint2 = Object.entries(point2)
                let errors
                ppoint.forEach(po => {
                    let po2 = ppoint2.find(e => e[0] === po[0])
                    if(!po2) errors = true
                    else if(po[1] !== po2[1]) errors=true
                })
                if(errors) return false
            }else if(point === "options"){
                for(const option of this.options){
                    if(!point2.find(opt => opt.name === option.name)) return false
                    if(!option.compare(point2.find(opt => opt.name === option.name))) return false
                }
            }else if(this[point] !== point2) return false
        }
        return true
    }
}
module.exports = Slash