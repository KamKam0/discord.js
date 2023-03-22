let types = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5
}

module.exports = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypess(types)
}