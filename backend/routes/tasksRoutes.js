const express = require('express')

const router = express.Router()
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  getTask,
} = require('../controllers/tasksController')

router.route('/').post(createTask).get(getAllTasks)

router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)

module.exports = router
