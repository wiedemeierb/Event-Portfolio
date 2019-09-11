import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class EventPage extends Component {
    render(){
        let table = this.props.userEvent.map((item) => {
            return (<tr key={item.id}><td>{item.event_name}</td>
                <td>{item.location}</td>
                <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                <td>{item.time}</td>
            </tr>)
        })
        console.log('in event page')
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
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
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