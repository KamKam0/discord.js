const Base = require("../../base")
class base extends Base{
    constructor(channel, bot){
        super(bot)
        this.id = channel.id
        this.type = this.#type0(channel.type)
    }

    __Modify_Datas(channel){
        let tocheck = Object.entries(channel)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type0(e[1])) this[e[0]] = this.#type0(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this.__Modify_Get_Datas()
        return this
    }

    #type0(type){
        return this.__typechange(require("../../../../constants").convert_channels, type)
    }
}

module.exports = base