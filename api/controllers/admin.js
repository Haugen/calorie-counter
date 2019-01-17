/**
 * GET /admin/users
 * Returns all users.
 *
 * Permissions: manager, admin.
 */
exports.getUsers = (req, res) => {
  res.json({
    message: 'GET Admin all users.'
  });
};

/**
 * GET /admin/meals
 * Returns all meals.
 *
 * Permissions: admin.
 */
exports.getMeals = (req, res) => {
  res.json({
    message: 'GET Admin all meals.'
  });
};
