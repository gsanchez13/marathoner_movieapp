import React, { Component } from 'react';

class ShowsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 1,
            //get userId from the parameters in order to display specific users shows
        }
    }
    render() {
        return(
            <div>
                <h1> Users shows!</h1>
            </div>
        )
    }
}
export default ShowsProfile;


//A specific show's profile page for a specific user. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page.