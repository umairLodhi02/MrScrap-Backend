const jwt = require("jsonwebtoken");
const { Scrap } = require("../models/scrap");

const checkUserInScrap = async (req, res, next) => {
  const userID = req.params.userId;

  if (!userID) {
    return res
      .status(403)
      .send({ success: false, message: "User Id is required", data: {} });
  } else {
    try {
      const scrap = await Scrap.findOne({ userId: userID });
      if (!scrap) {
        return res.status(401).json({
          success: false,
          message: "Scraps for given User not found",
          data: {},
        });
      } else {
        req.providedUserId = scrap.userId;
        next();
      }
    } catch (err) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Scrap Id", data: {} });
    }
  }
};

module.exports = checkUserInScrap;
