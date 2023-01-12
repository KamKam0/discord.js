class base{
    constructor(bot){
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }

    __Modify_Get_Datas(){
        if(this.guild_id) this.guild = this._bot.guilds.get(this.guild_id) || null
        if(this.channel_id) this.channel = this._bot.channels.get(this.channel_id) || null
        if(this.member_id && this.guild_id) this.member = this.guild.members.get(this.member_id) || null
        if(this.user_id) this.user = this._bot.users.get(this.user_id) || null
        if(this.owner_id && this.guild_id) this.owner = this.guild.members.get(this.owner_id) || null
        if(this.parent_id && this.guild_id) this.parent = this._bot.channels.get(this.parent_id) || null
        if(this.creator_id) this.creator = this._bot.users.get(this.creator_id) || null
        if(this.inviter_id) this.inviter = this._bot.users.get(this.inviter_id) || null
        if(this.voice && this.voice.presence && this.guild_id && this.user_id) this.voice.presence = this.guild.voice_states.get(this.user_id) || null
        if(this.voice && this.voice.channel && this.guild_id && this.channel_id) this.voice.channel = this.guild.channels.get(this.channel_id) || null
    }
}

module.exports = base