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
const Base = require("../bases/base")

class Guild extends Base{
    constructor(guild, bot){
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
        this.roles = (new Roles(bot, this.id))._addMultiple(guild.roles.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.emojis = (new Emojis(bot, this.id))._addMultiple(guild.emojis.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.stickers = (new Stickers(bot, this.id))._addMultiple(guild.stickers.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.presences = (new Presences(bot, this.id))._addMultiple(guild.presences.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.channels = (new Channels(bot, this.id))._addMultiple(guild.channels.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.stage_instances = (new StageInstances(bot, this.id))._addMultiple(guild.stage_instances.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.guild_scheduled_events = (new Events(bot, this.id))._addMultiple(guild.guild_scheduled_events.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.members = (new Members(bot, this.id))._addMultiple(guild.members.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.owner = this.members.get(this.owner_id)
        this.threads = (new Threads(bot, this.id))._addMultiple(guild.threads.map(el => { return {...el, guild: this, guild_id: this.id}}))
        this.voice_states = (new Voices(bot, this.id))._addMultiple(guild.voice_states.map(el => { return {...el, guild: this, guild_id: this.id}}))
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
        return this._typechange({
            0: "NONE",
            1: "LOW",
            2: "MEDIUM",
            3: "HIGH",
            4: "VERY_HIGH"
        }, type)
    }

    #typemesdef(type){
        return this._typechange({
            0: "ALL_MESSAGES",
            1: "ONLY_MENTIONS"
        }, type)
    }

    #typeexpll(type){
        return this._typechange({
            0: "DISABLED",
            1: "MEMBERS_WITHOUT_ROLES",
            2: "ALL_MEMBERS"
        }, type)
    }

    #typemfa(type){
        return this._typechange({
            0: "NONE",
            1: "ELEVATED"
        }, type)
    }

    #typeprem(type){
        return this._typechange({
            0: "NONE",
            1: "TIER_1",
            2: "TIER_2",
            3: "TIER_3"
        }, type)
    }

    #typensfw(type){
        return this._typechange({
            0: "DEFAULT",
            1: "EXPLICIT",
            2: "SAFE",
            3: "AGE_RESTRICTED"
        }, type)
    }

    _Modify_Datas(guild){
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
        this._Modify_Get_Datas()
        return this
    }

    /**
     * 
     * @returns 
     */
    async fetchBans(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/ban").fetch(informations)
    }

    /**
     * 
     * @param {string} ID 
     * @returns 
     */
    async fetchBan(ID){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: ID
        }
        return require("../../methods/ban").fetchspe(informations)
    }

    /**
     * 
     * @returns 
     */
    async fetchAuditLogs(infos){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/AuditLogs")(informations, infos)
    }

    /**
     * 
     * @returns 
     */
    async leave(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/me").leave(informations)
    }

    /**
     * 
     * @returns 
     */
    async createTemplate(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/template").create(informations)
    }

    /**
     * 
     * @param {string} templatecode 
     * @returns 
     */
    async getTemplate(templatecode){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            template_code: templatecode
        }
        return require("../../methods/template").get(informations)
    }

    /**
     * 
     * @returns 
     */
    async getTemplates(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        returnrequire("../../methods/template").getall(informations)
    }

    /**
     * 
     * @param {string} channelid 
     * @param {object} options 
     * @returns 
     */
    async createWebhook(channelid, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            channel_id: channelid
        }
        return require("../../methods/webhooks").create(informations, options)
    }

    /**
     * 
     * @param {string} channelid 
     * @returns 
     */
    async getWebhook(channelid){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            channel_id: channelid
        }
        return require("../../methods/webhooks").get(informations)
    }

    /**
     * 
     * @returns 
     */
    async getInvites(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getinvites(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modify(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").modify(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async delete(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").delete(informations)
    }

    /**
     * 
     * @param {string} userid 
     * @param {object} options 
     * @returns 
     */
    async addMember(userid, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: userid
        }
        return require("../../methods/guild").addmember(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modifyBot(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: this._bot.user.id
        }
        return require("../../methods/guild").modifycurrentmember(informations, options)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async prune(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").prune(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async getIntegrations(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getintegrations(informations)
    }

    /**
     * 
     * @returns 
     */
    async getWidgetSettings(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getwidgetsttings(informations)
    }

    /**
     * 
     * @returns 
     */
    async getWidgetPNG(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getwidgetpng(informations)
    }

    /**
     * 
     * @returns 
     */
    async getWidget(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getwidget(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modifyWidget(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").modifywidget(informations, options)
    }

    /**
     * 
     * @returns 
     */
    async getVanity(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getvanity(informations)
    }

    /**
     * 
     * @returns 
     */
    async getWelcomeScreen(){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").getwelcomescreen(informations)
    }

    /**
     * 
     * @param {object} options 
     * @returns 
     */
    async modifyWelcomesSreen(options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id
        }
        return require("../../methods/guild").modifywelcomescreen(informations, options)
    }

    /**
     * 
     * @param {string} userid 
     * @param {object} options 
     * @returns 
     */
    async modifyUserVoice(userid, options){
        let informations = {
            botToken: this._token,
            bot: this._bot,
            id: this.id,
            user_id: userid
        }
        return require("../../methods/guild").modifyuservoice(informations, options)
    }

    get iconURL(){
        return require("../../methods/general").iconURL(this.id, this.icon, "guild")
    }

    get bannerURL(){
        return require("../../methods/general").iconURL(this.id, this.icon, "gbanner")
    }

    get splashURL(){
        return require("../../methods/general").iconURL(this.id, this.icon, "splash")
    }

    get createdAt(){
        return require("../../methods/general").createdAt(this.id, "guild")
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayIconURL(extension){
        return require("../../methods/general").iconURL(this.id, this.icon, "guild", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displayBannerURL(extension){
        return require("../../methods/general").iconURL(this.id, this.icon, "gbanner", extension)
    }

    /**
     * 
     * @param {string} extension 
     * @returns 
     */
    displaySplashURL(extension){
        return require("../../methods/general").iconURL(this.id, this.icon, "splash", extension)
    }

    get memberCount(){
        return this.members.length
    }
}
module.exports = Guild