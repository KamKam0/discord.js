const Base = require("../bases/basemuldecla")

class Reactions extends Base{
    constructor(bot){
        super(bot)

        this.container = []
    }

    _addMultiple(datas){
        datas.map(data => this._add(data))
        return this
    }

    _add(reaction){
        let tosearch = reaction.emoji.name ? reaction.emoji.name : reaction.emoji.id
        if(this.get(tosearch)) this.get(tosearch).AddCount(reaction)
        else this.container.push(reaction)
        return this
    }

    get(ID){
        return this.container.find(re => re.name === ID || re.id === ID)
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
}

module.exports = Reactions