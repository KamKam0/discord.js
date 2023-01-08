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
        this.container = []
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
        if(!this.#loop_state) this.#loop_state = true
        return this.loopState
    }

    get loopState(){
        return this.loop_state
    }

    queueloop(){
        if(this.#queueloop_state) this.#queueloop_state = false
        if(!this.#queueloop_state) this.#queueloop_state = true
        return this.#queueloop_state
    }

    get queueloopState(){
        return this.#queueloop_state
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
        this.#loop_state = false
        this.#queueloop_state = false
        this.np = null
    }

    get length(){
        return this.container.length
    }

    get totalTime(){
        if(!this.#voiceInfos.playing) return
        let time = this.container.reduce((a, b) => a + b.time, 0) - this.np.time
        time += (Number(this.np.time) - (this.#voiceInfos.connection._state.playbackDuration / 1000).toFixed(0))
        return time
    }

    get timeBeforeLast(){
        if(!this.#voiceInfos.playing) return
        let time = this.container.slice(0, (this.container.length - 1)).reduce((a, b) => a + b.time, 0) - this.np.time
        time += (Number(this.np.time) - (this.#voiceInfos.connection._state.playbackDuration / 1000).toFixed(0))
        return time
    }

    get ongoingTime(){
        if(!this.#voiceInfos.playing) return
        let played = (this.#voiceInfos.connection._state.playbackDuration / 1000).toFixed(0)
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