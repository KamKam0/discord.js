const baseMutliple = require("./baseMultiple")
class Mentions extends baseMutliple{
    constructor(_bot, guild_id, type){
        super(_bot, guild_id)
        this.type = type || "member"
    }

    AddMention(mention){
        let datas;
        switch(this.type){
            case("role"):
                datas = this._bot.guilds.get(this.guild_id).roles.get(mention)
            break;
            case("member"):
                datas = this._bot.guilds.get(this.guild_id).members.get(mention)
            break;
            case("channel"):
                datas = this._bot.guilds.get(this.guild_id).channels.get(mention)
            break;
        }
        if(datas) this.container.push(datas)
        return this
    }

    AddMentions(mentions){
        mentions.map(me => this.AddMention(me))
        return this
    }

    DeleteMember(ID){
        this.container.splice(this.container.indexOf(this.container.find(me => me.id === ID)), 1)
        return this
    }

}

module.exports = Mentions