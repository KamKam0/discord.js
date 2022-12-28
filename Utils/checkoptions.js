module.exports = async (options) => {
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