const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    jobPosterId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'publish'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('job', jobSchema);

module.exports = Job;
