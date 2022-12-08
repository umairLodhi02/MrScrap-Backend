const jwt = require("jsonwebtoken");
const { TOKEN_KEY, validateObjectId } = require("../config/config");
const {
  validateUser,
  User,
  validateLoginType,
  validateLoginWithEmail,
  validateLoginWithNumber,
  validateUpdateUser,
} = require("../models/user");

module.exports = {
  registerUser: async function (req, res) {
    const {
      email,
      contactNo,
      password,
      username,
      isAdmin,
      profileImgUrl,
      token,
    } = req.body;

    let { error } = validateUser(req.body);
    if (error) {
      let errorMsg = error.details[0].message;
      if (errorMsg.includes("pattern")) {
        res.status(409).send({
          success: false,
          message: "Password must contains one letter and one Number",
        });
      } else {
        res.status(409).send({ success: false, message: errorMsg, data: {} });
      }
    } else {
      let user = await User.findOne({ email: email });

      if (user) {
        res
          .status(409)
          .json({ success: false, message: "Email already exists", data: {} });
      } else {
        const newUser = await User.create({
          username,
          email: email.toLowerCase(),
          password: password,
          contactNo,
          isAdmin,
          profileImgUrl,
          token,
        });

        if (newUser) {
          res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: newUser,
          });
        }
      }
    }
  },

  login: async function (req, res) {
    const { user, loginType } = req.body;
    console.log(user, loginType);
    const { error } = validateLoginType({ loginType });
    if (error) {
      res
        .status(409)
        .send({ success: false, message: error.details[0].message, data: {} });
    } else if (loginType === "email") {
      const { error } = validateLoginWithEmail(user);
      if (error) {
        let errorMsg = error.details[0].message;
        if (errorMsg.includes("pattern")) {
          res.status(409).send({
            success: false,
            message: "Password must contains one letter and one Number",
          });
        } else {
          res.status(409).send({ success: false, message: errorMsg, data: {} });
        }
      } else {
        const { email, password } = user;
        let currentUser = await User.findOne({ email: email });
        if (!currentUser) {
          res.status(404).json({
            success: false,
            message: "Email does not exists!",
            data: {},
          });
        } else {
          if (password !== currentUser.password) {
            res.status(404).json({
              success: false,
              message: "Password does not match!",
              data: {},
            });
          } else {
            let token = jwt.sign(
              {
                ID: currentUser._id,
                email,
                username: currentUser.username,
                profileImgUrl: currentUser.profileImgUrl,
                contactNo: currentUser.contactNo,
              },
              TOKEN_KEY,
              { expiresIn: 60000 }
            );
            currentUser.token = token;
            await currentUser.save();
            res.status(200).send({
              success: true,
              message: "Login Successful!",
              data: {
                accessToken: token,
                metadata: {
                  ID: currentUser._id,
                  username: currentUser.username,
                  email: currentUser.email,
                  profileImgUrl: currentUser.profileImgUrl,
                  contactNo: currentUser.contactNo,
                },
              },
            });
          }
        }
      }
    } else if (loginType === "number") {
      const { error } = validateLoginWithNumber(user);
      if (error) {
        res.status(409).send({
          success: false,
          message: error.details[0].message,
          data: {},
        });
      } else {
        const { contactNo, password } = user;
        let currentUser = await User.findOne({ contactNo: contactNo });
        if (!currentUser) {
          res.status(404).json({
            success: false,
            message: "Contact Number does not exists!",
            data: {},
          });
        } else {
          if (password !== currentUser.password) {
            res.status(404).json({
              success: false,
              message: "Password does not match!",
              data: {},
            });
          } else {
            let token = jwt.sign(
              {
                ID: currentUser._id,
                email: currentUser.email,
                username: currentUser.username,
                profileImgUrl: currentUser.profileImgUrl,
                contactNo: contactNo,
              },
              TOKEN_KEY,
              { expiresIn: 60000 }
            );
            currentUser.token = token;
            await currentUser.save();
            res.status(200).send({
              success: true,
              message: "Login Successful!",
              data: {
                accessToken: token,
                metadata: {
                  ID: currentUser._id,
                  username: currentUser.username,
                  email: currentUser.email,
                  profileImgUrl: currentUser.profileImgUrl,
                  contactNo: currentUser.contactNo,
                },
              },
            });
          }
        }
      }
    }
  },

  updateUser: async function (req, res) {
    const { error } = validateObjectId({ _id: req.params.id });

    if (error) {
      res.status(401).send({
        success: false,
        message: "Invalid User Id",
        data: {},
      });
    } else {
      const currentUser = await User.findOne({
        _id: req.params.id,
      });
      if (!currentUser) {
        res.status(404).send({
          status: false,
          message: "User does not exist!",
          data: {},
        });
      } else {
        const { error } = validateUpdateUser(req.body);
        if (error) {
          res.status(409).send({
            status: false,
            message: error.details[0].message,
            data: {},
          });
        } else {
          const { username, email, contactNo, profileImgUrl } = req.body;

          currentUser.email = email ? email : currentUser.email;
          currentUser.username = username ? username : currentUser.username;
          currentUser.contactNo = contactNo ? contactNo : currentUser.contactNo;
          currentUser.profileImgUrl = profileImgUrl
            ? profileImgUrl
            : currentUser.profileImgUrl;

          const updatedUser = await currentUser.save();

          res.status(200).send({
            success: true,
            message: "Profile Updated Successfully!",
            data: {
              metadata: {
                ID: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profileImgUrl: updatedUser.profileImgUrl,
                contactNo: updatedUser.contactNo,
              },
            },
          });
        }
      }
    }
  },
};
