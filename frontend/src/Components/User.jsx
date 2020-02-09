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
        this.setNewInfo(idByParams)
    }
    getUserInfo = async (id) => {
        try {
            let userInfo = await axios.get(`http://localhost:3100/users/${id}`).then((res) => res.data.payload);
            return userInfo;
        }
        catch(err){
            throw err
        }
    }
    getUsersShows = async (id) => {
        try{
            let usersShows = await axios.get(`http://localhost:3100/shows/user/${id}`).then((res) => res.data.payload);
            return usersShows;
        }
        catch(err){
            throw(err)
        }
    }
    setNewInfo = async (id) => {
        let userInfo = await this.getUserInfo(id);
        let usersShows = await this.getUsersShows(id);
        this.setState({
            user_id: id,
            username: userInfo.username,
            avatar_url: userInfo.avatar_url,
            showsWatching: usersShows
        })
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