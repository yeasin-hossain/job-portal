const express = require('express');
const {
  saveJob,
  getAllJobs,
  UpdateJob,
  singleJob,
  deleteJob,
} = require('../../api/controller/jobs');
const { jobValidator, jobValidationHandler } = require('../../middelwares/job');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', singleJob);
router.put('/:id', UpdateJob);
router.post('/', jobValidator, jobValidationHandler, saveJob);
router.delete('/:id', deleteJob);

module.exports = router;
