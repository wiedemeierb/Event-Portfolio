import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { actionChannel } from 'redux-saga/effects';

class EventPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALLUSERS'})
        this.props.dispatch({
            type: 'FETCH_EVENT',
            payload: this.props.match.params.id})
        this.props.dispatch({
            type: 'FETCH_ALLEVENTUSERS',
            payload: this.props.match.params.id
            // payload: {id: Number(this.props.match.params.id)}
        })
        this.props.dispatch({ 
            type: 'FETCH_ITEMS',
            payload: {id: Number(this.props.match.params.id)}})
    };

    state = {
        added_item: '',
        cost: '',
        event_id: this.props.match.params.id,
    };

    handleChangeItem = (event) => {
        // console.log(event.target.value)
        this.setState({
            added_item: event.target.value
        })
    }

    handleChangeCost = (event) => {
        // console.log(event.target.value)
        this.setState({
            cost: event.target.value
        })
    }

    handleClickAddItem = (event) => {
        event.preventDefault();
        // console.log('handleClickAddItem operational:', this.state)
        //ALERT USER TO FILL OUT BOTH INPUT FIELDS
        if (this.state.added_item === '' || this.state.cost === '') {
            alert('PLEASE FILL OUT BOTH ITEM AND COST');
            return;
        }
        this.props.dispatch({
            type: 'ADD_ITEM',
            payload: this.state,
        })
    }

    
    handleDeleteItem(id) {
        // confirm("Are You Sure?")
        
        this.props.dispatch({ type: 'DELETE_ITEM', payload: { id: id, eventId: this.state.event_id}})
    }

    render(){
        // console.log('this is state right now', this.props)
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
                <td><button><a href={`http://venmo.com/${attendee.payment_username}`}>Click To Pay</a></button></td>
                    </tr>)
        })

        let itemTable = this.props.items.map((item) => {
            return (<tr key={item.id}>
                <td>{item.item}</td>
                <td>{item.cost}</td>
                {/* <td>USER NAME EVENTUALLY HERE</td> */}
                <td><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteItem(item.id) }}>Delete</button></td>
            </tr>)
        })

        return(
        <div>
            <h1>Welcome!</h1>
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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </table>
            <input onChange={this.handleChangeItem} type='text' placeholder="New Item" />
            <input onChange={this.handleChangeCost} type='text' placeholder="Cost" />
            <button onClick={this.handleClickAddItem}>Add New Item</button>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userEvent: state.userEvent,
    allUsers: state.allUsers,
    event: state.event,
    items: state.items

});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EventPage);