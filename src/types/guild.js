let verificationLevel = { 
    None: 0, 
    Low: 1, 
    Medium: 2, 
    High: 3, 
    VeryHigh: 4 
}

let defaultMessageNotifications = {
    AllMessages: 0,
    OnlyMentions: 1
}

let explicitContentFilter = { 
    Disabled: 0, 
    MemberWithoutRoles: 1,
    AllMembers: 2 
}

let mfaLevel = {
    None: 0,
    Elevated: 1
}

let premiumTier = { 
    None: 0, 
    TierOne: 1, 
    TierTwo: 2, 
    TierThree: 3 
}

let nsfwLevel = { 
    Default: 0, 
    Explicit: 1,
    Safe: 2, 
    AgeRestricted: 3 
}

let systemChannel = {
    SuppressJoinNotifications:	1 << 0,
    SuppressPremiumSubscriptions:	1 << 1,
    SuppressGuildReminderNotifications:	1 << 2,
    SuppressJoinNotificationReplies:	1 << 3,
    SuppressRolesubscriptionPurchaseNotifications:	1 << 4,
    SuppressRolesubscriptionPurchaseNotificationReplies:	1 << 5
}


module.exports = {
    verificationLevel,
    defaultMessageNotifications,
    explicitContentFilter,
    mfaLevel,
    premiumTier,
    nsfwLevel,
    systemChannel
}

module.exports.revert = {
    verificationLevel: () => revert(verificationLevel),
    defaultMessageNotifications: () => revert(defaultMessageNotifications),
    explicitContentFilter: () => revert(explicitContentFilter),
    mfaLevel: () => revert(mfaLevel),
    premiumTier: () => revert(premiumTier),
    nsfwLevel: () => revert(nsfwLevel),
    systemChannel: () => revert(systemChannel)
}

function revert(types){
    return require("../utils/functions").general.revertTypes(types)
}