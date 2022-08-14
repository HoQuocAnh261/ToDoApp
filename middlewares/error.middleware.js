const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  const response = {
    code: statusCode,
    message: message,
  };
  res.status(statusCode).send(response);
};
module.exports = errorHandler;
