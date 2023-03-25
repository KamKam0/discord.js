const errors = require("../utils/errors.json")
const { checkId } = require("../utils/functions").checks
/**
 * 
 * @param {string} ids 
 * @param {string} [link=null] 
 * @param {string} type
 * @param {string} [extension=png]
 * @returns 
 */
module.exports.iconURL = (ids, link, type, extension) => {
    if(!ids) return {code: errors["13"].code, message: errors["13"].message, file: "General"}
    if(!type) return {code: errors["77"].code, message: errors["77"].message, file: "General"}
    if(extension && typeof extension !== "string") return {code: errors["82"].code, message: errors["82"].message, file: "General"}
    if(!["user", "guild", "gbanner", "ubanner" , "splash", "role", "event", "member", "mbanner"].includes(type)) return {code: errors["78"].code, message: errors["78"].message, file: "General"}
    if(!link) return null
    extension = extension || "png"
    let baseurl = "https://cdn.discordapp.com"
    if(link.includes("a_")) extension = "gif"
    if(!["png", "jpeg", "webp", "gif"].includes(extension.toLowerCase())) return {code: errors["83"].code, message: errors["83"].message, file: "General"}
    if(["user", "guild", "gbanner", "ubanner" , "splash", "role", "event"].includes(type)){
        if(typeof ids !=="string") return {code: errors["79"].code, message: errors["79"].message, file: "General"}
        if(!checkId(ids)) return {code: errors["81"].code, message: errors["81"].message, file: "General"}
    }
    if(["member", "mbanner"].includes(type)){
        if(typeof ids !=="object") return {code: errors["80"].code, message: errors["80"].message, file: "General"}
        if(!checkId(ids.guild_id)) return {code: errors["49"].code, message: errors["49"].message, file: "General"}
        if(!checkId(ids.user_id)) return {code: errors["47"].code, message: errors["47"].message, file: "General"}
    }
    switch(type){
        case("user"):
            return `${baseurl}/avatars/${ids}/${link}.${extension}`
        break;
        case("guild"):
            return `${baseurl}/icons/${ids}/${link}.${extension}`
        break;
        case("member"):
            return `${baseurl}/guilds/${ids.guild_id}/users/${ids.user_id}/${link}.${extension}`
        break;
        case("splash"):
            return `${baseurl}/splashes/${ids}/${link}.${extension}`
        break;
        case(("gbanner" || "ubanner")):
            return `${baseurl}/banners/${ids}/${link}.${extension}`
        break;
        case("role"):
            return `${baseurl}/role-icons/${ids}/${link}.${extension}`
        break;
        case("mbanner"):
            return `${baseurl}/guilds/${ids.guild_id}/users/${ids.user_id}/banners/${link}.${extension}`
        break;
        case("event"):
            return `${baseurl}/guild-events/${ids}/${link}.${extension}`
        break;
        default:
            return undefined
        break;
    }
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
module.exports.createdAt = (id) => {
    if(!id) return ({code: errors["13"].code, message: errors["13"].message, file: "General"})
    if(!checkId(id)) return {code: errors["81"].code, message: errors["81"].message, file: "General"}
    const discordSnowflake = {
        epoch: 1420070400000,
        decimalConvertion: 4194304
    }
    const accountCreationTimestamp = (parseInt(id)/discordSnowflake.decimalConvertion)+discordSnowflake.epoch
    return accountCreationTimestamp ? new Date(accountCreationTimestamp).toUTCString("fr") : null
}