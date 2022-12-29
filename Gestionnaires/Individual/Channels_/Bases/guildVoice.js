const Base = require("./base")
class guildVoice extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.position = channel.position
        this.permission_overwrites = channel.permission_overwrites
        this.name = channel.name
        this.nsfw = channel.nsfw ? channel.nsfw : false
        this.bitrate = channel.bitrate
        this.user_limit = channel.user_limit
        this.parent_id = channel.parent_id
        this.parent = channel.parent ? channel.parent : null
        this.rtc_region = channel.rtc_region
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

    getinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").getinvites(this.bot_token, this.id, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - getinvites, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    createinvites(){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").createinvite(this.bot_token, this.id, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - createinvites, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    editpermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").editpermissions(this.bot_token, this.id, overwrites, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - editpermissions, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    deletepermissions(overwrites){
        return new Promise(async (resolve, reject) => {
            require("../../../../Methods/channel").deletepermission(this.bot_token, this.id, overwrites, this._bot)
            .catch(err => {
                let er = new Error("Une erreur s'est produite lors de la requête - deletepermissions, guildtext")
                er.content = err
                reject(er)
            })
            .then(datas => { return resolve(datas)})
        })
    }

    join(deaf, mute){
        const {joinVoiceChannel} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        guild.ResetVoice()
        guild.voice.state = "on"
        joinVoiceChannel({
            channelId: this.id,
            guildId: this.guild_id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: deaf ?? false,
            selfMute: mute ?? false
        })
    }

    leave(){
        const {getVoiceConnection} = require("@discordjs/voice")
        let guild = this._bot.guilds.get(this.guild_id)
        if(guild.voice.state === "on") getVoiceConnection(guild.id).disconnect()
        if(guild.voice.state === "on") guild.ResetVoice()
    }
}

module.exports = guildVoice