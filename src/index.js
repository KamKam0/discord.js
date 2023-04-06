// General //

exports.Client = require("./structures/client/bot")

// File Manager //

exports.FileManager = require("./handlers/filemanager")

// User interactions //

exports.Form = require("./structures/components/form")
exports.TextInput = require("./structures/components/textinput")
exports.SlashCommand = require("./structures/applicationscommands/command")

// Message Components //

exports.Embed = require("./structures/components/embed")
exports.Button = require("./structures/components/button")
exports.SelectMenu = require("./structures/components/selectmenu")
exports.SelectMenuOption = require("./structures/components/selectoption")

// Data //

exports.constants = require("./utils/constants")
exports.utils = require("./utils/functions")

// Info //

exports.version = require('../package.json').version
exports.name = "@kamkam1_0/discord.js"