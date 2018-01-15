const express = require('express')
const auth = require('./auth')

module.exports = function(server) {
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth)

  const BillingCycle = require('../api/billingCycle/biliingCycleService')
  BillingCycle.register(protectedApi, '/billingCycles')
 

  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)
}
