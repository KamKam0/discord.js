const base = require("./basemuldecla")

class baseMultiple extends base{
    constructor(_bot, guild_id, name){
        super(_bot, guild_id)
        this.container = []
        this.name = name || null
        this.individualClass = null
        switch(this.name){
            case("automod"):
                this.individualClass = require("../singles/automoderation")
            break;
            case("ban"):
                this.individualClass = require("../singles/ban")
            break;
            case("command"):
                this.individualClass = require("../applicationscommands/command")
            break;
            case("emoji"):
                this.individualClass = require("../singles/emoji")
            break;
            case("event"):
                this.individualClass = require("../singles/event")
            break;
            case("guild"):
                this.individualClass = require("../singles/guild")
            break;
            case("integration"):
                this.individualClass = require("../singles/integration")
            break;
            case("invite"):
                this.individualClass = require("../singles/invite")
            break;
            case("member"):
                this.individualClass = require("../singles/member")
            break;
            case("message"):
                this.individualClass = require("../singles/message")
            break;
            case("presence"):
                this.individualClass = require("../singles/presence")
            break;
            case("role"):
                this.individualClass = require("../singles/role")
            break;
            case("stage"):
                this.individualClass = require("../singles/stageinstance")
            break;
            case("sticker"):
                this.individualClass = require("../singles/sticker")
            break;
            case("template"):
                this.individualClass = require("../singles/template")
            break;
            case("voice"):
                this.individualClass = require("../singles/voice")
            break;
            case("webhook"):
                this.individualClass = require("../singles/webhook")
            break;
            case("threadmember"):
                this.individualClass = require("../singles/threadmember")
            break;
            case("cpermissions"):
                this.individualClass = require("../singles/permissions/channel")
            break;
            case("apermissions"):
                this.individualClass = require("../singles/permissions/application")
            break;
        }
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

    _modify(data){
        let modifications = this.get(data.id)._modifyDatas(data)
        if(modifications.length) return modifications
        this._delete(data.id)
        this._add(data)
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
        if(!this.individualClass) return this
        this.container.push(new this.individualClass({...data, guild_id: this.guild_id}, this._bot))
        return this
    }

    _addMultiple(datas){
        datas.map(data => this._add(data))
        return this
    }
}

module.exports = baseMultiple