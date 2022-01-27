const Link = require('../models/Link')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllLinks = async (req, res) => {
  const links = await Link.find()
//  const links = await Link.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ links })
}



const getLink = async (req, res) => {
  const {
    //user: { userId },
    params: { id: linkId },
  } = req

  const link = await Link.findOne({
    _id: linkId,
   // createdBy: userId,
  })
  if (!link) {
    throw new NotFoundError(`No link with id ${linkId}`)
  }
  res.status(StatusCodes.OK).json({ link })
}



const createLink = async (req, res) => {
  req.body.createdBy = req.user.userId
  const link = await Link.create(req.body)
  res.status(StatusCodes.CREATED).json({ link })
}



const updateLink = async (req, res) => {
  const {
    body: { },
    user: { userId },
    params: { id: linkId },
  } = req

  /* if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  } */
  const link = await Link.findByIdAndUpdate(
    { _id: linkId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!link) {
    throw new NotFoundError(`No link with id ${linkId}`)
  }
  res.status(StatusCodes.OK).json({ link })
}




const deleteLink = async (req, res) => {
  const {
    user: { userId },
    params: { id: linkId },
  } = req

  const link = await Link.findByIdAndRemove({
    _id: linkId,
    createdBy: userId,
  })
  if (!link) {
    throw new NotFoundError(`No link with id ${linkId}`)
  }
  res.status(StatusCodes.OK).send()
}




module.exports = {
  createLink,
  deleteLink,
  getAllLinks,
  updateLink,
  getLink,
}
