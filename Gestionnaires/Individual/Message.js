const Mentions = require("../Multiple/Mentions")
const Base = require("./base")
class Message extends Base{
    constructor(message, bot){
        super(bot)
        this.user_id = (message.user || message.user_id) ? message.user_id : message.author.id
        this.user = this.user_id ? (bot.users.get(this.user_id) ?? null) : null
        this.guild_id = message.guild_id || null
        this.guild = message.guild || bot.guilds.get(this.guild_id) || null
        this.member = message.guild_id ? (this.guild.members.get(this.user_id) ?? null) : null
        this.id = message.id
        this.channel_id = message.channel_id
        this.channel = bot.channels.get(this.channel_id) || null
        this.content = message.content === "" ? null : message.content
        this.timestamp = message.timestamp
        this.edited_timestamp = message.edited_timestamp || null        
        this.tts = message.tts ? message.tts : false
        this.mention_everyone = message.mention_everyone ?? false
        this.mention_roles = (message.mention_roles && message.mention_roles[0]) ? (new Mentions(bot, this.guild_id, "role")).__AddMentions(message.mention_roles) :  new Mentions(bot, this.guild_id, "role")
        this.mention_channels = this.#treatMentionsChannels(this.content)
        this.mention_members = (message.mentions && message.mentions.filter(e => e.member)[0]) ? (new Mentions(bot, this.guild_id, "member")).__AddMentions(message.mentions.filter(e => e.member).map(e => e.id)) :  new Mentions(bot, this.guild_id, "member")
        this.attachments = message.attachments || []
        this.embeds = message.embeds || []
        this.reactions = message.reactions || []
        this.nonce = message.nonce || null
        this.pinned = message.pinned ?? false
        this.webhook_id = message.webhook_id|| null
        this.type = this.#type2(message.type)
        this.activity = message.activity || null
        this.message_reference = message.message_reference || null
        this.application_id = message.application_id
        this.flags = message.flags || 0
        this.referenced_message = message.referenced_message || null
        this.components = message.components || []
        this.sticker_items = message.sticker_items || []
        this.stickers = message.stickers || []
        this.typee = "message"
    }

    __Modify_Datas(message){
        let tocheck = Object.entries(message)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "type"){
                    if(this[e[0]] !== this.#type2(e[1])) this[e[0]] = this.#type2(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })
        this.__Modify_Get_Datas()
        return this
    }

    #treatMentionsChannels(content){
        let clas = new Mentions(this._bot, this.guild_id, "channel")
        if(!content) return clas
        if(content.includes("<#")){
            let splitted = content.split("<#").filter(e => e.includes(">")).map(e => e.split(">")[0]).filter(e => !isNaN(e))
            if(splitted && splitted[0]) clas.__AddMentions(splitted)
        }
        return clas
    }

    #type2(type){
        return this.__typechange({
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
        }, type)
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").delete(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").modify(this.bot_token, this.channel_id, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    addreaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").addreaction(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    removereaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removereaction(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} userid 
     * @param {string} emoji 
     * @returns 
     */
    removeuserreaction(userid, emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeuserreaction(this.bot_token, this.channel_id, this.id, userid, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} emoji 
     * @returns 
     */
    removeallreaction(emoji){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeallreactionemoji(this.bot_token, this.channel_id, this.id, emoji, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    removeallreactions(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").removeallreactions(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
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

    /**
     * 
     * @returns 
     */
    pin(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").pin(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    unpin(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").unpin(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    fetchreactions(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").fetch_reactions(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} reaction 
     * @returns 
     */
    fetchreaction(reaction){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").fetch_reaction(this.bot_token, this.channel_id, this.id, reaction, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    crosspost(){
        return new Promise((resolve, reject) => {
            require("../../Methods/message").crosspost(this.bot_token, this.channel_id, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    #SendSpe(msg, truetype, type){
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
module.exports = Message