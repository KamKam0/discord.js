const base = require("./basemuldecla")

class baseMultiple extends base{
    constructor(_bot, guild_id, name){
        super(_bot, guild_id)
        this.container = []
        this.name = name || null
        this.modifyConstants = []
    }

    _modifyDatas(){
        let tocheck = Object.entries(automod)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                let comparison = this.modifyConstants.find(element => element.name === e[0])
                if(comparison){
                    if(this[e[0]] !== this[comparison].function(e[1])) this[e[0]] = this[comparison].function(e[1])
                }else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this._modifyGetDatas()
        if(this.actions.metadata.channel) this.actions.metadata.channel = bot.channels.get(this.actions.metadata.channel_id)
        return this
    }

    push(da){
        this.container.push(da)
    }

    get(ID){
        return this.container.find(el => el.id === ID)
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

    select(position){
        return this.container[position]
    }

    get length(){
        return this.container.length
    }

    _delete(data){
        if(this.container.find(me => me.id === data)) this.container.splice(this.container.indexOf(this.container.find(me => me.id === data)), 1)
        return this
    }

    _deleteMultiple(datas){
        datas.map(data => this._delete(data))
        return this
    }

    _add(data){
        let clas;
        switch(this.name){
            case("automod"):
                clas = require("../singles/autoModeration")
            break;
            case("ban"):
                clas = require("../singles/ban")
            break;
            case("command"):
                clas = require("../applicationscommands/command")
            break;
            case("emoji"):
                clas = require("../singles/emoji")
            break;
            case("event"):
                clas = require("../singles/event")
            break;
            case("guild"):
                clas = require("../singles/guild")
            break;
            case("integration"):
                clas = require("../singles/integration")
            break;
            case("invite"):
                clas = require("../singles/invite")
            break;
            case("member"):
                clas = require("../singles/member")
            break;
            case("message"):
                clas = require("../singles/message")
            break;
            case("presence"):
                clas = require("../singles/presence")
            break;
            case("role"):
                clas = require("../singles/role")
            break;
            case("stage"):
                clas = require("../singles/stageInstance")
            break;
            case("sticker"):
                clas = require("../singles/sticker")
            break;
            case("template"):
                clas = require("../singles/template")
            break;
            case("voice"):
                clas = require("../singles/voice")
            break;
            case("webhook"):
                clas = require("../singles/webhook")
            break;
            case("threadmember"):
                clas = require("../singles/threadmember")
            break;
            case("cpermissions"):
                clas = require("../singles/permissions/channel")
            break;
            case("apermissions"):
                clas = require("../singles/permissions/application")
            break;
            default:
                clas = null
            break;
        }
        if(!clas) return this
        this.container.push(new clas({...data, guild_id: this.guild_id}, this._bot))
        return this
    }

    _addMultiple(datas){
        datas.map(data => this._add(data))
        return this
    }
}

module.exports = baseMultiple