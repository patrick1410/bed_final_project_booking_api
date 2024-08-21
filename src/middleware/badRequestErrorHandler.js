const badRequestErrorHandler = (err, req, res, next) => {
  if (err.name === "BadRequestError") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
};

export default badRequestErrorHandler;
