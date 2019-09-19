import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
// import Button from 'react-bootstrap/Button'

class CreateEvent extends Component {
  state = {
    event_name: '',
    location: '',
    date: '',
    time: '',
    description: '',
  };

  createEvent = (event) => {
    event.preventDefault();

    if (this.state.event_name === '' || this.state.location === '' || this.state.date === '' || this.state.time === '' || this.state.description === '') {
      alert('PLEASE FILL OUT ALL FIELDS');
      return;
    } 
      this.props.dispatch({
        type: 'CREATE_EVENT',
        payload: {
          event_name: this.state.event_name,
          location: this.state.location,
          date: this.state.date,
          time: this.state.time,
          description: this.state.description,
        }
      });
      this.props.history.push('/home')
  }
  
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <Router>
      <div>
        <form onSubmit={this.createEvent}>
          <h1>Create A New Event!</h1>
          <div>
            <label htmlFor="event_name">
              Event Name:
              <input
                type="text"
                name="event_name"
                placeholder='Add a short, clear name'
                value={this.state.event_name}
                onChange={this.handleInputChangeFor('event_name')}
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
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateEvent);
