const mongoose = require('mongoose');

const applySchema = mongoose.Schema(
  {
    applicantId: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    portfolioLink: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Apply = mongoose.model('apply', applySchema);

module.exports = Apply;
