const Base = require("./Bases/base")
class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.guild = channel.guild || null
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.guild_id = channel.guild_id
        this.vguild_id = channel.guild ? channel.guild.vguild_id : null
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }
    
    edit(options){
        return new Promise(async (resolve, reject) => {
            require("../../../Methods/channel").modify(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}
module.exports = Channel