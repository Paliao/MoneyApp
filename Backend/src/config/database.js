const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/mymoney')


mongoose.Error.messages.general.required = "The attributte '{PATH}' is required."
mongoose.Error.messages.Number.min = 
    "The '{VALUE}' informed is lesser than the minimun limit of '{MIN}'."
mongoose.Error.messages.Number.max = 
"The '{VALUE}' informed is lesser than the minimun limit of '{MAX}'."
mongoose.Error.messages.String.enum = 
    "'{VALUE}' isn't valid for the attributte '{PATH}'."