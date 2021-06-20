/* eslint-disable consistent-return */
const { getReasonPhrase } = require('http-status-codes');
const Apply = require('../../modal/apply');

module.exports.saveApply = async (req, res, next) => {
  const applyInfo = req.body;
  try {
    if (!applyInfo) {
      return res.status(400).json({
        message: 'Provide valid Data',
        code: 400,
        status: getReasonPhrase(400),
        error: true,
        response: null,
      });
    }

    const savedApply = await Apply.create(applyInfo);
    return res.status(200).json({
      message: 'success',
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: savedApply,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// all apply
module.exports.allApply = async (req, res, next) => {
  try {
    const apply = await Apply.find({});

    if (!apply) {
      return res.status(404).json({
        message: 'No Apply Available',
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
      response: apply,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.updateApply = async (req, res, next) => {
  const { id } = req.params;
  const applyInfo = req.body;

  try {
    const apply = await Apply.findById({ _id: id });

    if (apply) {
      const updateApply = await Apply.findByIdAndUpdate(id, applyInfo);

      if (updateApply) {
        const updatedApply = await Apply.findById({ _id: id });

        return res.status(200).json({
          message: 'success',
          code: 200,
          status: getReasonPhrase(200),
          error: false,
          response: updatedApply,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
module.exports.singleApply = async (req, res, next) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findById(id);
    if (!apply) {
      return res.status(404).json({
        message: 'Sorry No Apply Found',
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
      response: apply,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteApply = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedApply = await Apply.findByIdAndRemove(id);

    if (!deletedApply) {
      return res.status(404).json({
        message: 'Sorry No Apply Found',
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
      response: deletedApply,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.applyByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const apply = await Apply.find({ applicantId: id });
    if (!apply) {
      return res.status(404).json({
        message: 'Sorry No Apply Found',
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
      response: apply,
    });
  } catch (err) {
    next(err);
  }
};
