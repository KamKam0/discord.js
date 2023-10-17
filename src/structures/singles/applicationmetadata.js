const Base = require("../bases/base")
const utils = require("../../utils/functions")

class ApplicationMetadata extends Base{
    constructor(applicationMetadata, bot){
        super(bot, applicationMetadata)
        this._modifyConstants.push({name: "type", function: utils.gets.getApplicationMetadataType})
        
        this.type = this._modifyConstants.find(e => e.name === "type").function(applicationMetadata.type || 0)
        this.key = applicationMetadata.key
        this.name = applicationMetadata.name
        this.name_localizations = applicationMetadata.name_localizations
        this.description = applicationMetadata.description
        this.description_localizations = applicationMetadata.description_localizations
    }
}

module.exports = ApplicationMetadata