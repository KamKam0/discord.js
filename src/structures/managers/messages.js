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
            if (property.startsWith('mention')) {

            }
            // mention_roles
            // mention_channels
            // mention_members
            // 
            // components
            return []
        }
    }
}

module.exports = Messages