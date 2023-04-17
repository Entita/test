const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apologySchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const declareModel = () => {
  try {
    const model = mongoose.model('apologies');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('apologies', apologySchema);
  }
}

module.exports = declareModel();
