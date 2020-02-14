import React, { Component } from 'react';
import axios from 'axios';

class Shows extends Component {
    constructor() {
        super();
        this.state = {
            shows: []
        }
    }
    componentDidMount = () => {
        this.getShows();
    }
    getShows = async (showId) => {
        try{
            let allShowInfo = await axios.get(`http://localhost:3100/shows/newShowsRoute/${showId}`).then((res) => res.data.payload);

            return allShowInfo;
        }
        catch(err){
            throw err
        }
    }
    filterShows = (showsInfo) => {
    }
    render() {
        return(
            <div className="all-shows-container">
                <h1>Shows</h1>
            </div>
        )
    }
}

export default Shows;

//Masterlist of all the shows. **Don't repeat the same show twice.** For each show list all the users who are watching. Clicking on the name of the user takes you to that specific users' show profile page. We are assuming that the name of the show has to match exactly to be considered the same show.