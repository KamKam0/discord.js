const User = require("./User")
class Message{
    constructor(message, bot){
        this.user_id = message.user ? message.user_id : message.author.id
        this.user = this.user_id ? bot.users.get(this.user_id) : null
        this.guild_id = message.guild_id || null
        this.guild = message.guild || bot.guilds.get(this.guild_id) || null
        this.member = message.guild_id ? this.guild.members.get(this.user_id) : null
        this.id = message.id
        this.channel_id = message.channel_id
        this.channel = this.channel_id ? bot.channels.get(this.channel_id) : null
        this.content = message.content
        this.timestamp = message.timestamp
        this.edited_timestamp = message.edited_timestamp || null        
        this.tts = message.tts ? message.tts : false
        this.mention_everyone = message.mention_everyone || false
        this.mentions = message.mentions || []
        this.mention_roles = message.mention_roles || []
        this.mention_channels = message.mention_channels || []
        this.attachments = message.attachments || []
        this.embeds = message.embeds || []
        this.reactions = message.reactions || []
        this.nonce = message.nonce || null
        this.pinned = message.pinned || false
        this.webhook_id = message.webhook_id|| null
        this.type = this.#type2(message.type)
        this.activity = message.activity || null
        this.message_reference = message.message_reference || null
        this.application_id = message.application_id
        this.flags = message.flags || 0
        this.referenced_message = message.referenced_message || null
        /*this.interaction = message.interaction || null
        this.thread = message.thread || null*/
        this.components = message.components || []
        this.sticker_items = message.sticker_items || []
        this.stickers = message.stickers || []
        this.bot_token = bot.discordjs.token
        this.typee = "message"
        this.vguild_id = this.guild ? this.guild.vguild_id : null
        this._bot = bot
    }

    Modify_Datas(message){
        let tocheck = Object.entries(message)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type2(e[1])) this[e[0]] = this.#type2(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        return this
    }

    #type2(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "DEFAULT",
                1: "RECIPIENT_ADD",
                2: "RECIPIENT_REMOVE",
                3: "CALL",
                4: "CHANNEL_NAME_CHANGE",
                5: "CHANNEL_ICON_CHANGE",
                6: "CHANNEL_PINNED_MESSAGE",
                7: "GUILD_MEMBER_JOIN",
                8: "USER_PREMIUM_GUILD_SUBSCRIPTION",
                9: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
                10: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
                11: "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
                12: "CHANNEL_FOLLOW_ADD",
                14: "GUILD_DISCOVERY_DISQUALIFIED",
                15: "GUILD_DISCOVERY_REQUALIFIED",
                16: "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
                17: "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
                18: "THREAD_CREATED",
                19: "REPLY",
                20: "CHAT_INPUT_COMMAND",
                21: "THREAD_STARTER_MESSAGE",
                22: "GUILD_INVITE_REMINDER",
                23: "CONTEXT_MENU_COMMAND"
            }
            return convert[type]
        }
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").delete(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").modify(this.bot_token, this.channel_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    addreaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").addreaction(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    removereaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removereaction(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    removeuserreaction(userid, emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeuserreaction(this.bot_token, this.channel_id, this.id, userid, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    removeallreaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeallreactionemoji(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    removeallreactions(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeallreactions(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    reply(options){
        return new Promise((resolve, reject) => {
            options = require("../../Utils/functions").analyse_data(options)
            options.message_reference = {
                message_id: this.id,
                channel_id: this.channel_id,
                guild_id: this.guild_id
            }
            require("../../Methods/message").send(this.bot_token, this.channel_id, options, undefined, undefined, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    pin(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").pin(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    unpin(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").unpin(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    fetchreactions(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").fetch_reactions(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    fetchreaction(reaction){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").fetch_reaction(this.bot_token, this.channel_id, this.id, reaction, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    crosspost(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").crosspost(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    SendSpe(msg, truetype, type){
        return new Promise(async (resolve, reject) => {
            if(!type) type = "reply"
            let embed = new (require("../../Classes/Embed"))()
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
                require("../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed], replyto: this.id}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            } 
            if(type === "send"){
                require("../../Methods/message").send(this.bot_token, this.channel_id, {embeds: [embed]}, undefined, undefined, this._bot)
                .then(obj => { if(obj !== undefined) resolve(obj) })
                .catch(err => reject(err))
            }
        })
    }

    error(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "error", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    success(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "success", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    warn_se(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "warn", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    info(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "info", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    wait(msg, type){
        return new Promise(async (resolve, reject) => {
            this.SendSpe(msg, "wait", type)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }
}
module.exports = Message