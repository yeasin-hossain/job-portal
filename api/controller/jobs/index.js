/* eslint-disable consistent-return */
const Job = require('../../modal/jobs');

module.exports.saveJob = async (req, res) => {
  const jobInfo = req.body;

  try {
    if (!jobInfo) {
      return res.status(400).send('Provide valid Data');
    }

    const savedJob = await Job.create(jobInfo);
    return res.status(200).send(savedJob);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    if (!jobs) {
      return res.status(404).json({ message: 'No Jobs Available' });
    }
    res.status(200).json(jobs);
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
        res.status(200).json(updatedJob);
      }
    }
  } catch (err) {
    next(err);
  }
};
module.exports.singleJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(200).json({ message: 'Sorry No job Found' });
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedJob = await Job.findByIdAndRemove(id);
    if (!deletedJob) {
      return res.status(200).json({ message: 'Sorry No Job Found' });
    }
    res.status(200).json(deletedJob);
  } catch (err) {
    next(err);
  }
};
