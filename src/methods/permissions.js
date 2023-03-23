/**
 * 
 * @param {object} guild 
 * @param {string} memberid 
 * @param {string} permission 
 * @returns 
 */
module.exports = (guild, memberid, permission) => {
    if(!memberid) return ({code: require("../DB/errors.json")["4"].code, message: require("../DB/errors.json")["4"].message, file: "Permissions"})
    if(!guild) return ({code: require("../DB/errors.json")["37"].code, message: require("../DB/errors.json")["37"].message, file: "Permissions"})
    if(!require("../utils/functions").check_id(memberid)) return ({code: require("../DB/errors.json")["56"].code, message: require("../DB/errors.json")["56"].message, file: "Permissions"})
    if(permission) permission = String(permission).toUpperCase()
    if(guild.owner_id === memberid){
        if(permission) return true
        else return Object.keys(require("../constants.js").permissions_bitfield)
    }
    else{
        const member = guild.members.find(me => me.user.id === memberid)
        const guildroles = guild.roles
        const roles = guildroles.filter(role => member.roles.includes(role.id) || role.id === guild)
        const perm_base = require("../utils/functions")
        let final_permissions = []
        roles.forEach(role => {
            let permissions = perm_base.bietfieldpermission(Number(role.permissions))
            permissions.forEach(perm => {
                if(!final_permissions.includes(perm)) final_permissions.push(perm)
            })
        })
        if(permission){
            if(final_permissions.includes(permission)) return true
            else false
        }else return final_permissions
    }
        
}