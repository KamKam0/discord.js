let types = {
    LatestActivity:	0,
    CreationDate:	1
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}