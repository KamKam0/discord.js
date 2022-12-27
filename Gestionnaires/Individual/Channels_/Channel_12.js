const GuildText = require("./Bases/guildText")
class Channel extends GuildText{
    constructor(channel, bot){
        super(channel, bot)
        this.owner_id = channel.owner_id
        this.member_count = channel.member_count
        this.archived = channel.thread_metadata.archived
        this.auto_archive_duration =  channel.thread_metadata.auto_archive_duration,
        this.archive_timestamp = channel.thread_metadata.archive_timestamp
        this.locked = channel.thread_metadata.locked
    }
}
module.exports = Channel