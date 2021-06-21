const express = require('express');
const {
  allApply,
  saveApply,
  singleApply,
  deleteApply,
  updateApply,
  applyByUser,
} = require('../../api/controller/apply');
// const { applyValidator, applyValidationHandler } = require('../../middelwares/apply');

const router = express.Router();

router.get('/', allApply);
router.post('/', saveApply);
router.get('/:id', singleApply);
router.get('/user/:id', applyByUser);
router.put('/:id', updateApply);
router.delete('/:id', deleteApply);

module.exports = router;
