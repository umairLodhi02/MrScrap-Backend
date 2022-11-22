const jwt = require("jsonwebtoken");
const { Scrap } = require("../models/scrap");

const verifyScrap = async (req, res, next) => {
  const scrapId = req.body.scrapId || req.query.scrapId || req.params.scrapId;

  if (!scrapId) {
    return res
      .status(403)
      .send({ success: false, message: "Scrap Id is required" });
  } else {
    try {
      const scrap = await Scrap.findOne({ _id: scrapId });
      if (!scrap) {
        return res
          .status(401)
          .json({ success: false, message: "Scrap not found" });
      } else {
        req.scrap = scrap;
        next();
      }
    } catch (err) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Scrap Id" });
    }
  }
};

module.exports = verifyScrap;
