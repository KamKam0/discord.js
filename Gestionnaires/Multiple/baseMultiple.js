class baseMultiple{
    constructor(_bot, guild_id, name){
        this.container = []
        this._bot = _bot
        this.guild_id = guild_id || null
        this.name = name
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

    __delete(data){
        if(this.container.find(me => me.id === data)) this.container.splice(this.container.indexOf(this.container.find(me => me.id === data)), 1)
        return this
    }

    __deleteMultiple(datas){
        datas.map(data => this.__delete(data))
        return this
    }

    __add(data){//Exception sur interactions et channels et mentions et reactions
        let clas;
        switch(this.name){
            case("automod"):
                clas = require("../Individual/AutoModeration")
            break;
            case("ban"):
                clas = require("../Individual/Ban")
            break;
            case("command"):
                clas = require("../../Classes/ApplicationCommand")
            break;
            case("emoji"):
                clas = require("../Individual/Emoji")
            break;
            case("event"):
                clas = require("../Individual/Event")
            break;
            case("guild"):
                clas = require("../Individual/Guild")
            break;
            case("integration"):
                clas = require("../Individual/Integration")
            break;
            case("invite"):
                clas = require("../Individual/Invite")
            break;
            case("member"):
                clas = require("../Individual/Member")
            break;
            case("message"):
                clas = require("../Individual/Message")
            break;
            case("presence"):
                clas = require("../Individual/Presence")
            break;
            case("role"):
                clas = require("../Individual/Role")
            break;
            case("stage"):
                clas = require("../Individual/StageInstance")
            break;
            case("sticker"):
                clas = require("../Individual/Sticker")
            break;
            case("template"):
                clas = require("../Individual/Template")
            break;
            case("thread"):
                clas = require("../Individual/Channels_/Channel_11")
            break;
            case("voice"):
                clas = require("../Individual/Voice")
            break;
            case("webhook"):
                clas = require("../Individual/Webhook")
            break;
            default:
                clas = null
            break;
        }
        if(!clas) return this
        this.container.push(new clas({...data, guild_id: this.guild_id}, this._bot))
        return this
    }

    __addMultiple(datas){
        datas.map(data => this.__add(data))
        return this
    }
}

module.exports = baseMultiple