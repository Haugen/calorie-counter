import { BASE_URL } from './helpers';

// Generalized function for calling the backend API.
export default async (resource, method = 'GET', body = null, token = null) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  };
  if (token) {
    options.headers.Authorization = 'Baerer ' + token;
  }

  try {
    const response = await fetch(BASE_URL + resource, options);
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      result.hasError = true;
      result.errorMessages = [
        {
          type: 'warning',
          message: result.message || result.error
        }
      ];

      if (result.errors) {
        result.errors.forEach(error => {
          result.errorMessages.push({
            type: 'warning',
            message: error.msg
          });
        });
      }

      return result;
    }
  } catch (error) {
    return {
      hasError: true,
      errorMessages: [
        {
          type: 'warning',
          message: 'Something went wrong. We are terribly sorry!'
        }
      ]
    };
  }
};
