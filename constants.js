const permissions_bitfield = {
    CREATE_INSTANT_INVITE: 0x0000000000000001,
    KICK_MEMBERS: 0x0000000000000002,
    BAN_MEMBERS: 0x0000000000000004,
    ADMINISTRATOR: 0x0000000000000008,
    MANAGE_CHANNELS: 0x0000000000000010,
    MANAGE_GUILD: 0x0000000000000020,
    ADD_REACTIONS: 0x0000000000000040,
    VIEW_AUDIT_LOG: 0x0000000000000080,
    PRIORITY_SPEAKER: 0x0000000000000100,
    STREAM: 0x0000000000000200,
    VIEW_CHANNEL: 0x0000000000000400,
    SEND_MESSAGES: 0x0000000000000800,
    SEND_TTS_MESSAGES: 0x0000000000001000,
    MANAGE_MESSAGES: 0x0000000000002000,
    EMBED_LINKS: 0x0000000000004000,
    ATTACH_FILES: 0x0000000000008000,
    READ_MESSAGE_HISTORY: 0x0000000000010000,
    MENTION_EVERYONE: 0x0000000000020000,
    USE_EXTERNAL_EMOJIS: 0x0000000000040000,
    VIEW_GUILD_INSIGHTS: 0x0000000000080000,
    CONNECT: 0x0000000000100000,
    SPEAK: 0x0000000000200000,
    MUTE_MEMBERS: 0x0000000000400000,
    DEAFEN_MEMBERS: 0x0000000000800000,
    MOVE_MEMBERS: 0x0000000001000000,
    USE_VAD: 0x0000000002000000,
    CHANGE_NICKNAME: 0x0000000004000000,
    MANAGE_NICKNAMES: 0x0000000008000000,
    MANAGE_ROLES: 0x0000000010000000,
    MANAGE_WEBHOOKS: 0x0000000020000000,
    MANAGE_EMOJIS_AND_STICKERS: 0x0000000040000000,
    USE_APPLICATION_COMMANDS: 0x0000000080000000,
    REQUEST_TO_SPEAK: 0x0000000100000000,
    MANAGE_EVENTS: 0x0000000200000000,
    MANAGE_THREADS: 0x0000000400000000,
    CREATE_PUBLIC_THREADS: 0x0000000800000000,
    CREATE_PRIVATE_THREADS: 0x0000001000000000,
    USE_EXTERNAL_STICKERS: 0x0000002000000000,
    SEND_MESSAGES_IN_THREADS: 0x0000004000000000,
    USE_EMBEDDED_ACTIVITIES: 0x0000008000000000,
    MODERATE_MEMBERS: 0x0000010000000000
}

const Colors = {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x57f287,
    BLUE: 0x3498db,
    YELLOW: 0xfee75c,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    FUCHSIA: 0xeb459e,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xed4245,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x5865f2,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a,
};

const channels_type = {
    "GUILD_TEXT":	0,
    "DM":	1,
    "GUILD_VOICE":	2,
    "GROUP_DM":	3,
    "GUILD_CATEGORY":	4,
    "GUILD_NEWS":	5,
    "GUILD_STORE":	6,
    "GUILD_NEWS_THREAD":	10,
    "GUILD_PUBLIC_THREAD":	11,
    "GUILD_PRIVATE_THREAD":	12,
    "GUILD_STAGE_VOICE":	13,
    "GUILD_FORUM": 15,
    "GUILD_DIRECTORY": 14
}

const Intents = {
    GUILDS: 1 << 0,

    GUILD_MEMBERS: 1 << 1,

    GUILD_BANS: 1 << 2,

    GUILD_EMOJIS_AND_STICKERS: 1 << 3,

    GUILD_INTEGRATIONS: 1 << 4,

    GUILD_WEBHOOKS: 1 << 5,

    GUILD_INVITES: 1 << 6,

    GUILD_VOICE_STATES: 1 << 7,

    GUILD_PRESENCES: 1 << 8,

    GUILD_MESSAGES: 1 << 9,

    GUILD_MESSAGE_REACTIONS: 1 << 10,

    GUILD_MESSAGE_TYPING: 1 << 11,

    DIRECT_MESSAGES: 1 << 12,

    DIRECT_MESSAGE_REACTIONS: 1 << 13,

    DIRECT_MESSAGE_TYPING: 1 << 14,

    GUILD_SCHEDULED_EVENTS: 1 << 16,

    AUTO_MODERATION_CONFIGURATION: 1 << 20,

    AUTO_MODERATION_EXECUTION: 1 << 21
}

const badges = {
    STAFF: 1,
    PARTNER: 2,
    HYPESQUAD: 4,
    BUG_HUNTER_LEVEL_1: 8,
    HYPESQUAD_ONLINE_HOUSE_1: 64,//Bravery
    HYPESQUAD_ONLINE_HOUSE_2: 128,//Brilliance
    HYPESQUAD_ONLINE_HOUSE_3: 256,//Balance
    PREMIUM_EARLY_SUPPORTER: 512,
    TEAM_PSEUDO_USER: 1024,
    BUG_HUNTER_LEVEL_2: 16384,
    VERIFIED_BOT: 65536,
    VERIFIED_DEVELOPER: 131072,
    CERTIFIED_MODERATOR: 262144,
    BOT_HTTP_INTERACTIONS: 524288,
    ACTIVE_DEVELOPER: 4194304,
    SUPPORT_COMMANDS_BOT: 8953856
}

const convert_channels = {
    0: "GUILD_TEXT",
    1: "DM",
    2: "GUILD_VOICE",
    3: "GROUP_DM",
    4: "GUILD_CATEGORY",
    5: "GUILD_ANNOUNCEMENT",
    10: "ANNOUNCEMENT_THREAD",
    11: "PUBLIC_THREAD",
    12: "PRIVATE_THREAD",
    13: "GUILD_STAGE_VOICE",
    14: "GUILD_DIRECTORY",
    15: "GUILD_FORUM"
}

const autoditTransforms = {
    "GUILD_UPDATE":	1,
    "CHANNEL_CREATE":	10,
    "CHANNEL_UPDATE":	11,
    "CHANNEL_DELETE":	12,
    "CHANNEL_OVERWRITE_CREATE":	13,
    "CHANNEL_OVERWRITE_UPDATE":	14,
    "CHANNEL_OVERWRITE_DELETE":	15,
    "MEMBER_KICK":	20,
    "MEMBER_PRUNE":	21,
    "MEMBER_BAN_ADD":	22,
    "MEMBER_BAN_REMOVE":	23,
    "MEMBER_UPDATE":	24,
    "MEMBER_ROLE_UPDATE":	25,
    "MEMBER_MOVE":	26,
    "MEMBER_DISCONNECT":	27,
    "BOT_ADD":	28,
    "ROLE_CREATE":	30,
    "ROLE_UPDATE":	31,
    "ROLE_DELETE":	32,
    "INVITE_CREATE":	40,
    "INVITE_UPDATE":	41,
    "INVITE_DELETE":	42,
    "WEBHOOK_CREATE":	50,
    "WEBHOOK_UPDATE":	51,
    "WEBHOOK_DELETE":	52,
    "EMOJI_CREATE":	60,
    "EMOJI_UPDATE":	61,
    "EMOJI_DELETE":	62,
    "MESSAGE_DELETE":	72,
    "MESSAGE_BULK_DELETE":	73,
    "MESSAGE_PIN":	74,
    "MESSAGE_UNPIN":	75,
    "INTEGRATION_CREATE":	80,
    "INTEGRATION_UPDATE":	81,
    "INTEGRATION_DELETE":	82,
    "STAGE_INSTANCE_CREATE":	83,
    "STAGE_INSTANCE_UPDATE":	84,
    "STAGE_INSTANCE_DELETE":	85,
    "STICKER_CREATE":	90,
    "STICKER_UPDATE":	91,
    "STICKER_DELETE":	92,
    "GUILD_SCHEDULED_EVENT_CREATE":	100,
    "GUILD_SCHEDULED_EVENT_UPDATE":	101,
    "GUILD_SCHEDULED_EVENT_DELETE":	102,
    "THREAD_CREATE":	110,
    "THREAD_UPDATE":	111,
    "THREAD_DELETE":	112,
    "APPLICATION_COMMAND_PERMISSION_UPDATE": 121,
    "AUTO_MODERATION_RULE_CREATE": 140,
    "AUTO_MODERATION_RULE_UPDATE": 141,
    "AUTO_MODERATION_RULE_DELETE": 142,
    "AUTO_MODERATION_BLOCK_MESSAGE": 143,
    "AUTO_MODERATION_FLAG_TO_CHANNEL": 144,
    "AUTO_MODERATION_USER_COMMUNICATION_DISABLED": 145
}

const languagesAvailable = [
    {id: "id", name: "Indonesian"},
    {id: "da", name: "Danish"},
    {id: "de", name: "German"},
    {id: "en-GB", name: "English, UK"}, 
    {id: "en-US", name: "English, US"}, 
    {id: "es-ES", name: "Spanish"},
    {id: "fr", name: "French"},
    {id: "hr", name: "Croatian"},
    {id: "it", name: "Italian"},
    {id: "lt", name: "Lithuanian"},
    {id: "hu", name: "Hungarian"},
    {id: "nl", name: "Dutch"},
    {id: "no", name: "Norwegian"},
    {id: "pl", name: "Polish"},
    {id: "pt-BR", name: "Portuguese, Brazilian"},
    {id: "ro", name: "Romanian"},
    {id: "fi", name: "Finnish"},
    {id: "sv-SE", name: "Swedish"},
    {id: "vi", name: "Vietnamese"},
    {id: "tr", name: "Turkish"},
    {id: "cs", name: "Czech"},
    {id: "el", name: "Greek"},
    {id: "bg", name: "Bulgarian"},
    {id: "ru", name: "Russian"},
    {id: "uk", name: "Ukrainian"},
    {id: "hi", name: "Hindi"},
    {id: "th", name: "Thai"},
    {id: "zh-CN", name: "Chinese"},
    {id: "ja", name: "Japanese"},
    {id: "zh-TW", name: "Chinese, Taiwan"},
    {id: "ko", name: "Korean"}
]

const messageTypes = {
    0: "DEFAULT",
    1: "RECIPIENT_ADD",
    2: "RECIPIENT_REMOVE",
    3: "CALL",
    4: "CHANNEL_NAME_CHANGE",
    5: "CHANNEL_ICON_CHANGE",
    6: "CHANNEL_PINNED_MESSAGE",
    7: "GUILD_MEMBER_JOIN",
    8: "USER_PREMIUM_GUILD_SUBSCRIPTION",
    9: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    10: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
    11: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    12: "CHANNEL_FOLLOW_ADD",
    14: "GUILD_DISCOVERY_DISQUALIFIED",
    15: "GUILD_DISCOVERY_REQUALIFIED",
    16: "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
    17: "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
    18: "THREAD_CREATED",
    19: "REPLY",
    20: "CHAT_INPUT_COMMAND",
    21: "THREAD_STARTER_MESSAGE",
    22: "GUILD_INVITE_REMINDER",
    23: "CONTEXT_MENU_COMMAND"
}

module.exports =  {convert_channels, badges, Intents, channels_type, Colors, permissions_bitfield, autoditTransforms, languagesAvailable, messageTypes}