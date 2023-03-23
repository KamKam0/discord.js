const utils = require("../../utils/functions")
const errors = require("../../utils/errors.json")

module.exports = (args) => {
    
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
            if(args[num].value_data === "id" && !utils.checks.checkId(args[num].value)) return ({state: false, code: errors["86"].code, message: errors["86"].message, variable: args[num].data_name})
            if(args[num].value_data === "overwrite" && !utils.checks.checkOverwrites(args[num].value)) return ({state: false, code: errors["60"].code, message: errors["60"].message, variable: args[num].data_name})
            if(args[num].data_name === "options" && args[num].checks && !optionsVerify(args[num])) return ({state: false, code: errors["87"].code, message: errors["87"].message, variable: args[num].data_name}) 
        }
        if(!args[num].order && !["options", "infosURL"].includes(args[num].data_name)) args[num].order = Number(num)+1
        else if(!["options", "infosURL"].includes(args[num].data_name) && Number(args[num].order) !== Number(num)+1) args[num].order = Number(num)+1
    }

    return {state: true}
}

function optionsVerify(options){
    if(typeof options !== "object" || !options.value || typeof options.value !== "object" || !options.check || !Array.isArray(options.check)) return undefined
    let [values, checks] = [Object.entries(options.value), options.check]
    for (const value of values){
        let check = checks.find(e => e.name === value[0])
        if(check){
            if(!value[1] && (String(args[num].required) === "true" || String(args[num].required) === "undefined")) return {state: false, reason: check}
            if(value[1]){
                if(!check.type && check.value){
                    if(check.value !== value[1]) return {state: false, reason: check}
                }else{
                    if(!check.type) check.type = ["string"]
                    if(!check.type.includes("array")){
                        if(!check.type.includes(typeof value[1])) return {state: false, reason: check}
                    }else if(!check.type.includes(typeof value[1]) && !Array.isArray(value[1])) return {state: false, reason: check}
                }
                if(check.value_data === "id"){
                    if(typeof value[1] === "string" && !utils.check_id(value[1])) return {state: false, reason: check}
                    if(!Array.isArray(value[1]) && value[1].map(e => utils.check_id(e)).includes(false)) return {state: false, reason: check}
                }
                if(check.value_data === "overwrite"){
                    if(typeof value[1] === "string" && !utils.check_overwrites(value[1])) return {state: false, reason: check}
                    if(!Array.isArray(value[1]) && value[1].map(e => utils.check_overwrites(e)).includes(false)) return {state: false, reason: check}
                }
            }
            checks.splice(checks.indexOf(check), 1)
        }
    }
    if(checks[0] && checks.find(e => String(e.required) === "true" || String(e.required) === "undefined")) return {state: false, reason: check}
    return true
}