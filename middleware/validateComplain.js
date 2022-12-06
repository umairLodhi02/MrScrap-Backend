const jwt = require("jsonwebtoken");
const { Complain } = require("../models/complaints");

const validateComplain = async (req, res, next) => {
  const complainId =
    req.body.complainId || req.query.complainId || req.params.complainId;

  if (!complainId) {
    return res
      .status(403)
      .send({ success: false, message: "Scrap Id is required" });
  } else {
    try {
      const complain = await Complain.findOne({ _id: complainId });
      if (!complain) {
        return res
          .status(401)
          .json({ success: false, message: "Complain not found" });
      } else {
        req.complain = complain;
        next();
      }
    } catch (err) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Complain Id" });
    }
  }
};

module.exports = validateComplain;
