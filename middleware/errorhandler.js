const errorHandler = (err, req, res, next) => {
  res.status(500).send({
    success: false,
    message: "Due to technical reason request failed. Please try later !",
  });
};

module.exports = errorHandler;
