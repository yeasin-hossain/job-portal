const express = require('express');
const {
  saveJob,
  getAllJobs,
  UpdateJob,
  singleJob,
  deleteJob,
  jobsByUser,
  JobsByTag,
  job,
} = require('../../api/controller/jobs');
const { jobValidator, jobValidationHandler } = require('../../middelwares/job');

const router = express.Router();

router.get('/:limit', getAllJobs);
router.get('/job/:id', job);
router.get('/:tag/:limit', JobsByTag);
router.get('/single/:id', singleJob);
router.get('/user/:id', jobsByUser);
router.put('/:id', UpdateJob);
router.post('/', jobValidator, jobValidationHandler, saveJob);
router.delete('/:id', deleteJob);

module.exports = router;
