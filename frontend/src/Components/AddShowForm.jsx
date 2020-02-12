import React, { Component } from 'react';
import axios from 'axios';

class AddShowForm extends Component {
    constructor(props) {
        super();
        this.state = {
            user_id: props.match.params.id,
            options: []
        }
    }
    componentDidMount = () => {
        this.getAllGenres();
    }
    getAllGenres = async () => {
        try {
            let allGenres = await axios.get(`http://localhost:3100/genres/`).then((res) => res.data.payload);

            this.setState({
                options: allGenres
            })
            return allGenres;
        }
        catch(err){
            throw err
        }
    }
    render() {
        const { options } = this.state;
        console.log(options)
        let allOptions = options.map((op) => {
            return (
                <option value={op.genre_name} >{op.genre_name}</option>
            )
        })
        return(
            <div>
                <form onSubmit={this.handleNewShow}>
                    <select>
                        {allOptions}
                    </select>
                </form>
            </div>
        )
    }
}
export default AddShowForm;




// Shows a form where the logged in user can add a new show. Should be able to submit to the Database. These changes are reflected app wide. Selecting the genre is a drop down. This data should be reflecting the genres in the database.