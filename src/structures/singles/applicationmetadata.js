const Base = require("../bases/base")
const utils = require("../../utils/functions")

class ApplicationMetadata extends Base{
    constructor(applicationMetadata, bot){
        super(applicationMetadata, bot)
        this.type = utils.gets.getApplicationMetadataType(applicationMetadata.type || 0)
        this.key = applicationMetadata.key
        this.name = applicationMetadata.name
        this.name_localizations = applicationMetadata.name_localizations
        this.description = applicationMetadata.description
        this.description_localizations = applicationMetadata.description_localizations
    }
}

module.exports = ApplicationMetadata