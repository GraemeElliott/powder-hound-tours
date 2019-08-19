module.exports = (errorFn) => {
  return (req, res, next) => {
    errorFn(req, res, next).catch(error => next(error));
  };
};