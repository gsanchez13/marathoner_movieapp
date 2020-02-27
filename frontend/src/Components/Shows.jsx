import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Shows extends Component {
    constructor() {
        super();
        this.state = {
            shows: []
        }
    }
    componentDidMount = () => {
        this.setStateInfo();
    }
    getShows = async () => {
        try {
            let allShowInfo = await axios.get(`http://localhost:8080/shows/findShowInfo/`).then((res) => res.data.payload);
            return allShowInfo;
        }
        catch (err) {
            throw err
        }
    }
    setStateInfo = async () => {
        let showInfo = await this.getShows();
        this.setState({
            shows: showInfo
        })
    }
    render() {
        const { shows } = this.state;
        let usersWatching = (individualShow) => {
            let viewersArr = individualShow.viewers
            return viewersArr.map((user) => {
                return (
                        <Link to={`users/${user.user_id}`}>
                            <h6>{user.username}</h6>
                            <img src={user.avatar_url} alt={user.username} className="user-avatar"/>
                        </Link>
                )
            })
        }
        let allShows = shows.map((show) => {
            return (
                <div key={show.title} className="individual-show-div">
                    < Link to={`/shows/${show.shows_id}/user/1`} >
                        <h3>{show.title}</h3>
                        <img src={show.img_url} className="shows-show-avatar" alt={show.title}></img>
                    </Link>
                    <h4 className="viewers-tag">Viewers:</h4>
                    <div className="users-watching">
                    {usersWatching(show)}
                    </div>
                </div>
            )
        })
        return (
            <div className="all-shows-container">
                <h1>Shows</h1>
                {allShows}
            </div>
        )
    }
}

export default Shows;

//Masterlist of all the shows. **Don't repeat the same show twice.** For each show list all the users who are watching. Clicking on the name of the user takes you to that specific users' show profile page. We are assuming that the name of the show has to match exactly to be considered the same show.