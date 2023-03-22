let types = {
    GuildText:	0,
    DM:	1,
    GuildVoice:	2,
    GroupDM:	3,
    GuildCategory:	4,
    GuildNews:	5,
    GuildStore:	6,
    GuildNewsThread:	10,
    GuildPublicThread:	11,
    GuildPrivateThread:	12,
    GuildStageVoice:	13,
    GuildForum: 15,
    GuildDirectory: 14
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypess(types)
}