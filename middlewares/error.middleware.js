const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server Error";

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    err.statusCode = 404;
    err.message = `Resource not found with id of ${err.value}`;
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate field value entered";
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors).map((val) => val.message);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

export default errorMiddleware;
