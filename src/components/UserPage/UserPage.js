import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button'

class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_USER' })
    this.props.dispatch({ type: 'FETCH_USEREVENTS' })
    this.props.dispatch({ type: 'FETCH_USER_ATTENDING_EVENTS',
                          payload: this.props.user.id})
  }

  handleDelete(id, user_id){
    // console.log(id);
    // console.log(user_id);
    this.props.dispatch({
      type: 'DELETE_EVENT', 
      payload: {id: id, userId: user_id }
    })
  }

  handleClick = (id) => {
    // console.log('handleClick operational:')
    // MOVES USER TO VIEW EVENT
    this.props.dispatch({
      type: 'FETCH_EVENT',
      payload: id
    })
    // console.log('get dispatch of event page')
    this.props.history.push(`/eventpage/${id}`);
  }

  handleEditClick = (id) => {
    //MOVES USER TO /EDIT ON CLICK
    // console.log('in edit click');
    this.props.history.push('/edit')
  } 

  render(){
    // console.log('this is state right now', this.props)
    let userAttendingEventsTable = this.props.userAttendingEvents.map((events) => {
      return (<tr key={events.event_id}>
                <td>{events.event_name}</td>
                <td>{events.location}</td>
                <td><Moment format="MM/DD/YYYY">{events.date}</Moment></td>
                <td>{events.time}</td>
                <td><Button variant="success" onClick={() => this.handleClick(events.event_id)}>View Event</Button></td>

              </tr>)
    })
    let table = this.props.userEvents.map((item) => {
      return (<tr key={item.id}>
                  <td>{item.event_name}</td>
                  <td>{item.location}</td>
                  <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                  <td>{item.time}</td>
                  <td><Button variant="primary" onClick={()=>this.handleClick(item.id)}>View Event</Button></td>
                  <td><Button variant="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this event?')) 
                      this.handleDelete(item.id, item.user_id) }}>Delete</Button></td>
              </tr>)
    })

    return (
      <div>
        <div>
          <h2 id="welcome">
            Welcome, {this.props.user.name}!
          </h2>
          <p>Your Username/Email Address is: {this.props.user.username}</p>
          <p>Phone Number is: {this.props.user.phone_number}</p>
          <p>Venmo Username is: {this.props.user.payment_username}</p>
          <Button variant="success" onClick={this.handleEditClick}>Edit User Information</Button>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Organized Events</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>View Event Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {table}
            {userAttendingEventsTable}
          </tbody>
        </table>
        <LogOutButton className="log-in" />
        </div>
        )}};
      
const mapStateToProps = state => ({
        user: state.user,
        userEvents: state.userEvents,
        addEventUser: state.addEventUser,
        userAttendingEvents: state.userAttendingEvents,
      });
      
export default connect(mapStateToProps)(UserPage);
