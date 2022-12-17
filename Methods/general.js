module.exports.iconURL = (ids, link, type) => {
    if(!ids) return {code: require("../DB/errors.json")["13"].code, message: require("../DB/errors.json")["13"].message, file: "General"}
    if(!type) return {code: require("../DB/errors.json")["77"].code, message: require("../DB/errors.json")["77"].message, file: "General"}
    if(!["user", "guild", "gbanner", "ubanner" , "splash", "role", "event", "member", "mbanner"].includes(type)) return {code: require("../DB/errors.json")["78"].code, message: require("../DB/errors.json")["78"].message, file: "General"}
    if(!link) return null
    let extension = "png"
    let baseurl = "https://cdn.discordapp.com"
    if(link.includes("a_")) extension = "gif"
    if(["user", "guild", "gbanner", "ubanner" , "splash", "role", "event"].includes(type)){
        if(typeof ids !=="string") return {code: require("../DB/errors.json")["79"].code, message: require("../DB/errors.json")["79"].message, file: "General"}
        if(!require("../Utils/functions").check_id(ids)) return {code: require("../DB/errors.json")["81"].code, message: require("../DB/errors.json")["81"].message, file: "General"}
    }
    if(["member", "mbanner"].includes(type)){
        if(typeof ids !=="object") return {code: require("../DB/errors.json")["80"].code, message: require("../DB/errors.json")["80"].message, file: "General"}
        if(!require("../Utils/functions").check_id(ids.guild_id)) return {code: require("../DB/errors.json")["49"].code, message: require("../DB/errors.json")["49"].message, file: "General"}
        if(!require("../Utils/functions").check_id(ids.user_id)) return {code: require("../DB/errors.json")["47"].code, message: require("../DB/errors.json")["47"].message, file: "General"}
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

module.exports.createdAt = (id, type) => {
    if(!id) return ({code: require("../DB/errors.json")["13"].code, message: require("../DB/errors.json")["13"].message, file: "General"})
    if(!require("../Utils/functions").check_id(id)) return {code: require("../DB/errors.json")["81"].code, message: require("../DB/errors.json")["81"].message, file: "General"}
    const discordSnowflake = {
        epoch: 1420070400000,
        decimalConvertion: 4194304
    }
    const accountCreationTimestamp = (parseInt(id)/discordSnowflake.decimalConvertion)+discordSnowflake.epoch
    return accountCreationTimestamp ? new Date(accountCreationTimestamp).toUTCString("fr") : null
}