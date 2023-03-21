const Base = require("../baseguild")
class base extends Base{
    constructor(channel, bot){
        super(channel, bot)
        this.id = channel.id
        this.type = this.#type(channel.type)
    }

    _Modify_Datas(channel){
        let tocheck = Object.entries(channel)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type(e[1])) this[e[0]] = this.#type(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._Modify_Get_Datas()
        return this
    }

    #type(type){
        return this._typechange(require("../../../../constants").convert_channels, type)
    }
}

module.exports = base