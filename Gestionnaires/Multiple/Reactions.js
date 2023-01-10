class Reactions{
    constructor(){
        this.reactions = []
    }

    __AddReaction(reaction){
        let tosearch = reaction.emoji.name ? reaction.emoji.name : reaction.emoji.id
        if(this.get(tosearch)) this.get(tosearch).AddCount(reaction)
        else this.reactions.push(reaction)
        return this
    }

    __AddReactions(Reactions){
        this.reactions.push(...Reactions)
        return this
    }

    get(ID){
        return this.reactions.find(re => re.name === ID || re.id === ID)
    }

    filter(filter){
        return this.reactions.filter(filter)
    }

    find(filter){
        return this.reactions.find(filter)
    }

    map(filter){
        return this.reactions.map(filter)
    }

    select(position){
        return this.reactions[position]
    }

    get length(){
        return this.reactions.length
    }
}

module.exports = Reactions