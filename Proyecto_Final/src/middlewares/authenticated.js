export const Authenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }

  res.redirect("/signup");
};
