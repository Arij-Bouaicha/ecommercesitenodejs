const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

// te5ed WEB SERVICE register user  lawej sur internet kifech ta"mil route  bechnta3mil save 

// router.post('/login')
// auth 
router.post('/login', async (req, res) => {
  // check validation
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // checking if email in database
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('email or password is wrong')

  // check is pasword correct

  const validPass = bcrypt.compareSync(req.body.password, user.password)
  if (!validPass) return res.status(400).send('email or password is wrong')

  // creat signin token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECTRET)
  res.header('auth-token', token).send(token)

  res.send('success')
})

module.exports = router
