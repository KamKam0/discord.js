const queueManager = require("./queueManager")
class voiceManager{
    #timeout;
    #timeoutMusic;
    #deployed;
    #buffering;
    #oldBuffering;
    #realDefaultTiemout;
    constructor(bot, guild_id){
        this.defaultTimeout = 10
        this.#realDefaultTiemout = this.defaultTimeout * 60 * 1000
        this.state = false
        this.#deployed = false
        this.paused_since = null
        this.playing = false
        this.connection = null
        this.resource = null
        this.managing = false
        this.#timeout = null
        this.#timeoutMusic;
        this.queue = new queueManager(this)
        this._bot = bot
        this.channel_id = null
        this.id = guild_id
        this.__Handler = this.__handlepacket.bind(this)
        this.#buffering = null
        this.#oldBuffering = null
    }

    __setDefaultTiemout(time){
        this.defaultTimeout = time
    }

    __deploy(){
        if(this.#deployed) return
        this._bot.setMaxListeners(this._bot.getMaxListeners() + 3)
        this._bot.addListener("VOICE_CREATE", this.__Handler)
        this._bot.addListener("VOICE_DELETE", this.__Handler)
        this._bot.addListener("VOICE_UPDATE", this.__Handler)
        this.#deployed = true
    }

    __undeploy(){
        if(!this.#deployed) return
        this._bot.removeListener("VOICE_CREATE", this.__Handler)
        this._bot.removeListener("VOICE_DELETE", this.__Handler)
        this._bot.removeListener("VOICE_UPDATE", this.__Handler)
        this._bot.setMaxListeners(this._bot.getMaxListeners() - 3)
        this.#deployed = false
        if(this.#timeout) {
            clearTimeout(this.#timeout)
            this.#timeout = null
        }
        if(this.#timeoutMusic) {
            clearTimeout(this.#timeoutMusic)
            this.#timeoutMusic = null
        }
    }

    __handlepacket(bot, voice, newvoice){
        if(this.state && voice.user_id !== bot.user.id && !voice.user.bot){
            if(newvoice && (newvoice.channel_id === this.channel_id || voice.channel_id === this.channel_id)){
                if(newvoice.channel_id === this.channel_id) {
                    clearTimeout(this.#timeout)
                    this.#timeout = null
                }
                else if(bot.guilds.get(this.id).voice_states.filter(e => !e.user.bot && e.channel_id === this.channel_id).length === 0){
                    if(!this.#timeout) this.#timeout = setTimeout(() => this.stop(), this.#realDefaultTiemout)
                }
            }else if(bot.guilds.get(this.id).voice_states.find(e => e.channel_id === voice.channel_id && e.user_id === voice.user_id) && voice.channel_id === this.channel_id){
                if(this.#timeout) {
                    clearTimeout(this.#timeout)
                    this.#timeout = null
                }
            } 
            else if(voice.channel_id === this.channel_id && bot.guilds.get(this.id).voice_states.filter(e => !e.user.bot && e.channel_id === this.channel_id).length === 0){
                    if(!this.#timeout) this.#timeout = setTimeout(() => this.stop(), this.#realDefaultTiemout)
                }
        }
        if(this.state && voice.user_id === bot.user.id){
            if(!newvoice && bot.guilds.get(this.id).voice_states.find(e => e.channel_id === voice.channel_id && e.user_id === voice.user_id) && voice.channel_id === this.channel_id){
                if(bot.guilds.get(this.id).voice_states.filter(e => !e.user.bot && e.channel_id === this.channel_id).length === 0) {
                    if(!this.#timeout) this.#timeout = setTimeout(() => this.stop(), this.#realDefaultTiemout)
                }
            } 
            else if(voice.channel_id === this.channel_id && !newvoice && !bot.guilds.get(this.id).voice_states.find(e => e.channel_id === voice.channel_id && e.user_id === voice.user_id)){
                this.__undeploy()
                this.stop()
            }
        }
    }

    end(){
        if(this.state && (this.playing || this.paused_since)) {
            this.connection.stop()
            this.connection = null
        }
    }

    stop(){
        if(this.state){
            this.queue.reset()
            if(this.connection) {
                this.connection.stop()
                this.connection = null
            }
            const {getVoiceConnection} = require("@discordjs/voice")
            getVoiceConnection(this.id)?.disconnect()
        }
        this.#reset()
    }

    #reset(){
        this.state = false
        this.#deployed = false
        this.paused_since = null
        this.playing = false
        this.connection = null
        this.resource = null
        this.managing = false
        this.channel_id = null
        if(this.#timeout) clearTimeout(this.#timeout)
        this.#timeout = null
        if(this.#timeoutMusic) clearTimeout(this.#timeoutMusic)
        this.#timeoutMusic = null
    }

    check(){
        return this.state
    }

    pause(){
        if(this.connection && this.playing){
            this.playing = false;
            this.connection.pause()
            this.paused_since = Date.now()
            this.queue.__update(this)
        }
    }

    resume(){
        if(this.connection && !this.playing){
            this.playing = true;
            this.connection.unpause()
            this.paused_since = null
            this.queue.__update(this)
        }
    }

    play(stream, volume){
        const {StreamType, createAudioResource, createAudioPlayer, getVoiceConnection} = require("@discordjs/voice")
        if(this.state){
            volume = this.#trvolume(volume)
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true});
            resource.volume.setVolume(volume)
            const player = createAudioPlayer();
        
            
            player.play(resource);
            getVoiceConnection(this.id).subscribe(player)
        
            this.connection = player
            this.resource = resource
            this.playing = true
            this.queue.__update(this)
            this.#mamangeinter()
        }

    }

    #mamangeinter(){
        this.connection.on("stateChange", async (oldstate, newstate) => {
            if(newstate.status === "playing" && this.#timeoutMusic){
                clearTimeout(this.#timeoutMusic)
                this.#timeoutMusic = null
            }
            if(oldstate.status === "buffering" && newstate.status === "idle") this.end()
            if(oldstate.status === "buffering") this.#buffering = Date.now()
            if(newstate.status === "idle"){
                this.#oldBuffering = Number(this.#buffering)
                this.#buffering = null
                this.playing = false
                this.connection = null
                this.managing = false
                this.resource = null
                if(!this.#timeoutMusic) this.#timeoutMusic = setTimeout(() => this.stop(), this.#realDefaultTiemout)
                this.queue.__update(this)
            }
        })
        this.connection.on("stateChange", async (oldstate, newstate) => { 
            if(newstate.status === "disconnected" || newstate.status === "autopaused") return this.stop() 
        })
    }

    manageVoice(fonction){
        if(this.managing) return
        let trueargs = Array(...arguments)
        trueargs.splice(0, 1)
        this.connection.on("stateChange", async (oldstate, newstate) => {
            if((oldstate.status === "buffering" && newstate.status === "idle") ||  (oldstate.status === "playing" && newstate.status === "idle")){
                if((oldstate.status === "playing" && newstate.status === "idle") && Date.now() - this.#oldBuffering <250) return fonction(this.queue.np, ...trueargs)
                if(this.queue.loopState) fonction(this.queue.np, ...trueargs)
                else if(this.queue.queueloopState){
                    this.queue.addSong(this.queue.np)
                    this.queue.removeSong()
                    fonction(this.queue.next, ...trueargs)
                }
                else{
                    this.queue.removeSong()
                    fonction(this.queue.next, ...trueargs)
                }
            }
        })
        this.connection.on("error", err =>{
            this.managing = false
            console.log(err)
        }) 
    }

    setvolume(volume){
        if(this.connection){
            volume = this.#trvolume(volume)
            this.resource.volume.setVolume(volume)
        } 
    }

    #trvolume(volume){
        if(volume){
            if(!isNaN(volume)){
                if(typeof volume !== "number") volume = Number(volume)
                if(volume <0) volume = 100
                if(volume >1) volume = volume / 100
            }
            else volume = 1
        }
        else volume = 1
        return volume
    }

    get voiceAdapterCreator() {
        return methods => {
          this._bot.voice.adapters.set(this.id, methods);
          return {
            sendPayload: data => {
              if (this._bot.state !== "ready") return false;
              this._bot.discordjs.ws.send(JSON.stringify(data));
              return true;
            },
            destroy: () => {
              this._bot.voice.adapters.delete(this.id);
            },
          };
        };
    }
}

module.exports = voiceManager