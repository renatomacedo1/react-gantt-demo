const mongoose = require('mongoose')
const moment = require("moment");

const TaskSchema = new mongoose.Schema(
  {
    ensaio: {// ensaio
      type: String,
      require: true
    },
    start_date: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
      require: true
    },
    start_hour: {
      type: String,
      default: "00:00",
      require: true
    },
    ending_date: {
      type: Number,
      default: moment(),
      require: false
    },
    projeto: {
      type: String,
      require: true
    },
    text: {//Projeto-Ensaio
      type: String,
      require: true
    },
    nome: {
      type: String,
      require: true
    },
    codigoCliente: {// Tarea
      type: String,
      default: "-",
      require: true
    },
    type: {
      type: String,
      require: true
    },
    type2: {
      type: String,
      require: true
    },
    color: {
      type: String
    },
    textColor: {
      type: String
    },
    progressColor: {
      type: String
    },
    machine: {
      type: String,
      require: true
    },
    progress: {
      type: Number,
      require: true
    },
    duration: {
      type: Number,
      require: true
    },
    durationHours: {
      type: Number,
      require: true
    },
    responsavel: {
      type: String,
      require: true
    },
    responsavelCliente: {
      type: String,
      default: "-",
      require: true
    },
    descricao: {
      type: String,
      default: "-",
      require: false
    },
    sortorder: {
      type: String,
      require: true
    },
    parent: {
      type: String,
      require: true
    },
    modified: {
      type: String,
      default: "-",
      require: false
    },
    started: {
      type: String,
      default: "no",
      require: false
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema)
