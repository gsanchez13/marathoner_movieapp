import React, { Component } from 'react';
import axios from 'axios';

class ShowsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 1
        }
    }
    componentDidMount = () => {
        let showIdByParams = this.props.match.params.id;
        // let userIdByParams = this.props.match.params.userId;
        this.getShowInfo(showIdByParams)
    }
    getShowInfo = async (id) => {
        try {
            let showObj = await axios.get(`http://localhost:3100/shows/${id}`).then((res) => res.data.payload);
            console.log('hiiii', showObj)
        }
        catch (err) {
            throw err
        }
    }
    render() {
        return (
            <div>
                <h1> Users shows!</h1>
            </div>
        )
    }
}
export default ShowsProfile;


//A specific show's profile page for a specific user. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page.