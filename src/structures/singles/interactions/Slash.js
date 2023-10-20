const Base = require("../../bases/interactions/base")
const Attachment = require('../../../handlers/attachment')

class Slash extends Base{
    constructor(slash, bot){
        super("slash", slash, bot)
        this.id = slash.id
        this.command_id = slash.data.id || null
        this.attachments = this.#analyseAttachments(slash.data.resolved)
        this.options = this.#analyseOptions(slash.data.options)
    }

    getOption(name){
        if(!this.options) return null
        return this.options.find(compo => compo.name === name) || null
    }

    #analyseAttachments(resolved) {
        if (!resolved || !resolved.attachments) {
            return []
        }

        if (!Object.keys(resolved.attachments).length) {
            return []
        }

        return Object.values(resolved.attachments).map(attachment => new Attachment(attachment))
    }

    #analyseOptions(options) {
        if (!options || !options.length) {
            return []
        }
        
        const definitiveOptions = this.attachments.length 
        ? options.map(option => {
                if (!option.value) {
                    return option
                }
                
                let linkedAttachment = this.attachments.find(attachment => attachment.id === option.value)
                if (linkedAttachment) {
                    option.value = linkedAttachment
                }

                return option
            })
        : options

        return definitiveOptions
    }
}

module.exports = Slash