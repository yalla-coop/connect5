const authorization = (userRole, allowedRoles) => {
  if (allowedRoles.includes(userRole)) return true;
  return false;
};

export default authorization;
