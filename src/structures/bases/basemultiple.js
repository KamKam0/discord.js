const base = require("./basemuldecla")

class baseMultiple extends base{
    constructor(_bot, guild_id, name, getProperty='id'){
        super(_bot, guild_id)
        this.container = []
        this._ignoreParameters = []
        this._getProperty = getProperty
        this._name = name || null
        this._individualClass = null
        this._compareFunction = null
        this.#getIndividualClass()
    }

    #getIndividualClass(){
        switch(this._name){
            case("automod"):
                this._individualClass = require("../singles/automoderation")
            break;
            case("ban"):
                this._individualClass = require("../singles/ban")
            break;
            case("command"):
                this._individualClass = require("../applicationscommands/command")
            break;
            case("emoji"):
                this._individualClass = require("../singles/emoji")
            break;
            case("event"):
                this._individualClass = require("../singles/event")
            break;
            case("guild"):
                this._individualClass = require("../singles/guild")
            break;
            case("integration"):
                this._individualClass = require("../singles/integration")
            break;
            case("invite"):
                this._individualClass = require("../singles/invite")
            break;
            case("member"):
                this._individualClass = require("../singles/member")
            break;
            case("message"):
                this._individualClass = require("../singles/message")
            break;
            case("presence"):
                this._individualClass = require("../singles/presence")
            break;
            case("role"):
                this._individualClass = require("../singles/role")
            break;
            case("stage"):
                this._individualClass = require("../singles/stageinstance")
            break;
            case("sticker"):
                this._individualClass = require("../singles/sticker")
            break;
            case("template"):
                this._individualClass = require("../singles/template")
            break;
            case("voice"):
                this._individualClass = require("../singles/voice")
            break;
            case("webhook"):
                this._individualClass = require("../singles/webhook")
            break;
            case("application"):
                this._individualClass = require("../singles/application")
            break;
            case("threadmember"):
                this._individualClass = require("../singles/threadmember")
            break;
            case("cpermissions"):
                this._individualClass = require("../singles/permissions/channel")
            break;
            case("apermissions"):
                this._individualClass = require("../singles/permissions/application")
            break;
            case("applicationmetadata"):
                this._individualClass = require("../singles/applicationmetadata")
            break;
        }
    }

    push(da){
        this.container.push(da)
    }

    get(ID){
        return this.container.find(el => el[this._getProperty] === ID)
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

    _modify(data, isGuild=false){
        if (!this._individualClass) return null

        let oldInstance = this.get(data[this._getProperty])
        if(!oldInstance) return null

        if (!data.guild_id) {
            data = {...data, guild_id: this.guild_id}
        }

        let newInstance = new this._individualClass(data, this._bot)

        let modifications = oldInstance._modifyDatas(newInstance, this._ignoreParameters, this._compareFunction, isGuild)

        this._delete(data[this._getProperty])
        this._add(newInstance)
        
        if(!modifications.length) return null

        return {
            modifications,
            newInstance,
            oldInstance,
        }
    }

    _delete(data){
        if(this.container.find(me => me[this._getProperty] === data)) this.container.splice(this.container.indexOf(this.container.find(me => me[this._getProperty] === data)), 1)
        return this
    }

    _deleteMultiple(datas){
        datas.map(data => this._delete(data))
        return this
    }

    _add(data){
        if(!this._individualClass) return this
        if (data instanceof this._individualClass) {
            this.container.push(data)
        } else {
            this.container.push(new this._individualClass({...data, guild_id: this.guild_id}, this._bot))
        }
        return this
    }

    _addMultiple(datas){
        datas.map(data => this._add(data))
        return this
    }
}

module.exports = baseMultiple