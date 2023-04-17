const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworksSchema = new Schema(
    {
      title: {
        type: String,
        required: true
    },
      description: {
          type: String,
          required: true
      },
    },
    { timestamps: true }
)

const declareModel = () => {
    try {
      const model = mongoose.model('homeworks');
      // model already declared
      return model;
    } catch {
      // declare model
      return mongoose.model('homeworks', homeworksSchema);
    }
  }
  
  module.exports = declareModel();