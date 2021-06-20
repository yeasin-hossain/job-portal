/* eslint-disable consistent-return */
const { getReasonPhrase } = require('http-status-codes');
const Job = require('../../modal/jobs');
// save new job
module.exports.saveJob = async (req, res) => {
  const jobInfo = req.body;

  try {
    if (!jobInfo) {
      return res.status(400).json({
        message: 'Provide valid Data',
        code: 400,
        status: getReasonPhrase(400),
        error: true,
        response: null,
      });
    }

    const savedJob = await Job.create(jobInfo);
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: savedJob,
    });
  } catch (error) {
    console.log(error);
  }
};

// All jobs
module.exports.getAllJobs = async (req, res) => {
  const { limit } = req.params;
  try {
    // eslint-disable-next-line radix
    const jobs = await Job.find({}).limit(parseInt(limit));

    if (!jobs) {
      return res.status(404).json({
        message: 'No Jobs Available',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// jobs by user
module.exports.jobsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const jobs = await Job.find({ jobPosterId: id });
    if (!jobs) {
      return res.status(404).json({
        message: 'No Jobs Available',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: jobs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Update job
module.exports.UpdateJob = async (req, res, next) => {
  const { id } = req.params;
  const jobInfo = req.body;

  try {
    const job = await Job.findById({ _id: id });

    if (job) {
      const updateJob = await Job.findByIdAndUpdate(id, jobInfo);

      if (updateJob) {
        const updatedJob = await Job.findById({ _id: id });
        return res.status(200).json({
          message: 'success',
          code: 200,
          status: getReasonPhrase(200),
          error: false,
          response: updatedJob,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

// single job
module.exports.singleJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: 'Sorry No Job Found',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: job,
    });
  } catch (err) {
    next(err);
  }
};

// delete job
module.exports.deleteJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndRemove(id);

    if (!deletedJob) {
      return res.status(404).json({
        message: 'Sorry No Job Found',
        code: 404,
        status: getReasonPhrase(404),
        error: true,
        response: null,
      });
    }

    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: deletedJob,
    });
  } catch (err) {
    next(err);
  }
};
