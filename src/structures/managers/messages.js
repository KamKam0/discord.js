const Base = require("../bases/basemultiple")
class Messages extends Base{
    constructor(_bot, guildid){
        super(_bot, guildid, "message")
        this._ignoreParameters = [
            'receivingType',
            'commandName',
            'isCommand',
            'options',
            'referenced_message',
        ]
        this._compareFunction = (oldProperty, newProperty, property) => {
            let modifications = []
            if (property.startsWith('mention')) {
                let oldMentions = oldProperty.filter(oldMention => {
                    return !newProperty.find(newMention => newMention.id === oldMention.id)
                })

                if (oldMentions.length) {
                    oldMentions.forEach(mention => {
                        modifications.push({
                            old: mention,
                            new: null
                        })
                    })
                }

                let newMentions = newProperty.filter(newMention => {
                    return !oldProperty.find(oldMention => oldMention.id === newMention.id)
                })

                if (newMentions.length) {
                    newMentions.forEach(mention => {
                        modifications.push({
                            old: null,
                            new: mention
                        })
                    })
                }
            }
            if (property === 'components') {
                let oldComponents = oldProperty.components.filter(oldComponent => {
                    return !newProperty.components.find(newComponent => newComponent.custom_id === oldComponent.custom_id)
                })

                oldComponents.forEach(component => {
                    modifications.push({
                        old: component,
                        new: null
                    })
                })

                let newComponents = newProperty.components.filter(newComponent => {
                    return !oldProperty.components.find(oldComponent => oldComponent.custom_id === newComponent.custom_id)
                })

                newComponents.forEach(component => {
                    modifications.push({
                        old: null,
                        new: component
                    })
                })
            }
            return modifications
        }
    }
}

module.exports = Messages