import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class EventPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALLUSERS'})
        // this.props.dispatch({ type: 'FETCH_EVENT' })
    }

    render(){
        console.log('this is state right now', this.props)
        let table = this.props.event.map((item) => {
            return (<tr key={item.id}>
                <td>{item.event_name}</td>
                <td>{item.location}</td>
                <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                <td>{item.time}</td>
                <td>{item.description}</td>
                    </tr>)
        })
        
        let attendeeTable = [this.props.user].map((attendee) => {
            return (<tr key={attendee.id}>
                <td>{attendee.name}</td>
                <td>{attendee.username}</td>
                <td><a href={`http://venmo.com/${attendee.payment_username}`}>Click To Pay</a></td>
                    </tr>)
        })

        return(
        <div>
            <h1>Welcome to:</h1>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>

                <h1>Attendees:</h1>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th><a href={"https://venmo.com"}>Sign Up For Venmo</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendeeTable}
                    </tbody>
                </table>
                
                <select>
                    {this.props.allUsers.map(allAttendees => {
                            return (
                                <option value={allAttendees.id} key={allAttendees.id}>{allAttendees.name}</option>
                            )})}
                </select>
                <button>Add Attendee</button>
                
            <h1>Items Needed:</h1>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Items Needed</th>
                        <th>Cost</th>
                        <th>User Added Method</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Here we will put our .map information */}
                </tbody>
            </table>
            <input placeholder="New Item" />
            <input placeholder="Cost" />
            <button>Add New Item</button>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    // userEvent: state.userEvent,
    allUsers: state.allUsers,
    event: state.event
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EventPage);