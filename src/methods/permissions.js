const errors = require("../utils/errors.json")
const {checkId} = require("../utils/functions").checks
const {getPermissionsFromBitfields} = require("../utils/functions").gets
const permissionsBitfield = require('../types/permissions').types
/**
 * 
 * @param {object} guild 
 * @param {string} memberid 
 * @param {string} permission 
 * @returns 
 */
module.exports = (guild, memberid, permission) => {
    if(!memberid) return ({code: errors["4"].code, message: errors["4"].message, file: "Permissions"})
    if(!guild) return ({code: errors["37"].code, message: errors["37"].message, file: "Permissions"})
    if(!checkId(memberid)) return ({code: errors["56"].code, message: errors["56"].message, file: "Permissions"})
    if(typeof permission === "string") permission = String(permission).toUpperCase()
    else if (Array.isArray(permission)) permission = permission.map(element => String(element).toUpperCase())
    else return false
    if(guild.owner_id === memberid){
        if(permission) return true
        else return Object.keys(permissionsBitfield)
    }
    const member = guild.members.get(memberid)
    const guildroles = guild.roles
    const roles = guildroles.filter(role => member.roles.has(role.id))
    roles.push(guild.roles.get(guild.id))
    let finalPermissions = []
    roles.forEach(role => {
        let permissions = getPermissionsFromBitfields(Number(role.permissions)).filter(perm => !finalPermissions.includes(perm))
        finalPermissions.push(...permissions)
    })
    if(permission){
        if(typeof permission === "string") return finalPermissions.includes(permission)
        else if (Array.isArray(permission)){
            let filteredPermissions = permission.filter(perm => finalPermissions.includes(perm))
            return filteredPermissions.length === permission.length
        }
    }
    else return finalPermissions
        
}