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
        <div>
          <h1 id="welcome">
            {this.props.user.name}!
          </h1>
            <p>Your Username/Email Address is: {this.props.user.username}</p>
            <p>Phone Number is: {this.props.user.phone_number}</p>
            <p>Venmo Username is: {this.props.user.payment_username}</p>
            <Button variant="danger" onClick={this.handleCancelEdit}>Cancel Edits</Button>
        </div>
        <form>
        <div>
            <p>Edit Email Address:</p>
            <input onChange={this.handleEmailChange} placeholder={this.props.user.username}/>
            <p>Edit Name:</p>
            <input onChange={this.handleNameChange} placeholder={this.props.user.name}/>
            <p>Edit Phone Number:</p>
            <input onChange={this.handlePhoneChange} placeholder={this.props.user.phone_number}/>
            <p>Edit Venmo Username:</p>
            <input onChange={this.handleVenmoChange} placeholder={this.props.user.payment_username}/>
            {/* <button onClick={() => { if (window.confirm('Are you sure you wish to edit your User information')) this.editUserInformation()}}>Submit Edits</button> */}
            <p></p>
            <Button variant="success" onClick={() => { if (window.confirm('Are you sure you wish to edit your User information')) this.editUserInformation() }}>Submit Edits</Button>
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