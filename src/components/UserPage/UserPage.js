import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Moment from 'react-moment';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_USEREVENTS' })
  }

  handleDelete(id, user_id){
    // console.log(id);
    // console.log(user_id);
    alert('Are You Sure?')
    this.props.dispatch({ type: 'DELETE_EVENT', payload: {id: id, userId: user_id } })
  }

  handleClick = (id) => {
    // console.log('handleClick operational:')
    this.props.dispatch({
      type: 'FETCH_EVENT',
      payload: id
    })
    // console.log('get dispatch of event page')
    this.props.history.push(`/eventpage/${id}`);
    
  }

  render(){
    // console.log('this is state right now', this.props)
    let table = this.props.userEvents.map((item) => {
      return (<tr key={item.id}><td>{item.event_name}</td>
                  <td>{item.location}</td>
                  <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                  <td>{item.time}</td>
                  <td><button onClick={()=>this.handleClick(item.id)}>View Event</button></td>
                  <td><button onClick={() => this.handleDelete(item.id, item.user_id)}>Delete</button></td>
              </tr>)
    })
    return (
      <div>
        <div>
          <h1 id="welcome">
            Welcome, {this.props.user.name}!
          </h1>
          <p>Your Username/Email Address is: {this.props.user.username}</p>
          <p>Phone Number is: {this.props.user.phone_number}</p>
          <p>Venmo Username is: {this.props.user.payment_username}</p>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
        <LogOutButton className="log-in" />
        </div>
        )
      }
    };
      
      
      // Instead of taking everything from state, we just want the user info.
      // if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapStateToProps = state => ({
        user: state.user,
        userEvents: state.userEvents,
      });
      
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
