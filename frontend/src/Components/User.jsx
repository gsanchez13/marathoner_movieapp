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
        catch (err) {
            throw err
        }
    }
    getMovieInfoById = async (id) => {
        try {
            let movieInfo = await axios.get(`http://localhost:3100/shows/user/${id}`).then((res) => res.data.payload);
            return movieInfo;
        }
        catch (err) {
            throw err
        }
    }
    setNewInfo = async (id) => {
        let userInfo = await this.getUserInfo(id);
        let usersShows = await this.getMovieInfoById(id);
        this.setState({
            user_id: id,
            username: userInfo.username,
            avatar_url: userInfo.avatar_url,
            showsWatching: usersShows
        })
    }
    render() {
        const { username, avatar_url, showsWatching } = this.state;
        let showsDivs = showsWatching.map((showObj) => {
            return (
                <div key={showObj.id} className="show-divs">
                    <img src={showObj.img_url} alt={showObj.title} className="show-avatar"/>
                    <p>{showObj.title}</p>
                    <p>{showObj.genre_name}</p>
                </div>
            )
        })
        let userCard = (username, avatar_url, shows) => {
            return (
                <div className="show-container">
                    <div className="show-card">
                        <img src={avatar_url} alt={username} className="user-avatar" />
                        <h3>{username}'s Profile</h3>
                    </div>
                    <h2>Watching: </h2>
                    <div className>
                        {shows}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {userCard(username, avatar_url, showsDivs)}
            </div>
        )
    }
}
export default User;

// User profile page. Shows all the shows the user is watching. Must show the image, title, genre. Should be able to click on the show and take you to the show page.