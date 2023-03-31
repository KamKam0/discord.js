const fetch = require("node-fetch")

module.exports = async (url, options) => {
    return new Promise(async (resolve, reject) => {
        let initialRequest;
        
        try{
            initialRequest = await fetch(url, options)
        }catch(err){
            if(err.code === "ENOTFOUND" && err.type === "system") {
                let error = new Error("An error happened with your internet connection")
                error.content = err
                error.type = "system"
                error.code = "internet"
                return reject(error)
            }else return reject(err)
        }
        
        let jsonDatas;

        if(initialRequest.status === 204) jsonDatas = {}
        else jsonDatas = await initialRequest.json()

        jsonDatas.requestStatus = initialRequest.status

        return resolve({response: jsonDatas, requestStatus: initialRequest.status})
    })
}