class ThreadUpdate{
    constructor(threadupdate, bot){
        this.guild_id = threadupdate.guild_id || null
        this.guild = threadupdate.guild || bot.guilds.get(this.guild_id) || null
        this.bot_token = bot.discordjs.token
        this.id = threadupdate.id
        this.thread = new (require("../Gestionnaires/Individual/Channels_/Channel_11"))(threadupdate.thread, bot)
        this.added_members = threadupdate.added_members
        this.removed_member = threadupdate.removed_member
        this.member_count = threadupdate.member_count
        this._bot = bot
    }
}
module.exports = ThreadUpdate