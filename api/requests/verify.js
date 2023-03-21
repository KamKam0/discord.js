/**
    * 
    * @param {(string|object|object[])} args 
    * @param {string} method 
    * @param {string} url 
    * @param {function} fonction 
    * @param {string} name 
    * @param {string} baseinfo 
    * @returns 
*/
module.exports = async (args) => {
    const errors = require("../DB/errors.json")
    const utils = require("./functions")
    const optionsVerify = require("./checkoptions")
    
    for (const num in args){
        if(!args[num].value && (String(args[num].required) === "true" || String(args[num].required) === "undefined")) return ({state: false, code: errors["84"].code, message: errors["84"].message, variable: args[num].data_name})
        if(args[num].value && (!args[num].check || (args[num].check && typeof args[num].check === "boolean"))){
            if(!args[num].type){
                switch(args[num].data_name){
                    case("bot"):
                        args[num].type = ["function", "object"]
                    break
                    case("options"):
                        args[num].type = "object"
                    break
                    case("infosURL"):
                        args[num].type = "object"
                    break
                    default:
                        args[num].type = "string"
                    break
                }
            }
            if(Array.isArray(args[num].type)){
                if(!args[num].type.includes("array")){
                    if(!args[num].type.includes(typeof args[num].value)) return ({state: false, code: errors["85"].code, message: errors["85"].message+args[num].type, variable: args[num].data_name})
                }else if(!args[num].type.includes(typeof args[num].value) && !Array.isArray(args[num].value)) return ({state: false, code: errors["85"].code, message: errors["85"].message+args[num].type, variable: args[num].data_name})
            }else{
                if(args[num].type !== "array"){
                    if(typeof args[num].value !== args[num].type) return ({state: false, code: errors["85"].code, message: errors["85"].message+args[num].type, variable: args[num].data_name})
                }else if(!Array.isArray(args[num].value)) return ({state: false, code: errors["85"].code, message: errors["85"].message+args[num].type, variable: args[num].data_name})
            }
            if(args[num].value_data === "id" && !utils.check_id(args[num].value)) return ({state: false, code: errors["86"].code, message: errors["86"].message, variable: args[num].data_name})
            if(args[num].value_data === "overwrite" && !utils.check_overwrites(args[num].value)) return ({state: false, code: errors["60"].code, message: errors["60"].message, variable: args[num].data_name})
            if(args[num].data_name === "options" && args[num].checks && !optionsVerify(args[num])) return ({state: false, code: errors["87"].code, message: errors["87"].message, variable: args[num].data_name}) 
        }
        if(!args[num].order && !["options", "infosURL"].includes(args[num].data_name)) args[num].order = Number(num)+1
        else if(!["options", "infosURL"].includes(args[num].data_name) && Number(args[num].order) !== Number(num)+1) args[num].order = Number(num)+1
    }

    return {state: true}
}