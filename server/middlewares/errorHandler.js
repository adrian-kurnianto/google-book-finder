const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "required":
      res.status(400).json({ message: "All field is required" });
      break;
      case "duplicateItem":
      res.status(400).json({ message: "Item already in wishlist" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;