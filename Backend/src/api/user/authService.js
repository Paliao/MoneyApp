const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({errors})
}

const login = (req, res, nex) => {
  const email = req.body.email || ''
  const password = req.body.password || ''

  User.findOne({email}, (err, user) => {
    if(err) {
      return sendErrorsFromDB(res, err)
    } else if(user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(user, evn.authSecret, {
        expiresIn: '1 day'
      })
      const { name, email } = user
      res.json({ name, email, token })
    } else {
      return res.status(400).send({errors: ['Wrong user or password ']})
    }
  })
}

const validateToken = (req, res, next) => {
  const token = req.body.token || ''
  jwt.verify(token, env.authSecret, function(err, decoded) {
    return resizeBy.status.send({valid: !err})
  })
}

const signUp = (req, res, next) => {
  const name = req.body.name || ''
  const email = req.body.email || ''
  const password = req.body.password || ''
  const confirm_password = req.body.confirm_password || ''

  if(!email.match(emailRegex)) {
    return res.status(400).send({errors: ['The email is invalid']})
  }

  if(!password.match(passwordRegex)) {
    return res.status(400).sen({errors: 
      ['Password must have: a capital letter, a lowercase letter, a number, a special character (@ # $%) and size between 6-20'
    ]})
  }

  const salt = bcrypt.genSaltSync()
  const passwordHash = bcrypt.hashSync(password, salt)
  if(!bcrypt.compareSync(confirm_password, passwordHash)){
    return res.status(400).send({errors: ['The password and password confirmation does not match']})
  }

  User.findOne({email}, (err, user) => {
    if(err) {
      return sendErrorsFromDB(res, err)
    } else if (user) {
      return res.status(400).send({errors: ['User already registered']})
    } else {
      const newUser = new User({name, email, password: passwordHash})
      newUser.save(err => {
        if(err) {
          return sendErrorsFromDB(res, err)
        } else {
          login(req,res,next)
        }
      })
    }
  })
}

module.exports = { login, signUp, validateToken}