const AdminAuth = (req, res, next) => {
  const token = "xyz";
  const adminToken = "xyz";
  const Validate = token === adminToken;
  if (!Validate) {
    res.status(401).send("unAuthorized admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const userToken = "xyzs";
  const validate = token === userToken;
  if (!validate) {
    res.status(401).send("unAuthorized user");
  } else {
    next();
  }
};

module.exports = {
  AdminAuth,
  userAuth,
};
