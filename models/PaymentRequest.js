const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentRequestSchema = new Schema(
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
    amount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const declareModel = () => {
  try {
    const model = mongoose.model('paymentRequests');
    // model already declared
    return model;
  } catch {
    // declare model
    return mongoose.model('paymentRequests', paymentRequestSchema);
  }
}

module.exports = declareModel();
