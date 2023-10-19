const Base = require("../bases/basemultiple")
class AutoMods extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id, "automod")
        this._compareFunction = (oldValue, newValue, property) => {
            if (property.startsWith('exempt')) {
                let oldExempts = oldValue.filter(oldExempts => {
                    return !newValue.find(newExempts => newExempts.id === oldExempts.id)
                })

                if (oldExempts.length) {
                    oldExempts.forEach(mention => {
                        modifications.push({
                            old: mention,
                            new: null
                        })
                    })
                }

                let newExempts = newValue.filter(newExempts => {
                    return !oldValue.find(oldExempts => oldExempts.id === newExempts.id)
                })

                if (newExempts.length) {
                    newExempts.forEach(mention => {
                        modifications.push({
                            old: null,
                            new: mention
                        })
                    })
                }
            }
        }
    }
}

module.exports = AutoMods