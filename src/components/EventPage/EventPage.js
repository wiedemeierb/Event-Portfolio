import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventPage extends Component {
    render(){
        console.log('in event page')
        return(
        <h1>EVENT PAGE</h1>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userEvent: state.userEvent,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EventPage);