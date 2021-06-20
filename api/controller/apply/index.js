const Apply = require("../../modal/apply");

module.exports.saveApply = async (req, res) => {
    const applyInfo = req.body;
  try {
    if (!applyInfo) {
        return res.status(400).send('Provide valid Data');
      }
  
      const savedApply = await Apply.create(applyInfo);
      return res.status(200).send(savedApply);
  } catch (error) {
      console.log(error);
  }
};

// all apply
module.exports.allApply = async (req, res) => {
    try {
        const apply = await Apply.find({});
    
        if (!apply) {
          return res.status(404).json({ message: 'No Apply Available' });
        }
    
        res.status(200).json(apply);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};


module.exports.updateApply = async (req, res) => {
    const { id } = req.params;
    const applyInfo = req.body;
  
    try {
      const apply = await Apply.findById({ _id: id });
  
      if (apply) {
        const updateApply = await Apply.findByIdAndUpdate(id, applyInfo);
  
        if (updateApply) {
          const updatedApply = await Apply.findById({ _id: id });
          res.status(200).json(updatedApply);
        }
      }
    } catch (err) {
      next(err);
    }
};
module.exports.singleApply = async (req, res) => {
    const { id } = req.params;
    try {
      const apply = await Apply.findById(id);
      if (!apply) {
        return res.status(200).json({ message: 'Sorry No Apply Found' });
      }
  
      res.status(200).json(apply);
    } catch (err) {
      next(err);
    }
};
module.exports.deleteApply = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedApply = await Apply.findByIdAndRemove(id);
  
      if (!deletedApply) {
        return res.status(200).json({ message: 'Sorry No Apply Found' });
      }
  
      res.status(200).json(deletedApply);
    } catch (err) {
      next(err);
    }
};
module.exports.applyByUser = async (req, res) => {
    const { id } = req.params;

    try {
      const apply = await Apply.find({ applicantId: id });
      if (!apply) {
        return res.status(404).json({ message: 'No apply Available' });
      }
  
      res.status(200).json(apply);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
};
