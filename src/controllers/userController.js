const User = require('../models').User

const list = async (req, res) => {
  try {
    const users = await User.findAll()

    res.render('users/home', { users })
  } catch (error) {
    res.status(400).send(error)
  }
}

const create = async (req, res) => {
  try {
    const user = await User.create(req.body)

    res.render('users/detail', { user })
  } catch (error) {
    res.status(500).send(error)
  }
}

const retrieve = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)

    if (!user) {
      return res.status(404).send({
        message: 'User Not Found'
      })
    }

    res.render('users/detail', { user })
  } catch (error) {
    res.status(500).send(error)
  }
}

const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)

    if (!user) {
      return res.status(404).send({
        message: 'User Not Found'
      })
    }

    await user.update(req.body)

    res.render('users/detail', { user })
  } catch (error) {
    res.status(500).send(error)
  }
}

const destroy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      return res.status(404).send({
        message: 'User Not Found'
      })
    }

    await user.destroy()

    res.redirect('/users')
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = { list, create, retrieve, update, destroy }
