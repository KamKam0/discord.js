const baseMultiple = require("./baseMultiple")
class Mentions extends baseMultiple{
    constructor(_bot, guild_id, type){
        super(_bot, guild_id, "member")
        this.type = type || "member"
    }

    __add(mention){
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

}

module.exports = Mentions