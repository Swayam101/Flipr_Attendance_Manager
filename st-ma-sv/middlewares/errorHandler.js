const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err.code == 11000) {
    const collection = err.message
      .split(" ")[5]
      .split(".")[1]
      .slice(0, -1)
      .toUpperCase();
    const key = Object.keys(err.keyPattern)[0];
    const message = `${collection} with this ${key} Already Exists`;
    return res.status(409).json({ error: message });
  }
  // console.log(err);
  res.status(500).json({ message: err.message, error: err });
};
export default errorHandlerMiddleware;
