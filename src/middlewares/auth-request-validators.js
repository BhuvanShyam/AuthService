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

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    res.status(400).json({
      success: false,
      message: "Something went wrong ",
      data: {},
      err: "user id is not given",
    });
  }
  next();
};

module.exports = {
  validataUserAuth,
  validateIsAdminRequest,
};
