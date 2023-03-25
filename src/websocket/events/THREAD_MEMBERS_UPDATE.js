const ThreadUpdate = require("./results/threadmembersupdate")
const Members = require("../../structures/managers/members")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    let thread = guild.threads.get(datas.id)
    if(!thread) return
    let to_transmit = {
        id: datas.id,
        thread: thread,
        guild: guild,
        guild_id: guild.id,
        bot_token: bot.discordjs.token,
        added_members: null,
        removed_member: null,
        member_count: datas.member_count
    }
    if(datas.added_members) to_transmit.added_members = (new Members(bot))._addMultiple(datas.added_members)
    if(datas.removed_member) to_transmit.removed_member = (new Members(bot))._addMultiple(datas.removed_member)

    if(bot.databaseState !== "unstable") bot.emit(name(), bot, new ThreadUpdate(to_transmit, bot))
}

function name(){ return "THREAD_MEMBERS_UPDATE" }