'use strict'
const apiResponse = require("roit-response-api-node")

module.exports = {
    test: async (req, res) => {
        res.json(apiResponse.OkResponse(null, 'Yuri corno!'))
    }
}