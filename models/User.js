const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    students: {
      type: [String],
      default: []
    },
    phone: {
      type: String,
      default: ""
    },
    disabled:{
      type: Boolean,
      default: false
    },
    lectures: {
      type: [String],
      default: []
    },
    legalRepresentative: {
      type: String,
      default: ""
    },
    child: {
      type: [String],
      default: []
    },
    homeworks: {
      type: [{
        type: String,
        checked: Boolean
      }],
      default: []
    },
    summary: {
      type: [String],
      default: []
    },
    plan: {
      type: [String],
      default: []
    },
    wordList: {
      type: String,
      default: ''
    },
    files: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const declareModel = () => {
  try {
    const model = mongoose.model('users');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('users', userSchema);
  }
}

module.exports = declareModel();
