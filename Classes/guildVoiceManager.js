const queueManager = require("./queueManager")
class voiceManager{
    constructor(bot, guild_id){
        this.state = false
        this.paused_since = null
        this.playing = false
        this.connection = null
        this.resource = null
        this.managing = false
        this.queue = new queueManager(this)
        this._bot = bot
        this.id = guild_id
    }

    end(){
        if(this.state && (this.playing || this.paused_since)) this.connection.stop()
    }

    stop(){
        if(this.state){
            this.queue.reset()
            this.connection.stop()
            const {getVoiceConnection} = require("@discordjs/voice")
            getVoiceConnection(this.id).disconnect()
            this.reset()
        }
    }

    reset(){
        this.state = false
        this.paused_since = null
        this.playing = false
        this.connection = null
        this.resource = null
        this.managing = false
    }

    check(){
        return this.state
    }

    pause(){
        if(this.connection && this.playing){
            this.playing = false;
            this.connection.pause()
            this.paused_since = Date.now()
            this.queue._update(this)
        }
    }

    resume(){
        if(this.connection && !this.playing){
            this.playing = true;
            this.connection.unpause()
            this.paused_since = null
            this.queue._update(this)
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
            this.queue._update(this)
        }

    }

    manageVoice(fonction){
        if(this.managing) return
        let trueargs = Array(...arguments)
        trueargs.splice(0, 1)
        this.connection.on("stateChange", async (oldstate, newstate) => {
            if(oldstate.status === "playing" && newstate.status === "idle"){
                this.managing = false
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
        this.connection.on("stateChange", async (oldstate, newstate) => { 
            if(newstate.status === "disconnected" || newstate.status === "autopaused") return this.reset() 
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