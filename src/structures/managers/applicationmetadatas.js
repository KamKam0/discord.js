const ApplicationMetadata = require('../singles/applicationmetadata')

class ApplicationRoleConnectionsMetadata{
    constructor(_bot){
        this._bot = _bot
        this._token = _bot.token
        this.container = []
    }

    push(da){
        this.container.push(da)
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

    _add(data){
        this.container.push(new ApplicationMetadata(data, this._bot))
        return this
    }

    _addMultiple(datas){
        datas.map(data => this._add(data))
        return this
    }
}

module.exports = ApplicationRoleConnectionsMetadata