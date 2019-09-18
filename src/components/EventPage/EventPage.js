import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class EventPage extends Component {

    componentDidMount() {
        this.props.dispatch({ 
            type: 'FETCH_ALLUSERS'})
        this.props.dispatch({
            type: 'FETCH_EVENT',
            payload: this.props.match.params.id})
        this.props.dispatch({
            type: 'FETCH_ALLEVENTUSERS',
            payload: this.props.match.params.id
        })
        this.props.dispatch({ 
            type: 'FETCH_ITEMS',
            payload: {id: Number(this.props.match.params.id)}})
    };

    state = {
        added_item: '',
        cost: '',
        event_id: this.props.match.params.id,
        user_id: '',
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
        this.setState({
            added_item: '',
            cost: ''
        })
    }

    handleClickAddUser = () =>{
        // console.log('handleClickAddUser operational', this.state.value )
        this.props.dispatch({
            type: 'ADD_EVENTUSER',
            payload: this.state
        })
    }

    handleChangeAddUser = (event) => {
        this.setState({
            user_id: event.target.value
        })
    }

    handleDeleteItem(id) {
        this.props.dispatch({ type: 'DELETE_ITEM', payload: { id: id, eventId: this.state.event_id}})
    }

    render(){
        // console.log('this is state right now', this.state)
        let eventTable = this.props.event.map((item) => {
            return (<tr key={item.id}>
                <td>{item.event_name}</td>
                <td>{item.location}</td>
                <td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
                <td>{item.time}</td>
                <td>{item.description}</td>
                    </tr>)
        })
        //FILTER TO GET ORGANIZER AND RENDER
        let result = this.props.event[0] && (this.props.allUsers.filter((eventCoordinator) => {return eventCoordinator.id === this.props.event[0].user_id}))
        let organizer = {}
        if (result && result[0]){
            organizer = result[0]
        }

        // console.log('this is state right now addEventUser', this.props.addEventUser)
        let totalAttendees = this.props.addEventUser.length+1
        let allAttendeeTable = this.props.addEventUser.map((allAttendee) => {
            return (<tr key={allAttendee.name}>
                <td>{allAttendee.name}</td>
                <td>{allAttendee.username}</td>
                <td><button><a href={`http://venmo.com/${allAttendee.payment_username}`}>Click To Pay</a></button></td>
            </tr>)
        })
        // console.log('this is total attendees:', totalAttendees)
        let totalCost = 0;
        let itemTable = this.props.items.map((item) => {
            totalCost += item.cost
            return (<tr key={item.id}>
                <td>{item.item}</td>
                <td>${item.cost}</td>
                {/* <td>USER NAME EVENTUALLY HERE</td> */}
                <td><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteItem(item.id) }}>Delete</button></td>
            </tr>);
        })
        // console.log('here is the total cost', totalCost)
        let average = totalCost/totalAttendees
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
                    {eventTable}
                </tbody>
            </table>
                <h2>Organizer:</h2>
            <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Venmo Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{organizer.name}</td>
                            <td>{organizer.username}</td>
                            <td>{organizer.phone_number}</td>
                            <td><button><a href={`http://venmo.com/${organizer.payment_username}`}>Click To Pay</a></button></td>
                        </tr>
                </tbody>
            </table>
                <h2>Attendees:</h2>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th><a href={"https://venmo.com"}>Sign Up For Venmo</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAttendeeTable}
                    </tbody>
                </table>
                <select defaultValue={'DEFAULT'} value={this.state.value} onChange={this.handleChangeAddUser}>
                    <option disabled value="DEFAULT">Choose An Attendee</option>
                    {this.props.allUsers.map(allAttendees => {
                        return (
                            <option value={allAttendees.id} key={allAttendees.id}>{allAttendees.name}</option>
                        )})}
                </select>
                <button onClick={() => this.handleClickAddUser()}>Add Attendee</button>
       
                <h2>Items Needed:</h2>
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
            <input value={this.state.added_item} onChange={this.handleChangeItem} type='text' placeholder="New Item" />
            <input value={this.state.cost} onChange={this.handleChangeCost} type='text' placeholder="Cost" />
            <button onClick={this.handleClickAddItem}>Add New Item</button>
            <h2>Average Owed</h2>
            <h3>${average}</h3>
        </div>
        )}}

const mapStateToProps = state => ({
    user: state.user,
    userEvent: state.userEvent,
    allUsers: state.allUsers,
    event: state.event,
    items: state.items,
    addEventUser: state.addEventUser,
});

export default connect(mapStateToProps)(EventPage);