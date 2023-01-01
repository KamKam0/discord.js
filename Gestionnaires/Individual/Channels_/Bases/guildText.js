const TextBase = require("./textBase")
class guildText extends TextBase{
    constructor(channel, bot){
        super(channel, bot)
        this.rate_limit_per_user = channel.rate_limit_per_user || 0
        //

        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ?? false
        this.parent_id = channel.parent_id || null
        this.parent = this.parent_id ? bot.channels.get(this.parent_id) : null
        this.guild_id = channel.guild_id || null
        this.guild = channel.guild || bot.guilds.get(this.guild_id) || null
        this.vguild_id = channel.guild ? channel.guild.vguild_id : null
    }

    bulkdelete(number){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, number, this._bot)
            .catch(err => reject(err))
            .then(datas => {
                require("../../../../Methods/channel").bulkdelete(this.bot_token, this.id, datas.map(msg => msg.id), this._bot)
                .catch(err => reject(err))
                .then(vdatas => { return resolve(vdatas)})
            })
        })
    }

    follownewsChannel(targetid){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").follownews(this.bot_token, this.id, targetid, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
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

module.exports = guildText