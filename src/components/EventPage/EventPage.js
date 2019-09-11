import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class EventPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USEREVENT' })
    }

    render(){
        let table = this.props.userEvent.map((item) => {
            return (<tr key={item.id}>
                <td>{item.event_name}</td>
                <td>{item.location}</td>
                <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                <td>{item.time}</td>
                <td>{item.description}</td>
                    </tr>)
        })
        // console.log('in event page')
        let attendeeTable = [this.props.user].map((attendee) => {
            return (<tr key={attendee.id}>
                <td>{attendee.name}</td>
                <td>{attendee.username}</td>
                <td><a href={`http://venmo.com/${attendee.payment_username}`}>Click To Pay</a></td>
                {/* <td>{attendee.payment_username}</td> */}
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

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th><a href={"https://venmo.com"}>Venmo</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendeeTable}
                    </tbody>
                </table>
                <button>Add Attendee</button>
            
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
    userEvent: state.userEvent,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EventPage);