let entityType = { 
    StageInstance: 1, 
    Voice: 2, 
    External: 3 
}

let status = { 
    Scheduled: 1, 
    Active: 2, 
    Completed: 3, 
    Canceled: 4 
}

let privacyLevel = { 
    GuildOnly: 1
}

module.exports = {
    entityType,
    status,
    privacyLevel
}

module.exports.revert = {
    entityType: () => revert(entityType),
    status: () => revert(status),
    privacyLevel: () => revert(privacyLevel)
}

function revert(){
    return require("../utils/functions").general.revertTypes(types)
}