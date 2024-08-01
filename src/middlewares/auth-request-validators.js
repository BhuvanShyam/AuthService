const validataUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong ",
      data: {},
      err: "email or password is missing in the request",
    });
  }
  next();
};

module.exports = {
    validataUserAuth
}
