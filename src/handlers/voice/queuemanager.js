class Queue{
    #loop_state;
    #queueloop_state;
    #voiceInfos;
    constructor(voice){
        this.textChannel = null
        this.container = []
        this.#loop_state = false
        this.#queueloop_state = false
        this.np = null
        this.#voiceInfos = voice
    }

    getQueue(){
        return this.container
    }

    clearQueue(){
        this.container = [this.container[0]]
        return this
    }

    addSong(song){
        if(!song.place) song.place = this.container.length
        this.container.push(song)
        return song
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
        if(this.#loop_state) this.#loop_state = false
        else if(!this.#loop_state) this.#loop_state = true
        return this.#loop_state
    }

    get loopState(){
        return this.#loop_state
    }

    queueloop(){
        if(this.#queueloop_state) this.#queueloop_state = false
        else if(!this.#queueloop_state) this.#queueloop_state = true
        return this.#queueloop_state
    }

    get queueloopState(){
        return this.#queueloop_state
    }

    get next(){
        return this.container[0]
    }

    setNP(song){
        if(typeof song !== "object" || typeof song.time !== "number" || typeof song.title !== "string") return
        if(typeof song.seek === "number" && song.time < song.seek) return
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
        this.#loop_state = false
        this.#queueloop_state = false
        this.np = null
    }

    get length(){
        return this.container.length
    }

    get totalTime(){
        if(!this.#voiceInfos.playing || !this.np) return
        let time = this.container.reduce((a, b) => a + b.time, 0) - this.np.time
        time += this.ongoingTime
        return time
    }

    get timeBeforeLast(){
        if(!this.#voiceInfos.playing || !this.np) return
        let time = this.container.slice(0, (this.container.length - 1)).reduce((a, b) => a + b.time, 0) - this.np.time
        time += this.ongoingTime
        return time
    }

    get ongoingTime(){
        if(!this.#voiceInfos.playing || !this.np) return
        let played = Number((this.#voiceInfos.connection.state.playbackDuration / 1000).toFixed(0))
        if(this.np.seek && typeof this.np.seek === "number") played += this.np.seek
        let remaining = Number(this.np.time) - played
       return {total: Number(this.np.time), remaining, played}
    }

    _update(infos){
        this.#voiceInfos = infos
    }

    filter(filter){
        return this.container.filter(filter)
    }

    find(filter){
        return this.container.find(filter)
    }

    map(filter){
        return this.container.map(filter)
    }

    get(position){
        return this.container[position]
    }

    splice(starting, ending){
        this.container.splice(starting, ending)
    }
}

module.exports = Queue