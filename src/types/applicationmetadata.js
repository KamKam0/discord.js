let types = {
    IntegerLessThanOrEqual: 1,
    IntegerGreaterThanOrEqual: 2,
    IntegerEqual: 3,
    IntegerNotEqual: 4,
    DatetimeLessThanOrEqual: 5,
    DatetimeGreaterThanOrEqual: 6,
    BooleanEqual: 7,
    BooleanNotEqual: 8,
}

module.exports.types = types

module.exports.revert = () => {
    return require("../utils/functions").general.revertTypes(types)
}