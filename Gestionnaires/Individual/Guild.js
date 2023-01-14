const Channels = require('../../Managers/Channels Guild')
const Roles = require("../../Managers/Roles")
const Members = require("../../Managers/Members")
const Emojis = require("../../Managers/Emojis")
const Stickers = require("../../Managers/Stickers")
const StageInstances = require("../../Managers/StageInstances")
const Voices = require("../../Managers/Voices")
const Threads = require("../../Managers/Threads")
const Events = require("../../Managers/Events")
const Presences = require("../../Managers/Presences")
const Messages = require("../../Managers/Messages")
const voiceManager = require("../../Classes/guildVoiceManager")
const Base = require("./base")
class Guild extends Base{
    constructor(bot, guild){
        super(bot)
        this.name = guild.name
        this.id = guild.id
        this.icon = guild.icon || null
        this.splash = guild.splash || null
        this.discovery_splash = guild.discovery_splash || null
        this.owner_id = guild.owner_id
        this.region = guild.region
        this.afk_channel_id = guild.afk_channel_id || null
        this.afk_timeout = guild.afk_timeout || null
        this.widget_enabled = guild.widget_enabled ?? false
        this.widget_channel_id = guild.widget_channel_id || null
        this.verification_level = this.#typeverif(guild.verification_level)
        this.default_message_notifications = this.#typemesdef(guild.default_message_notifications)
        this.explicit_content_filter = this.#typeexpll(guild.explicit_content_filter)
        this.features = guild.features || []
        this.mfa_level = this.#typemfa(guild.mfa_level)
        this.application_id = guild.application_id
        this.system_channel_id = guild.system_channel_id || null
        this.system_channel_flags = guild.system_channel_flags || 0
        this.rules_channel_id = guild.rules_channel_id || null
        this.joined_at = guild.joined_at
        this.unavailable = guild.unavailable ?? false
        this.vanity_url_code = guild.vanity_url_code|| null
        this.safety_alerts_channel_id = guild.safety_alerts_channel_id || null
        this.description = guild.description || null
        this.banner = guild.banner || null
        this.lazy = guild.lazy ?? false
        this.large = guild.large ?? false
        this.hub_type = guild.hub_type || null
        this.premium_tier = this.#typeprem(guild.premium_tier)
        this.premium_subscription_count = guild.premium_subscription_count || 0
        this.preferred_locale = guild.preferred_locale
        this.public_updates_channel_id = guild.public_updates_channel_id || null
        this.welcome_screen = guild.welcome_screen || null
        this.nsfw_level = this.#typensfw(guild.nsfw_level)
        this.max_members = guild.max_members || null
        this.nsfw = guild.nsfw ?? false
        this.roles = (new Roles(bot, this.id)).__AddRoles(guild.roles.map(el => { return {...el, guild: this}}))
        this.emojis = (new Emojis(bot, this.id)).__AddEmojis(guild.emojis.map(el => { return {...el, guild: this}}))
        this.stickers = (new Stickers(bot, this.id)).__AddStickers(guild.stickers.map(el => { return {...el, guild: this}}))
        this.presences = (new Presences(bot, this.id)).__AddPresences(guild.presences.map(el => { return {...el, guild: this}}))
        this.channels = (new Channels(bot, this.id)).__AddChannels(guild.channels.map(el => { return {...el, guild: this}}))
        this.stage_instances = (new StageInstances(bot, this.id)).__AddStages(guild.stage_instances.map(el => { return {...el, guild: this}}))
        this.guild_scheduled_events = (new Events(bot, this.id)).__AddEvents(guild.guild_scheduled_events.map(el => { return {...el, guild: this}}))
        this.members = (new Members(bot, this.id)).__AddMembers(guild.members.map(el => { return {...el, guild: this}}))
        this.owner = this.members.get(this.owner_id)
        this.threads = (new Threads(bot, this.id)).__AddThreads(guild.threads.map(el => { return {...el, guild: this}}))
        this.voice_states = (new Voices(bot, this.id)).__AddVoices(guild.voice_states.map(el => { return {...el, guild: this}}))
        this.voice_states.container.forEach(voi => {
            this.channels.get(voi.channel_id).members.container.push(voi.member)
            this.members.get(voi.user_id).voice.presence = voi
            this.members.get(voi.user_id).voice.channel = this.channels.get(voi.channel_id)
        })
        this.afk_channel = this.channels.get(this.afk_channel_id) || null
        this.system_channel = this.channels.get(this.system_channel_id) || null
        this.widget_channel = this.channels.get(this.widget_channel_id) || null
        this.rules_channel = this.channels.get(this.rules_channel_id) || null
        this.safety_alerts_channel = this.channels.get(this.safety_alerts_channel_id) || null
        this.public_updates_channel = this.channels.get(this.public_updates_channel_id) || null
        this.premium_progress_bar_enabled = guild.premium_progress_bar_enabled ?? false
        this.messages = new Messages(bot, this.id)
        this.me = this.members.get(bot.user.id)
        this.db_language = guild.db_language
        this.voice = new voiceManager(this._bot, this.id)
    }

    #typeverif(type){
        return this.__typechange({
            0: "NONE",
            1: "LOW",
            2: "MEDIUM",
            3: "HIGH",
            4: "VERY_HIGH"
        }, type)
    }

    #typemesdef(type){
        return this.__typechange({
            0: "ALL_MESSAGES",
            1: "ONLY_MENTIONS"
        }, type)
    }

    #typeexpll(type){
        return this.__typechange({
            0: "DISABLED",
            1: "MEMBERS_WITHOUT_ROLES",
            2: "ALL_MEMBERS"
        }, type)
    }

    #typemfa(type){
        return this.__typechange({
            0: "NONE",
            1: "ELEVATED"
        }, type)
    }

    #typeprem(type){
        return this.__typechange({
            0: "NONE",
            1: "TIER_1",
            2: "TIER_2",
            3: "TIER_3"
        }, type)
    }

    #typensfw(type){
        return this.__typechange({
            0: "DEFAULT",
            1: "EXPLICIT",
            2: "SAFE",
            3: "AGE_RESTRICTED"
        }, type)
    }

    __Modify_Datas(guild){
        let treatable = ["permissions", "roles", "emojis", "voice_states", "members", "channels", "threads", "presences", "stage_instances", "stickers", "guild_scheduled_events"]
        let tocheck = Object.entries(guild)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "verification_level"){
                    if(this[e[0]] !== this.#typeverif(e[1])) this[e[0]] = this.#typeverif(e[1])
                }
                else if(e[0] === "default_message_notifications"){
                    if(this[e[0]] !== this.#typemesdef(e[1])) this[e[0]] = this.#typemesdef(e[1])
                }
                else if(e[0] === "explicit_content_filter"){
                    if(this[e[0]] !== this.#typeexpll(e[1])) this[e[0]] = this.#typeexpll(e[1])
                }
                else if(e[0] === "mfa_level"){
                    if(this[e[0]] !== this.#typemfa(e[1])) this[e[0]] = this.#typemfa(e[1])
                }
                else if(e[0] === "premium_tier"){
                    if(this[e[0]] !== this.#typeprem(e[1])) this[e[0]] = this.#typeprem(e[1])
                }
                else if(e[0] === "nsfw_level"){
                    if(this[e[0]] !== this.#typensfw(e[1])) this[e[0]] = this.#typensfw(e[1])
                }
                else if(this[e[0]] !== e[1] && !treatable.includes(e[0])) this[e[0]] = e[1] 
            } 
        })
        this.__Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @returns 
     */
    fetchbans(){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").fetch(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    fetchban(ID){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").fetchspe(this.bot_token, this.id, ID, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    fetchauditlogs(infos){
        return new Promise((resolve, reject) => {
            require("../../Methods/AuditLogs")(this.bot_token, this.id, infos, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    leave(){
        return new Promise((resolve, reject) => {
            require("../../Methods/me").leave(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    createtemplate(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").create(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} templatecode 
     * @returns 
     */
    gettemplate(templatecode){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").get(this.bot_token, this.id, templatecode, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    gettemplates(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").getall(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} channelid 
     * @param {object} options 
     * @returns 
     */
    createwebhook(channelid, options){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").create(this.bot_token, channelid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} channelid 
     * @returns 
     */
    getwebhook(channelid){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").get(this.bot_token, channelid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    getinvites(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").getinvites(this.bot_token, this.id, this._bot)
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
            require("../../Methods/guild").modify(this.bot_token, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @returns 
     */
    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").delete(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {string} userid 
     * @param {object} options 
     * @returns 
     */
    addmember(userid, options){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").addmember(this.bot_token, this.id, userid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modifybot(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifycurrentmember(this.bot_token, this.id, this._bot.user.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    prune(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").prune(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getintegrations(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getintegrations(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getwidgetsettings(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidgetsttings(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getwidgetPNG(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidgetpng(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getwidget(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidget(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modifywidget(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifywidget(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getvanity(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getvanity(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @returns 
     */
    getwelcomescreen(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwelcomescreen(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    modifywelcomescreen(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifywelcomescreen(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    /**
     * 
     * @param {string} userid 
     * @param {object} options 
     * @returns 
     */
    modifyuservoice(userid, options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifyuservoice(this.bot_token, this.id, userid, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    get iconURL(){
        return require("../../Methods/general").iconURL(this.id, this.icon, "guild")
    }

    get bannerURL(){
        return require("../../Methods/general").iconURL(this.id, this.icon, "gbanner")
    }

    get splashURL(){
        return require("../../Methods/general").iconURL(this.id, this.icon, "splash")
    }

    get createdAt(){
        return require("../../Methods/general").createdAt(this.id, "guild")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayIconURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "guild", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayBannerURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "gbanner", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displaySplashURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "splash", extension)
    }

    get membercount(){
        return this.members.length
    }
}
module.exports = Guild