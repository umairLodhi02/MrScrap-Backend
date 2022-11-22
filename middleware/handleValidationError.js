const validationHandler = (error, req, res, next) => {
  if (error) {
    let errorMsg = error.details[0].message;
    if (errorMsg.includes("pattern")) {
      res.status(409).send({
        success: false,
        message: "Password must contains one letter and one Number",
      });
    } else {
      res.status(409).send({ success: false, message: errorMsg });
    }
  }
};

module.exports = validationHandler;
