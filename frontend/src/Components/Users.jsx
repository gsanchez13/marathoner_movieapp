import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        }
    }
    componentDidMount = async () => {
        let allUsers = await axios.get('http://localhost:3100/users/').then((res) => res.data.payload);
        this.setState({
            users: allUsers,
        })
    }
    render() {
        const { users } = this.state;
        let userCards = users.map((user) => {
            return (
                <div className="user-card" key={user.id}>
                    <Link to={`/users/${user.id}`}>
                        <img src={user.avatar_url} alt={user.username}className="user-avatar" />
                        <br />
                        <h3>{user.username} </h3>
                    </Link>
                </div>
            )
        })
        return (
            <div className="user-holder">
                {userCards}
            </div>
        )
    }
}
export default Users;