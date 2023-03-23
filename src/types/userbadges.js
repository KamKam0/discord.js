let types = {
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

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}