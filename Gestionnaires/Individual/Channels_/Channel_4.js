const Base = require("./Bases/base")
class Channel extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.guild_id = channel.guild_id
        this.guild = channel.guild || bot.guilds.get(this.guild_id) || null
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.vguild_id = this.guild ? this.guild.vguild_id : null
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