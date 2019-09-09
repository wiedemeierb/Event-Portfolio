import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateEvent extends Component {
  state = {
    eventName: '',
    location: '',
    date: '',
    time: '',
    description: '',
  };

  createEvent = (event) => {
    event.preventDefault();

    if (this.state.eventName && this.state.location && this.state.date && this.state.time && this.state.description) {
      this.props.dispatch({
        type: 'CREATE_EVENT',
        payload: {
          eventName: this.state.eventName,
          location: this.state.location,
          date: this.state.date,
          time: this.state.time,
          description: this.state.description,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createEvent}>
          <h1>Create A New Event!</h1>
          <div>
            <label htmlFor="eventName">
              Event Name:
              <input
                type="text"
                name="eventName"
                placeholder='Add a short, clear name'
                value={this.state.eventName}
                onChange={this.handleInputChangeFor('eventName')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="location">
              Location:
                <input
                type="text"
                name="location"
                placeholder='Add full address'
                value={this.state.location}
                onChange={this.handleInputChangeFor('location')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Date:
                <input
                type="date"
                name="date"
                placeholder='Date'
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="name">
              Time:
              <input
                type="time"
                name="time"
                placeholder='Time'
                value={this.state.time}
                onChange={this.handleInputChangeFor('time')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description:
                <input
                type="text"
                name="location"
                placeholder='Add brief description of event'
                value={this.state.description}
                onChange={this.handleInputChangeFor('description')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Create Event"
            />
          </div>
        </form>
        <center>
       
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateEvent);
