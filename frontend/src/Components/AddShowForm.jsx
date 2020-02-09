import React, { Component } from 'react';

class AddShowForm extends Component {
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
                <h1> Add a new show below!</h1>
            </div>
        )
    }
}
export default AddShowForm;




// Shows a form where the logged in user can add a new show. Should be able to submit to the Database. These changes are reflected app wide. Selecting the genre is a drop down. This data should be reflecting the genres in the database.