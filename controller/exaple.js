'use strict'
var userService = require('../service/userService')

module.exports = {
    test: async (req, res) => {
        await userService.createUser()
    }
}