class baseForAll {
    constructor(bot, rawData=null){
        this._bot = bot
        this._token = bot.token
        this._modifyConstants = []
        this._rawData = rawData
    }

    #getThisData(entryName, data, type){
        let returnedData = data || this

        if (type !== 'this') {
            returnedData = data
        }

        return returnedData[entryName]
    }

    #compareArrays(oldArray, newArray, ignoredParameters, compareFunction){
        if (oldArray.length !== newArray.length) return true

        let typeData = typeof newArray[0] === 'object' ? 'object' : 'basic'
        if (typeData === 'object') {
            for (const newArrayValue of newArray){
                let entries = Object.entries(newArrayValue)
                let oldArrayValueFound = oldArray.find(oldArrayValue => {
                    entries.forEach(entry => {
                        if (oldArrayValue[entry[0]] !== entry[1]) return
                    })
                    return true
                })

                if (!oldArrayValueFound) return true

                let modifications = this._modifyDatas(newArrayValue, ignoredParameters, compareFunction, false, oldArrayValueFound)
                if (modifications.length) return true
            }
            for (const oldArrayValue of oldArray){
                let entries = Object.entries(oldArrayValue)
                let newArrayValueFound = oldArray.find(newArrayValue => {
                    entries.forEach(entry => {
                        if (newArrayValue[entry[0]] !== entry[1]) return
                    })
                    return true
                })

                if (!newArrayValueFound) return true

                let modifications = this._modifyDatas(oldArrayValue, ignoredParameters, compareFunction, false, newArrayValueFound)
                if (modifications.length) return true
            }
        } else { 
            for (const newArrayValue of newArray){
                if (!oldArray.includes(newArrayValue)) return true
            }
            for (const oldArrayValue of oldArray){
                if (!newArray.includes(oldArrayValue)) return true
            }
        }

        return false
    }

    _modifyDatas(data, ignoredParameters=[], compareFunction=false, isGuild=false, thisData=null){
        let modifications = []
        let toCheck = Object.entries(data)
        toCheck.forEach(entry => {
            if (entry[0].startsWith('_') || toCheck.find(localEntry => localEntry[0] === entry[0]+'_id') || ignoredParameters.includes(entry[0])) return
            let gotEntryValue = this.#getThisData(entry[0], thisData, 'this')
            switch(true){
                case(Array.isArray(entry[1])):
                    if (isGuild) return
                    let arrayModifications = this.#compareArrays(entry[1], gotEntryValue, ignoredParameters, compareFunction)
                    if (arrayModifications) {
                        modifications.push({
                            propertyName: entry[0],
                            modifiedValues: []
                        })
                    }
                break;
                case(typeof entry[1] === 'object' && entry[1] !== null):
                    if (isGuild) return
                    let objectModifications;
                    if (entry[1].container) {
                        objectModifications = compareFunction(gotEntryValue.container, entry[1].container, entry[0])
                    } else {
                        objectModifications = this._modifyDatas(entry[1], ignoredParameters, compareFunction, false, gotEntryValue)
                    }
                    if (objectModifications.length) {
                        modifications.push({
                            propertyName: entry[0],
                            modifiedValues: objectModifications
                        })
                    }
                break;
                case(['string', 'number', 'boolean'].includes(typeof entry[1])):
                    if (gotEntryValue !== entry[1]) {
                        modifications.push({
                            propertyName: entry[0],
                            modifiedValues: [{
                                old: gotEntryValue,
                                new: entry[1],
                            }]
                        })
                    }
                break;
                default:
                    let condition = !gotEntryValue && !entry[1]
                    
                    if (!condition) {
                        modifications.push({
                            propertyName: entry[0],
                            modifiedValues: [{
                                old: gotEntryValue,
                                new: entry[1],
                            }]
                        })
                    }
                break;
            }
        })
        
        return modifications
    }

    _typechange(converter, data){
        if(isNaN(data) || !converter[data]) return data
        else return converter[data]
    }
}

module.exports = baseForAll