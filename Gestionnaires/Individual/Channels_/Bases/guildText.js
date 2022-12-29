const TextBase = require("./textBase")
class guildText extends TextBase{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.name = channel.name
        this.permission_overwrites = channel.permission_overwrites
        this.nsfw = channel.nsfw ? channel.nsfw : false
        this.rate_limit_per_user = channel.rate_limit_per_user ? channel.rate_limit_per_user : 0
        this.parent_id = channel.parent_id
        this.parent = channel.parent ? channel.parent : null
        this.guild = channel.guild ? channel.guild : null
        this.guild_id = channel.guild_id
        this.vguild_id = channel.guild ? channel.guild.vguild_id : null
    }

    SetParent(parent){
        this.parent = parent
        return this
    }

    SetGuild(guild){
        this.guild = guild
        this.vguild_id = guild.vguild_id
        return this
    }

    bulkdelete(number){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/message").fetch_messages(this.bot_token, this.id, number)
            .catch(err => reject(err))
            .then(datas => {
                require("../../../../Methods/channel").bulkdelete(this.bot_token, this.id, datas.map(msg => msg.id))
                .catch(err => reject(err))
                .then(vdatas => { return resolve(vdatas)})
            })
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

    follownewsChannel(targetid){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").follownews(this.bot_token, this.id, targetid, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}

module.exports = guildText