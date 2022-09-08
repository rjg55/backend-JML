exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleValidationErrors = (err, req, res, next) => {
  if (err.message) {
    res.status(400).send(err.message);
  } else next(err);
};

exports.genericError = (err, req, res) => {
  console.log(err);
  res.status(500).send({ message: "Something went wrong" });
};
