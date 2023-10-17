const Base = require("../bases/basemultiple")
class Members extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "member", 'user_id')
        this._ignoreParameters = [
            'voice'
        ]
        this._compareFunction = (oldRoles, newRoles) => {
            let modifications = []
            let allOldRoles = oldRoles.map(role => role.id)
            let allNewRoles = newRoles.map(role => role.id)
            let removedRoles = allOldRoles.filter(oldRole => !allNewRoles.includes(oldRole))
            let addedRoles = allNewRoles.filter(newRole => !allOldRoles.includes(newRole))
            removedRoles.forEach(role => {
                modifications.push({
                    old: role,
                    new: null
                })
            })
            addedRoles.forEach(role => {
                modifications.push({
                    old: null,
                    new: role
                })
            })
            return modifications
        }
    }
}

module.exports = Members