export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Acces denied: you don't have permission to acces this route",
      });
    }
    next();
  };
};
