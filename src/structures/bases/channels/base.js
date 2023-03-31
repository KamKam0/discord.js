const Base = require("../baseguild")
const channelTypes = require("../../../types/channels")
const channelMethod = require("../../../methods/channel")

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
        this._modifyGetDatas()
        return this
    }

    #type(type){
        return this._typechange(channelTypes.revert(), type)
    }

    /**
     * 
     * @param {object[]} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return channelMethod.modify(informations, options)
    }
}

module.exports = base