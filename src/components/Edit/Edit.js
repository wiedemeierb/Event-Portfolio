import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class Edit extends Component {
    state = {
        username: '',
        name: '',
        phone_number: '',
        payment_username: '',
        id: 0,
    };

    componentDidMount(){
        this.setState({
            id: this.props.user.id
        })
    }
    handleEmailChange = (event) => {
        // console.log(this.state.username);
        this.setState({
            username: event.target.value
        })
    }

    handleNameChange = (event) => {
        // console.log(this.state.name);
        this.setState({
            name: event.target.value
        })
    }

    handlePhoneChange = (event) => {
        // console.log(this.state.phone_number);
        this.setState({
            phone_number: event.target.value
        })
    }

    handleVenmoChange = (event) => {
        // console.log(this.state.payment_username);
        this.setState({
            payment_username: event.target.value
        })
    }

    handleCancelEdit = (id) => {
        //MOVES USER TO /EDIT ON CLICK
        // console.log('in edit click');
        this.props.history.push('/home')
    } 

    editUserInformation = (event) => {
        event.preventDefault();
        // if (this.state.username === '' || this.state.name === '' || this.state.phone_number === '' || this.state.payment_username){
        //     alert('PLEASE EDIT OR REFILL ALL EDIT FIELDS');
        //     return;
        // }
        this.props.dispatch({
            type: 'EDIT_USERINFO',
            payload: this.state
        })
        this.props.history.push('/home')
    }

    render(){
        console.log(this.state)
        
        return(
        <div>
        <div>
          <h1 id="welcome">
            {this.props.user.name}!
          </h1>
            <p>Your Username/Email Address is: {this.props.user.username}</p>
            <p>Phone Number is: {this.props.user.phone_number}</p>
            <p>Venmo Username is: {this.props.user.payment_username}</p>
          <button onClick={this.handleCancelEdit}>Cancel Edits</button>
        </div>
        <form onSubmit={this.editUserInformation}>
        <div>
            <p>Edit Email Address:</p>
            <input onChange={this.handleEmailChange} />
            <p>Edit Name:</p>
            <input onChange={this.handleNameChange} />
            <p>Edit Phone Number:</p>
            <input onChange={this.handlePhoneChange} />
            <p>Edit Venmo Username:</p>
            <input onChange={this.handleVenmoChange} />
            <button>Submit Edits</button>
        </div>
        </form>
        </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.user,
    userEvent: state.userEvent,
    allUsers: state.allUsers,
    event: state.event,
    items: state.items,
    addEventUser: state.addEventUser,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Edit);