class Queue{
    #loop_state;
    #queueloop_state;
    #voiceInfos;
    constructor(voice){
        this.textChannel = null
        this.container = []
        this.#loop_state = "false"
        this.#queueloop_state = "false"
        this.np = null
        this.#voiceInfos = voice
    }

    getQueue(){
        return this.container
    }

    clearQueue(){
        this.container = []
        return this
    }

    addSong(song){
        this.container.push(song)
        return this.container
    }

    removeSong(option){
        if(!option) this.container.shift()
        else if(!isNaN(option)){
            option = Number(option)
            if(this.container.length < option) return this.container
            this.container.splice(option, 1)
        }
        return this.container
    }

    loop(){
        if(this.loop_state === "false"){
            this.loop_state = "true"
            return true
        }
        else if(this.loop_state === "true"){
            this.loop_state = "false"
            return false
        }
    }

    get loopState(){
        return Boolean(this.loop_state)
    }

    queueloop(){
        if(this.#queueloop_state === "false"){
            this.#queueloop_state = "true"
            return true
        }
        else if(this.#queueloop_state === "true"){
            this.#queueloop_state = "false"
            return false
        }
    }

    get queueloopState(){
        return Boolean(this.#queueloop_state)
    }

    get next(){
        return this.container[0]
    }

    setNP(song){
        this.np = song
        return song
    }

    removeNP(){
        this.np = null
        return null
    }

    reset(){
        this.textChannel = null
        this.container = []
        this.#loop_state = "false"
        this.#queueloop_state = "false"
        this.np = null
    }

    get totalTime(){
        if(this.#voiceInfos.playing === "false") return
        let time = this.container.reduce((a, b) => a + b.time, 0) - this.np.time
        time -= Number(this.np.time) - (this.#voiceInfos.connection._state.playbackDuration / 1000).toFixed(0)
        return time
    }
}

module.exports = Queue