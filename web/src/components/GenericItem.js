import React from 'react';

const GenericItem = props => {
  if (props.content === 'user') {
    return (
      <div>
        E-mail: {props.email}, Calories: {props.calories}, UserId:{' '}
        {props.userId}
      </div>
    );
  }

  if (props.content === 'meal') {
    return (
      <div>
        Text: {props.text}, Calories: {props.calories}, MealId: {props.mealId},
        Date: {props.date}, User: {props.user.email}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(props.mealId)}
        >
          Delete
        </button>
      </div>
    );
  }

  return null;
};

export default GenericItem;
