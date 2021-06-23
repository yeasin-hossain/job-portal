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
  singleJobById,
} = require('../../api/controller/jobs');
const Auth = require('../../middelwares/auth');
const { jobValidator, jobValidationHandler } = require('../../middelwares/job');

const router = express.Router();

router.get('/limit/:limit', getAllJobs);
// router.get('/job/:id', job);
router.get('/tag/:tag/:limit', JobsByTag);
router.get('/single/:id', singleJob);
router.get('/byUser/:id', jobsByUser);
router.put('/:id', Auth, UpdateJob);
router.post('/', Auth, jobValidator, jobValidationHandler, saveJob);
router.delete('/:id', Auth, deleteJob);

router.get('/singleJobById/:jobId', singleJobById);

module.exports = router;
