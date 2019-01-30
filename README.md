# Calorie Counter

`api` contains the backend, built in Express.

`web` contains the frontend, built in React.

## Further development

- Front end form validation.
- E-mail confirmation when signing up and/or changing e-mail address.
- "I forgot my password" functionality.
- Pagination for all listings of meals and users.
- Action for reseting all meal filters.
- Managers shouldn’t see the edit button for admin users.
- Bootstrap toolbar doesn’t close when user clicks a link.
- When an admin is changing their own role, maybe auto logout and force user to login again.
- Some relevant filters for admins when viewing all meals.
- Improve the alert messages experience.
- No need to print out “Validation failed” together with the warnings when form validation fails.
- Better JWT storage.
- Add proper logging.
- Automatic logout not kicking in, resulting in error messages once the JWT expires (only in development?).
- Better protection of unauthorised parts of the UI.
- Autocomplete field for admins when assigning meals to users.
- Clearer indication when you are editing another account than your own.
