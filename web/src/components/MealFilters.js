import React, { Component } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class MealFilters extends Component {
  render() {
    return (
      <>
        <div>
          From date{' '}
          <DatePicker
            selected={this.props.filters.fromDate}
            onChange={e => this.props.onFilterChange(e, 'fromDate')}
            dateFormat="d/M yyyy"
            selectsStart
            startDate={this.props.filters.fromDate}
            endDate={this.props.filters.toDate}
            isClearable={true}
          />
        </div>
        <div>
          To date{' '}
          <DatePicker
            selected={this.props.filters.toDate}
            onChange={e => this.props.onFilterChange(e, 'toDate')}
            dateFormat="d/M yyyy"
            selectsEnd
            startDate={this.props.filters.fromDate}
            endDate={this.props.filters.toDate}
            isClearable={true}
          />
        </div>
        <div>
          From time{' '}
          <DatePicker
            selected={this.props.filters.fromTime}
            onChange={e => this.props.onFilterChange(e, 'fromTime')}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            timeCaption="Time"
            isClearable={true}
          />
        </div>
        <div>
          To time{' '}
          <DatePicker
            selected={this.props.filters.toTime}
            onChange={e => this.props.onFilterChange(e, 'toTime')}
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
          className="btn btn-primary"
          onClick={this.props.onHandleFiltering}
        >
          Filter meals
        </button>
      </>
    );
  }
}

export default MealFilters;
