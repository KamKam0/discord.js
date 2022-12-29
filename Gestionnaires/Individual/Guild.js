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
const queueManager = require("../../Classes/queueManager")
class Guild{
    constructor(bot, guild){
        this.name = guild.name
        this.id = guild.id
        this.vguild_id = guild.vguild_id
        this.icon = guild.icon ? guild.icon : null
        this.splash = guild.splash ? guild.splash : null
        this.discovery_splash = guild.discovery_splash ? guild.discovery_splash : null
        this.owner_id = guild.owner_id
        this.region = guild.region
        this.afk_channel_id = guild.afk_channel_id ? guild.afk_channel_id : null
        this.afk_timeout = guild.afk_timeout ? guild.afk_timeout : null
        this.widget_enabled = guild.widget_enabled ? guild.widget_enabled : false
        this.widget_channel_id = guild.widget_channel_id ? guild.widget_channel_id : null
        this.verification_level = this.typeverif(guild.verification_level)
        this.default_message_notifications = this.typemesdef(guild.default_message_notifications)
        this.explicit_content_filter = this.typeexpll(guild.explicit_content_filter)
        this.roles = (new Roles(bot, this.id)).AddRoles(guild.roles)
        this.emojis = (new Emojis(bot, this.id)).AddEmojis(guild.emojis)
        this.features = guild.features ? guild.features : []
        this.mfa_level = this.typemfa(guild.mfa_level)
        this.application_id = guild.application_id
        this.system_channel_id = guild.system_channel_id ? guild.system_channel_id : null
        this.system_channel_flags = guild.system_channel_flags ? guild.system_channel_flags : 0
        this.rules_channel_id = guild.rules_channel_id ? guild.rules_channel_id : null
        this.joined_at = guild.joined_at
        this.unavailable = guild.unavailable ? guild.unavailable : false
        this.voice_states = (new Voices(bot, this.id)).AddVoices(guild.voice_states)
        this.members = (new Members(bot, this.id)).AddMembers(guild.members)
        this.channels = (new Channels(bot, this.id)).AddChannels(guild.channels)
        this.threads = (new Threads(bot, this.id)).AddThreads(guild.threads)
        this.presences = (new Presences(bot, this.id)).AddPresences(guild.presences)
        this.vanity_url_code = guild.vanity_url_code ? guild.vanity_url_code : null
        this.description = guild.description ? guild.description : null
        this.banner = guild.banner ? guild.banner : null
        this.premium_tier = this.typeprem(guild.premium_tier)
        this.premium_subscription_count = guild.premium_subscription_count ? guild.premium_subscription_count : 0
        this.preferred_locale = guild.preferred_locale
        this.public_updates_channel_id = guild.public_updates_channel_id ? guild.public_updates_channel_id : null
        this.welcome_screen = guild.welcome_screen ? guild.welcome_screen : null
        this.nsfw_level = this.typensfw(guild.nsfw_level)
        this.stage_instances = (new StageInstances(bot, this.id)).AddStages(guild.stage_instances)
        this.stickers = (new Stickers(bot, this.id)).AddStickers(guild.stickers)
        this.guild_scheduled_events = (new Events(bot, this.id)).AddEvents(guild.guild_scheduled_events)
        this.premium_progress_bar_enabled = guild.premium_progress_bar_enabled ? guild.premium_progress_bar_enabled : false
        this.messages = new Messages(bot, this.id)
        this.db_language = guild.db_language
        this._bot = bot
        this.bot_token = bot.discordjs.token
        this.voice = {state: "off", paused_since: null, playing: "true", connection: null, resource: null, managing: false}
        this.voiceQueue = new queueManager()
    }

    get playing(){
        return Boolean(this.voice.playing)
    }

    pause(){
        if(this.voice.connection && this.voice.playing === "true"){
            this.voice.playing = "false";
            this.voice.connection.pause()
            this.voice.paused_since = Date.now()
        }
    }

    resume(){
        if(this.voice.connection && this.voice.playing === "true"){
            this.voice.playing = "true";
            this.voice.connection.unpause()
            this.voice.paused_since = null
        }
    }

    play(stream, volume){
        const {StreamType, createAudioResource, createAudioPlayer, getVoiceConnection} = require("@discordjs/voice")
        if(this.voice.state === "on"){
            if(volume){
                if(!isNaN(volume)){
                    if(typeof volume !== "number") volume = Number(volume)
                    if(volume <0) volume = 100
                    if(volume <=1) volume = volume / 100
                }
                else volume = 1
            }
            else volume = 1
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true});
            resource.volume.setVolume()
            const player = createAudioPlayer();
    
            player.play(resource);
            getVoiceConnection(this.id).subscribe(player)
    
            this.voice.connection = player
            this.voice.resource = resource
        }
    }

    manageVoice(fonction){
        if(this.voice.managing) return
        let trueargs = Array(...arguments)
        trueargs.splice(0, 1)
        this.voice.connection.on("stateChange", async (oldstate, newstate) => {
            this.voice.managing = false
            if(oldstate.status === "playing" && newstate.status === "idle"){
                if(this.voiceQueue.loopState) fonction(this.voiceQueue.np, ...trueargs)
                else if(this.voiceQueue.queueloopState){
                    this.voiceQueue.addSong(this.voiceQueue.np)
                    this.voiceQueue.removeSong()
                    fonction(this.voiceQueue.next, ...trueargs)
                }
                else fonction(this.voiceQueue.next, ...trueargs)
            }
        })
        this.voice.connection.on("stateChange", async (oldstate, newstate) => { 
            this.voice.managing = false
            if(newstate.status === "disconnected") return this.ResetVoice() 
        })
        this.voice.connection.on("error", err =>{
            this.voice.managing = false
            console.log(err)
        }) 
    }

    setvolume(volume){
        if(this.voice.connection){
            if(volume){
                if(!isNaN(volume)){
                    if(typeof volume !== "number") volume = Number(volume)
                    if(volume <0) volume = 100
                    if(volume <=1) volume = volume / 100
                }
                else volume = 1
            }
            else volume = 1
            this.voice.resource.volume.setVolume(Number(volume)/100)
        } 
    }

    typeverif(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "NONE",
                1: "LOW",
                2: "MEDIUM",
                3: "HIGH",
                4: "VERY_HIGH"
            }
            return convert[type]
        }
    }

    typemesdef(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "ALL_MESSAGES",
                1: "ONLY_MENTIONS"
            }
            return convert[type]
        }
    }

    typeexpll(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "DISABLED",
                1: "MEMBERS_WITHOUT_ROLES",
                2: "ALL_MEMBERS"
            }
            return convert[type]
        }
    }

    typemfa(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "NONE",
                1: "ELEVATED"
            }
            return convert[type]
        }
    }

    typeprem(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "NONE",
                1: "TIER_1",
                2: "TIER_2",
                3: "TIER_3"
            }
            return convert[type]
        }
    }

    typensfw(type){
        if(isNaN(type)) return type
        else{
            const convert = {
                0: "DEFAULT",
                1: "EXPLICIT",
                2: "SAFE",
                3: "AGE_RESTRICTED"
            }
            return convert[type]
        }
    }

    Modify_Datas(guild){
        let treatable = ["permissions", "roles", "emojis", "voice_states", "members", "channels", "threads", "presences", "stage_instances", "stickers", "guild_scheduled_events"]
        let tocheck = Object.entries(guild)
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "verification_level"){
                    if(this[e[0]] !== this.typeverif(e[1])) this[e[0]] = this.typeverif(e[1])
                }
                else if(e[0] === "default_message_notifications"){
                    if(this[e[0]] !== this.typemesdef(e[1])) this[e[0]] = this.typemesdef(e[1])
                }
                else if(e[0] === "explicit_content_filter"){
                    if(this[e[0]] !== this.typeexpll(e[1])) this[e[0]] = this.typeexpll(e[1])
                }
                else if(e[0] === "mfa_level"){
                    if(this[e[0]] !== this.typemfa(e[1])) this[e[0]] = this.typemfa(e[1])
                }
                else if(e[0] === "premium_tier"){
                    if(this[e[0]] !== this.typeprem(e[1])) this[e[0]] = this.typeprem(e[1])
                }
                else if(e[0] === "nsfw_level"){
                    if(this[e[0]] !== this.typensfw(e[1])) this[e[0]] = this.typensfw(e[1])
                }
                else if(this[e[0]] !== e[1] && !treatable.includes(e[0])) this[e[0]] = e[1] 
            } 
        })
        return this
    }
    /*
        tocheck.forEach(e => { 
            if(String(this[e[0]]) !== "undefined"){
                if(e[0] === "entity_type"){
                    if(this[e[0]] !== this.type(e[1])) this[e[0]] = this.type(e[1])
                }
                else if(e[0] === "status"){
                    if(this[e[0]] !== this.status(e[1])) this[e[0]] = this.status(e[1])
                }
                else if(e[0] === "privacy_level"){
                    if(this[e[0]] !== this.privacy(e[1])) this[e[0]] = this.privacy(e[1])
                }
                else if(this[e[0]] !== e[1]) this[e[0]] = e[1]
            }
        })*/

    fetchbans(){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").fetch(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    fetchban(ID){
        return new Promise((resolve, reject) => {
            require("../../Methods/ban").fetchspe(this.bot_token, this.id, ID, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    fetchauditlogs(){
        return new Promise((resolve, reject) => {
            require("../../Methods/AuditLogs")(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    leave(){
        return new Promise((resolve, reject) => {
            require("../../Methods/me").leave(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    createtemplate(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").create(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    gettemplate(templatecode){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").get(this.bot_token, this.id, templatecode, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    gettemplates(){
        return new Promise((resolve, reject) => {
            require("../../Methods/template").getall(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    createwebhook(channelid, options){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").create(this.bot_token, channelid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    getwebhook(channelid){
        return new Promise((resolve, reject) => {
            require("../../Methods/webhooks").get(this.bot_token, channelid, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    getinvites(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").getinvites(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    modify(options){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").modify(this.bot_token, this.id, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    delete(){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").delete(this.bot_token, this.id, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    addmember(userid, options){
        return new Promise((resolve, reject) => {
            require("../../Methods/guild").addmember(this.bot_token, this.id, userid, options, this._bot)
            .then(datas => resolve(datas))
            .catch(err => reject(err))
        })
    }

    modifybot(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifycurrentmember(this.bot_token, this.id, this._bot.user.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    prune(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").prune(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getintegrations(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getintegrations(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getwidgetsettings(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidgetsttings(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getwidgetPNG(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidgetpng(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getwidget(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwidget(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    modifywidget(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifywidget(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getvanity(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getvanity(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    getwelcomescreen(){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").getwelcomescreen(this.bot_token, this.id, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

    modifywelcomescreen(options){
        return new Promise(async (resolve, reject) => {
            require("../../Methods/guild").modifywelcomescreen(this.bot_token, this.id, options, this._bot)
            .catch(err => reject(err))
            .then(datas => resolve(datas))
        })
    }

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

    displayIconURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "guild", extension)
    }

    displayBannerURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "gbanner", extension)
    }

    displaySplashURL(extension){
        return require("../../Methods/general").iconURL(this.id, this.icon, "splash", extension)
    }

    get voiceAdapterCreator() {
        return methods => {
          this._bot.voice.adapters.set(this.id, methods);
          return {
            sendPayload: data => {
              if (this._bot.state !== "ready") return false;
              this._bot.discordjs.ws.send(JSON.stringify(data));
              return true;
            },
            destroy: () => {
              this._bot.voice.adapters.delete(this.id);
            },
          };
        };
    }

    ResetVoice(){
        this.voice = {state: "off", paused_since: null, playing: "true", connection: null, resource: null}
    }

    VoiceCheck(){
        if(this.voice.state === "off") return false
        return true
    }

    get membercount(){
        return this.members.length
    }
}
module.exports = Guild