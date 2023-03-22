module.exports = "https://discord.com/api/v10"

module.exports.routes = {
    applicationMetadata: require("./applicationmetadata"),
    autoModeration: require("./automoderation"),
    ban: require("./ban"),
    channel: require("./channel"),
    emoji: require("./emoji"),
    event: require("./event"),
    guild: require("./guild"),
    invite: require("./invite"),
    member: require("./member"),
    message: require("./message"),
    reaction: require("./reaction"),
    role: require("./role"),
    stage: require("./stage"),
    sticker: require("./sticker"),
    template: require("./template"),
    threads: require("./threads"),
    user: require("./user"),
    voice: require("./voice"),
    webhook: require("./webhook")
}