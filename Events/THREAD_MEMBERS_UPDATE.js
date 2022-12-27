const ThreadUpdate = require("../Event Result/ThreadMembersUpdate")
const Members = require("../Gestionnaires/Multiple/Members")
module.exports = async (bot, datas) => {
    const guild = bot.guilds.get(datas.guild_id)
    if(!guild) return
    let thread = guild.threads.get(datas.id)
    if(!thread) return
    thread.SetMemberCount(datas.member_count)
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
    if(datas.added_members) to_transmit.added_members = (new Members(bot)).AddMembers(datas.added_members)
    if(datas.removed_member) to_transmit.removed_member = (new Members(bot)).AddMembers(datas.removed_member)

    if(bot.database_state === "stable") bot.emit(name(), bot, (new ThreadUpdate(to_transmit, bot)).SetGuild(guild).SetThread(thread))
}

function name(){ return "THREAD_MEMBERS_UPDATE" }