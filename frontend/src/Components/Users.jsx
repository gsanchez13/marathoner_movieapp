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
        try {
            let allUsers = await axios.get('http://localhost:8080/users/all').then((res) => res.data.payload);
            this.setState({
                users: allUsers,
            })
        }
        catch (err) {
            throw err
        }
    }
    render() {
        const { users } = this.state;
        let userCards = users.map((user) => {
            return (
                <div className="user-card" key={user.id}>
                    <Link to={`/users/${user.id}`}>
                        <img src={user.avatar_url} alt={user.username} className="user-avatar" />
                        <br />
                        <h3>{user.username} </h3>
                    </Link>
                </div>
            )
        })
        return (
            <div className="user-holder">
                <h1> Users: </h1>
                {userCards}
            </div>
        )
    }
}
export default Users;