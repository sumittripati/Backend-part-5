const errorHandler = (err, req, res, next) => {
  const stattus = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const extraDetails = err.extraDetails || "Error from backend";

  return res.status(stattus).json({ message, extraDetails });
}

module.exports = errorHandler; // Export the error handler middleware