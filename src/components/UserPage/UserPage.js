import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {
render () {
  return(
    <div>
      <h1 id="welcome">
        Welcome, {this.props.user.name}!
    </h1>
      <p>Your Username and Email Address is: {this.props.user.username}</p>
      <p>Your Phone Number is: {this.props.user.phone_number}</p>
      <p>Your Venmo Username is: {this.props.user.payment_username}</p>

      <LogOutButton className="log-in" />
    </div>
  )
}}

// class FavouriteTeam extends Component {
//   state = {
//     teams: [],
//     selectedTeam: "",
//     validationError: ""
//   }

//   componentDidMount() {
//     fetch("http://localhost:26854/api/premiershipteams")
//       .then((response) => {
//         return response.json();
//       })
//       .then(data => {
//         let teamsFromApi = data.map(team => { return { value: team, display: team } })
//         this.setState({ teams: [{ value: '', display: '(Select your favourite team)' }].concat(teamsFromApi) });
//       }).catch(error => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <div>
//         <select value={this.state.selectedTeam}
//           onChange={(e) => this.setState({ selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : "" })}>
//           {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
//         </select>
//         <div style={{ color: 'red', marginTop: '5px' }}>
//           {this.state.validationError}
//         </div>
//       </div>
//     )
//   }
// }

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
