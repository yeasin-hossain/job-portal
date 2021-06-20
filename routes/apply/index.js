const express = require('express');
const {
  allApply,
  saveApply,
  singleApply,
  deleteApply,
  updateApply,
  applyByUser,
} = require('../../api/controller/apply');
const { applyValidator } = require('../../middelwares/apply');

const router = express.Router();

router.get('/', applyValidator, allApply);
router.post('/', saveApply);
router.get('/:id', singleApply);
router.get('/user/:id', applyByUser);
router.put('/:id', updateApply);
router.delete('/:id', deleteApply);

module.exports = router;
