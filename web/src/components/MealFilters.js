import React from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const MealFilters = props => {
  return (
    <div className="meal-filters row">
      <div className="col-12 col-md-6 col-lg-3">
        <label>From date:</label>{' '}
        <DatePicker
          selected={props.filters.fromDate}
          onChange={e => props.onFilterChange(e, 'fromDate')}
          dateFormat="d/M yyyy"
          selectsStart
          startDate={props.filters.fromDate}
          endDate={props.filters.toDate}
          isClearable={true}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <label>To date:</label>{' '}
        <DatePicker
          selected={props.filters.toDate}
          onChange={e => props.onFilterChange(e, 'toDate')}
          dateFormat="d/M yyyy"
          selectsEnd
          startDate={props.filters.fromDate}
          endDate={props.filters.toDate}
          isClearable={true}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <label>From time:</label>{' '}
        <DatePicker
          selected={props.filters.fromTime}
          onChange={e => props.onFilterChange(e, 'fromTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          timeCaption="Time"
          isClearable={true}
        />
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <label>To time:</label>{' '}
        <DatePicker
          selected={props.filters.toTime}
          onChange={e => props.onFilterChange(e, 'toTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          timeCaption="Time"
          isClearable={true}
        />
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={props.onHandleFiltering}
      >
        Filter meals
      </button>
    </div>
  );
};

export default MealFilters;
