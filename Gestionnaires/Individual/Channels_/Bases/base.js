class base{
    constructor(channel, bot){
        this.id = channel.id
        this.type = this.#type0(channel.type)
        this.bot_token = bot.discordjs.token
        this._bot = bot
    }

    Modify_Datas(channel){
        let tocheck = Object.entries(channel)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type0(e[1])) this[e[0]] = this.#type0(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    #type0(type){
        if(isNaN(type)) return type
        else return require("../../../../constants").convert_channels[type]
    }
}

module.exports = base