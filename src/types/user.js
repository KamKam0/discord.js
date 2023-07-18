let badges = {
    Staff: 1,
    Partner: 2,
    HypeSquad: 4,
    BugHunterOne: 8,
    HypeSquadBravery: 64,
    HypeSquadBrilliance: 128,
    HypeSquadBalance: 256,
    PremiumEarlySupporter: 512,
    TeamPseudoUser: 1024,
    BugHunterTwo: 16384,
    VerifiedBot: 65536,
    VerifiedDevelopper: 131072,
    CertifiedModerator: 262144,
    BotHTTPInteractions: 524288,
    ActiveDevelopper: 4194304,
    SupportCommandsBot: 8953856
}

let nitro =  {
    None: 0,
    Classic: 1,
    Nitro: 2,
    Basic: 3 
}

module.exports =  {
    badges,
    nitro
}

module.exports.revert = {
    badges: () => revert(badges),
    nitro: () => revert(nitro),
}

function revert(types){
    return require("../utils/functions").general.revertTypes(types)
}