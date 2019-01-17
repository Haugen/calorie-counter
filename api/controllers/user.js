/**
 * POST /user/signup
 * Sign user up. Returns the signed up user?
 *
 * Permissions: *
 */
exports.postSignup = (req, res) => {
  res.json({
    message: 'POST New user signup.'
  });
};

/**
 * POST /user/login
 * Logges user in. Returns logged in user?
 *
 * Permissions: *
 */
exports.postLogin = (req, res) => {
  res.json({
    message: 'POST User login.'
  });
};

/**
 * POST /user/delete
 * Deletes a user. Returns deleted user?
 *
 * Permissions: admin
 */
exports.postDelete = (req, res) => {
  res.json({
    message: 'POST Deletes user.'
  });
};

/**
 * PUT /user/edit/:id
 * Edits a user. Returnes the updated user?
 *
 * Permissions: user, manager, admin
 */
exports.putEdit = (req, res) => {
  res.json({
    message: 'PUT Edits user.'
  });
};
