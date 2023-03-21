module.exports = (link, parameters) => {
    if(typeof link !== "string") return {state: false, error: "Link is not a string"}
    if(typeof parameters !== "object") return {state: false, error: "Parameters is not an object"}

    let modifiedLink = link.split("/")
    
    let correspondanceLink = modifiedLink
    .filter(part => part.startsWith(":"))
    .map(part => {
        let returnedObject = {original: String(part), transformed: null, newValue: null}
        part = part.slice(1)
        part = part.replace("_", "")
        part = part.toLowerCase()
        returnedObject.transformed = part
        return returnedObject
    })

    Object.entries(parameters)
    .map(part => {
        part[0] = part[0].replace("_", "")
        part[0] = part[0].toLowerCase()
        return {identifier: part[0], value: part[1]}
    })
    .filter(param => correspondanceLink.find(linkElement => linkElement.transformed === param.identifier))
    .forEach(param => {
        let correspondingElement = correspondanceLink.find(linkElement => linkElement.transformed === param.identifier)
        correspondingElement.newValue = param.value
    })

    correspondanceLink.forEach(element => modifiedLink.splice(modifiedLink.indexOf(element.original), 1, element.newValue))

    modifiedLink = modifiedLink.join("/")

    return modifiedLink
}