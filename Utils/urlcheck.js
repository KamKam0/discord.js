/**
 * @param {string} baseURL
 * @param {string} urlc
 * @param {object} options 
 * @returns 
 */
module.exports = (baseURL, urlc, options) => {
    let trurl = `${baseURL}/${urlc}`
    if(typeof options !== "object" || !options.value || typeof options.value !== "object" || !options.check || !Array.isArray(options.check)) return trurl
    let [values, checks] = [Object.entries(options.value), options.check]
    values = values.filter(e => {
        let check = checks.find(v => v.name === e[0])
        if(!check) return false
        if(typeof e[1] !== check.type) return false
        if(check.data_type === "id" && !require("./functions").check_id(e[1])) return false
        if(check.type === "number" && check.limit && typeof check.limit === "number" && check.limit < e[1]) return false
        if(String(check.filter) === "false") return false
        return true
    })
    values = values.map(e => `${e[0]}=${e[1]}`).join("&")
    if(values && values.length > 1) trurl += "?"+values
    return trurl
}