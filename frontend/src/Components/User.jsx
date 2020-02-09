import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            username: "",
            avatar_url: "",
            showsWatching: [],
        }
    }
    componentDidMount = () => {
        let idByParams = this.props.match.params.id;
        this.getUserInfo(idByParams)
    }
    getUserInfo = async (id) => {
        try {
            let userInfo = await axios.get(`http://localhost:3100/users/${id}`).then((res) => res.data.payload);
            this.setState({
                user_id: id,
                username: userInfo.username,
                avatar_url: userInfo.avatar_url,
            })
        }
        catch(err){
            throw err
        }
    }
    render() {
        const { username, avatar_url } = this.state;
        let userCard = (username, avatar_url) => {
            return(
                <div>
                    <img src={avatar_url} alt={username} className="user-avatar"/>
                    <h3>{username}'s Profile</h3>
                </div>
            )
        }
        return(
            <div>
                {userCard(username, avatar_url)}
            </div>
        )
    }
}
export default User;

// User profile page. Shows all the shows the user is watching. Must show the image, title, genre. Should be able to click on the show and take you to the show page.