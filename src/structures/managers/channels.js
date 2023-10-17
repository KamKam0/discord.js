const Base = require("../bases/basemultiple")
const channelTypes = require("../../types/channels")
const revertChannelTypes = channelTypes.revert()

class Channels extends Base{
    constructor(_bot, guild_id){
        super(_bot, guild_id)
        this._ignoreParameters = [
            'pins',
            'messages',
            'members',
            'invites',
            'webhooks',
            'threads'
        ]
        this._compareFunction = (oldPermissions, newPermissions) => {
            let modifications = []
            let removedPermissions = oldPermissions.filter(oldPermission => !newPermissions.find(newPermission => newPermission.id === oldPermission.id))
            let addedPermissions = newPermissions.filter(newPermission => !oldPermissions.find(oldPermission => newPermission.id === oldPermission.id))
            let modifiedPermissions = oldPermissions.filter(oldPermission => !newPermissions.find(newPermission => {
                return newPermission.id === oldPermission.id && newPermission.allow === oldPermission.allow && newPermission.deny === oldPermission.deny
            }))
            removedPermissions.forEach(permission => {
                modifications.push({
                    old: permission,
                    new: null
                })
            })
            addedPermissions.forEach(permission => {
                modifications.push({
                    old: null,
                    new: permission
                })
            })
            modifiedPermissions.forEach(permission => {
                modifications.push({
                    old: permission,
                    new: newPermissions.find(newPermission => newPermission.id === permission.id)
                })
            })
            return modifications
        }
    }

    _modify(data){
        let channelClass = this.#getChannelClass(data.type)

        if (!channelClass) return null

        let oldInstance = this.get(data[this._getProperty])
        if(!oldInstance) return null

        if (!data.guild_id) {
            data = {...data, guild_id: this.guild_id}
        }

        let newInstance = new channelClass(data, this._bot)

        let modifications = oldInstance._modifyDatas(newInstance, this._ignoreParameters, this._compareFunction)
        this._delete(data[this._getProperty])
        this._add(newInstance)
        if(!modifications.length) return null

        return {
            modifications,
            newInstance,
            oldInstance,
        }
    }

    _add(data){
        let channelClass = this.#getChannelClass(data.type)
        this.container.push(new channelClass(data, this._bot))
        return this
    }

    #getChannelClass(channelRawType){
        let textType = revertChannelTypes[channelRawType]
        if(!textType && String(channelTypes.types[channelRawType]) !== "undefined") textType = channelRawType

        let channelClass = require(`../singles/channels/channel${String(textType).toLowerCase()}`)

        return channelClass
    }
}

module.exports = Channels