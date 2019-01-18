import * as actionTypes from './actionTypes';

const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

const signupSuccess = result => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: {
      result: result
    }
  };
};

const signupFail = errors => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    payload: {
      messages: errors
    }
  };
};

export const handleSignup = formData => {
  return async dispatch => {
    dispatch(signupStart());

    const response = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    // If validation failed.
    if (response.status === 422) {
      const result = await response.json();

      const errors = [
        {
          type: 'warning',
          message: result.message
        }
      ];

      if (result.errors) {
        result.errors.forEach(error => {
          errors.push({
            type: 'warning',
            message: error.msg
          });
        });
      }

      return dispatch(signupFail(errors));
    }
    // Other errors, probably 500.
    if (response.status !== 201) {
      const errors = [
        {
          type: 'warning',
          message: 'Oops! Something went wrong.'
        }
      ];

      return dispatch(signupFail(errors));
    }

    // Account sucessfully created.
    return dispatch(signupSuccess());
  };
};
