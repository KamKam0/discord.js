const Guild = require("../singles/guild")
const Base = require("../bases/basemultiple")
class Guilds extends Base{
    constructor(_bot){
        super(_bot, null, "guild")
    }

    _modify(data){
        data.id = data.guild_id
        delete data.guild_id
        delete data.version

        let currentInstance = this.get(data.id)
        if(!currentInstance) return null

        let modifications = currentInstance._modifyDatas(data, [], null, true)
        
        let verifiedModifications = modifications
        .filter(modification => {
            let modifyConstant = currentInstance._modifyConstants.find(localmodifyConstant => localmodifyConstant.name === modification.propertyName)
            if (!modifyConstant) return true

            if (currentInstance._typechange(modifyConstant.data, data[modifyConstant.name]) !== currentInstance[modifyConstant.name]) return true

            return false
        })

        if(!verifiedModifications.length) return null

        this._update(data.id, verifiedModifications)

        return {
            verifiedModifications,
            oldInstance: new Guild(currentInstance._rawData, this._bot),
            newInstance: currentInstance,
        }
    }

    _update(guildId, modifications){
        let guildToModify = this.get(guildId)
        modifications.forEach(modification => {
            guildToModify[modification.propertyName] = modification.modifiedValues[0].new
        })
    }
}

module.exports = Guilds