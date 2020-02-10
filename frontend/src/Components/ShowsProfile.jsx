import React, { Component } from 'react';
import axios from 'axios';

class ShowsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: ""
        }
    }
    componentDidMount = () => {
        let showIdByParams = this.props.match.params.id;
        let userIdByParams = this.props.match.params.userId;
        this.setShowInfo(userIdByParams, showIdByParams)
    }
    getShowInfo = async (id) => {
        try {
            let showObj = await axios.get(`http://localhost:3100/shows/${id}`).then((res) => res.data.payload);
            return showObj;
        }
        catch (err) {
            throw err
        }
    }
    setShowInfo = async (user_id, showId) => {
        let showObj = await this.getShowInfo(showId);
        this.setState({
            userId: user_id,
            userName: showObj.username,
            userAvatar: showObj.avatar_url,
            showTitle: showObj.title,
            showAvatar: showObj.img_url,
            genreName: showObj.genre_name,
        })
    }
    render() {
        const { userName, showTitle } = this.state;
        return (
            <div>
                <h1> {userName}'s show: {showTitle}</h1>
            </div>
        )
    }
}
export default ShowsProfile;


//A specific show's profile page for a specific user. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page.