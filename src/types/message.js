let types = {
    Default: 0,
    RecipientAdd: 1,
    RecipientRemove: 2,
    Call: 3,
    ChannelNameChange: 4,
    ChannelIconChange: 5,
    ChannelPinndeMessage: 6,
    GuildMemberJoin: 7,
    UserPremiumGuildSubscription: 8,
    UserPremiumGuildSubscriptionTierOne: 9,
    UserPremiumGuildSubscriptionTierTwo: 10,
    UserPremiumGuildSubscriptionTierThree: 11,
    ChannelFollowAdd: 12,
    GuildDiscoveryDisqualified: 14,
    GuildDiscoveryRequalified: 15,
    GuildDiscoveryGracePeriodInitialWarning: 16,
    GuildDiscoveryGracePeriodFinalWarning: 17,
    ThreadCreated: 18,
    Reply: 19,
    ChatInputComment: 20,
    ThreadStarterMessage: 21,
    GuildInviteReminder: 22,
    ContextMenuComment: 23
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypess(types)
}