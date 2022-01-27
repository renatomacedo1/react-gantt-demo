const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllUsers = async (req, res) => {
  const users = await User.find()
//  const users = await User.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ users })
}



const getUser = async (req, res) => {
  const {
    user: { userId },
    params: { id: userId },
  } = req

  const user = await User.findOne({
    _id: userId,
   // createdBy: userId,
  })
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }
  res.status(StatusCodes.OK).json({ user })
}



const createUser = async (req, res) => {
  req.body.createdBy = req.user.userId
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}



const updateUser = async (req, res) => {
  const {
    body: { },
    user: { userId },
    params: { id: userId },
  } = req

  /* if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  } */
  const user = await User.findByIdAndUpdate(
    { _id: userId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }
  res.status(StatusCodes.OK).json({ user })
}




const deleteUser = async (req, res) => {
  const {
    user: { userId },
    params: { id: userId },
  } = req

  const user = await User.findByIdAndRemove({
    _id: userId,
    createdBy: userId,
  })
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }
  res.status(StatusCodes.OK).send()
}




module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
}
