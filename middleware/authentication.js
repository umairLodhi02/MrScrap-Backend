const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const config = process.env;

const { TOKEN_KEY } = require("../config/config");
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "A token is required", code: 401 });
  } else {
    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: "Token not found", code: 401 });
      } else {
        let user = await User.findOne({
          _id: decoded.ID,
        });
        if (user) {
          req.userId = user._id;
          next();
        } else {
          return res
            .status(404)
            .send({ success: false, message: "Not Authorized", code: 401 });
        }
      }
    } catch (err) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Token", code: 401 });
    }
  }
};

module.exports = verifyToken;
