class VoiceManager{
    constructor(bot){
        this.bot = bot
        this.adapters = new Map()

        bot.on("INVALID_SESSION", bot => {
          for (const [guild_id, adapter] of this.adapters.entries()) {
            adapter.destroy();
        }
        })
    }

    onVoiceServer(payload) {
      this.adapters.get(payload.guild_id)?.onVoiceServerUpdate(payload);
    }
  
    onVoiceStateUpdate(payload) {
      if(payload.guild_id && payload.session_id && payload.user_id === this.bot.user?.id) {
        this.adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload);
      }
    }
}

module.exports = VoiceManager