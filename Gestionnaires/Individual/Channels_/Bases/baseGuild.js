const Base = require("./base")
class baseGuild extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.parent_id = channel.parent_id || null
        this.parent = this.parent_id ? bot.channels.get(this.parent_id) : null
        this.guild_id = channel.guild_id || null
        this.guild = this.guild_id ? bot.guilds.get(this.guild_id) : null
        this.vguild_id = channel.guild ? channel.guild.vguild_id : nul
    }

    getinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").getinvites(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    createinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").createinvite(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    editpermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").editpermissions(this.bot_token, this.id, overwrites, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    deletepermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").deletepermission(this.bot_token, this.id, overwrites, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = baseGuild