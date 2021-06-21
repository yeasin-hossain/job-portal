const express = require('express');
const {
  saveJob,
  getAllJobs,
  UpdateJob,
  singleJob,
  deleteJob,
  jobsByUser,
} = require('../../api/controller/jobs');
const { jobValidator, jobValidationHandler } = require('../../middelwares/job');

const router = express.Router();

router.get('/:limit', getAllJobs);
router.get('/single/:id', singleJob);
router.get('/user/:id', jobsByUser);
router.put('/:id', UpdateJob);
router.post('/', jobValidator, jobValidationHandler, saveJob);
router.delete('/:id', deleteJob);

module.exports = router;
