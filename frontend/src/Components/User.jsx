import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    getUserInfo = async (userId) => {
        try {
            let userInfo = await axios.get(`http://localhost:3100/users/${userId}`).then((res) => res.data.payload);
            return userInfo;
        }
        catch (err) {
            throw err
        }
    }
    getShowInfoByUserId = async (userId) => {
        try {
            let showInfo = await axios.get(`http://localhost:3100/shows/user/${userId}`).then((res) => res.data.payload);
            return showInfo;
        }
        catch (err) {
            throw err
        }
    }
    setNewInfo = async (id) => {
        let userInfo = await this.getUserInfo(id);
        let usersShows = await this.getShowInfoByUserId(id);
        this.setState({
            user_id: id,
            username: userInfo.username,
            avatar_url: userInfo.avatar_url,
            showsWatching: usersShows,
        })
    }
    render() {
        const { user_id, username, avatar_url, showsWatching } = this.state;
        let showsDivs = showsWatching.map((showObj) => {
            return (
                <div key={showObj.title} className="show-divs">
                    <Link to={`/shows/${showObj.shows_id}/user/${user_id}`}>
                        <img src={showObj.img_url} alt={showObj.title} className="show-avatar" key={showObj.title} />
                        <p>{showObj.title}</p>
                    </Link>
                    <h4 key={showObj.show_id}>Genre: {showObj.genre_name}</h4>
                </div>
            )
        });
        let userCard = (username, avatar_url, shows) => {
            return (
                <div className="show-card">
                    <img src={avatar_url} alt={username} className="user-avatar" />
                    <h3>{username}'s Profile</h3>
                    <h2>Watching: </h2>
                    <div>
                        {shows}
                    </div>
                </div>

            )
        }
        return (
            <div className="show-container">
                {userCard(username, avatar_url, showsDivs)}
            </div>
        )
    }
}
export default User;

// User profile page. Shows all the shows the user is watching. Must show the image, title, genre. Should be able to click on the show and take you to the show page.