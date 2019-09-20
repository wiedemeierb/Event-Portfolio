import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'


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
        if (this.state.username === '' || this.state.name === '' || this.state.phone_number === '' || this.state.payment_username === ''){
            alert('PLEASE EDIT OR REFILL ALL EDIT FIELDS');
            return;
        }
        this.props.dispatch({
            type: 'EDIT_USERINFO',
            payload: this.state
        })
        this.props.history.push('/home')
    }

    render(){
        // console.log(this.state)
        return(
        <div>
        <div className="userName">
        <h1 className="userName">{this.props.user.name}</h1>
        <p>Username/Email Address: {this.props.user.username}</p>
        <p>Phone Number: {this.props.user.phone_number}</p>
        <p>Venmo Username: {this.props.user.payment_username}</p>
        <p><Button variant="danger" onClick={this.handleCancelEdit}>Cancel Edits</Button></p>
        </div>
        <form>
        <div className="userName">
            <p>Edit Email Address:
            <input onChange={this.handleEmailChange} placeholder={this.props.user.username} /></p>
            <p>Edit Name:
            <input onChange={this.handleNameChange} placeholder={this.props.user.name} /></p>
            <p>Edit Phone Number:
            <input onChange={this.handlePhoneChange} placeholder={this.props.user.phone_number} /></p>
            <p>Edit Venmo Username:
            <input onChange={this.handleVenmoChange} placeholder={this.props.user.payment_username} /></p>
            <p><Button variant="success" onClick={() => { if (window.confirm('Are you sure you wish to edit your User information')) this.editUserInformation() }}>Submit Edits</Button></p>
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

export default connect(mapStateToProps)(Edit);