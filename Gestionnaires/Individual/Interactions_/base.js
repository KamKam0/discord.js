const Message = require("../Message")
const User = require("../User")
class base{
    constructor(interaction, bot){
        this.id = interaction.id
        this.application_id = interaction.application_id
        this._bot = bot
        this.custom_id = interaction.data.custom_id
        this.guild_id = interaction.guild_id || null
        this.guild = interaction.guild || bot.guilds.get(this.guild_id) || null
        this.channel_id = interaction.channel_id
        this.message = interaction.message ? (new Message({...interaction.message, guild_id: interaction.guild_id, channel_id: interaction.channel_id}, bot)) : null
        this.channel = interaction.channel ? bot.channels.get(this.channel_id) : require("../../../Utils/functions").channel_backup(interaction.channel_id, interaction.bot_token, bot)
        this.user_id = interaction.user ? interaction.user.id : interaction.member.user.id
        this.user = bot.users.get(this.user_id) ?? new User(interaction.user, bot)
        this.member = interaction.member && this.guild ? this.guild.members.get(this.user_id) : null
        this.token = interaction.token
        this.version = interaction.version
        this.guild_locale = interaction.guild_locale
        this.locale = interaction.locale
        this.bot_token = bot.discordjs.token
        this.bot_id = interaction.bot_id
    }

    __Modify_Datas(inte){
        let tocheck = Object.entries(inte)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined") if(this[e[0]] !== e[1]) this[e[0]] = e[1] 
        })
        return this
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    reply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").reply(this.bot_token, this, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modifyreply(options){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").modifyreply(this.bot_token, this.bot_id, this, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    deletereply(){
        return new Promise((resolve, reject) => {
            require("../../../Methods/interaction").deletereply(this.bot_token, this.bot_id, this, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }
    
    get createdAt(){
        return  require("../../../Methods/general").createdAt(this.id, "interaction")
    }

    #SendSpe(msg, truetype, type){
        return new Promise(async (resolve, reject) => {
            if(!type) type = "reply"
            let embed = new (require("../../../Classes/Embed"))()
            switch(truetype){
                case("error"): 
                    embed
                    .setDescription(`❌ | ${msg}`)
                    .setColor("RED")
                break;
                case("success"): 
                    embed
                    .setDescription(`✅ | ${msg}`)
                    .setColor("GREEN")
                break;
                case("warn"): 
                    embed
                    .setDescription(`❗️ | ${msg}`)
                    .setColor("ORANGE")
                break;
                case("info"): 
                    embed
                    .setDescription(`📣 | ${msg}`)
                    .setColor("WHITE")
                break;
                case("wait"): 
                    embed
                    .setDescription(`💤 | ${msg}`)
                    .setColor("YELLOW")
                break;
                default: 
                    return reject(new Error("invalid truetype"))
                break;
            }
            if(type === "reply"){
                require("../../../Methods/interaction").reply(this.bot_token, this, {embeds: [embed]}, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            } 
            if(type === "send"){
                require("../../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            }
        })
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} [type=reply]
     * @returns 
     */
    error(msg, type){
        return new Promise(async (resolve, reject) => {
            this.#SendSpe(msg, "error", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} [type=reply]
     * @returns 
     */
    success(msg, type){
        return new Promise(async (resolve, reject) => {
            this.#SendSpe(msg, "success", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} [type=reply]
     * @returns 
     */
    warn_se(msg, type){
        return new Promise(async (resolve, reject) => {
            this.#SendSpe(msg, "warn", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} [type=reply]
     * @returns 
     */
    info(msg, type){
        return new Promise(async (resolve, reject) => {
            this.#SendSpe(msg, "info", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} msg 
     * @param {string} [type=reply]
     * @returns 
     */
    wait(msg, type){
        return new Promise(async (resolve, reject) => {
            this.#SendSpe(msg, "wait", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

}

module.exports = base