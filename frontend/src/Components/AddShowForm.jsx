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
        catch (err) {
            throw err
        }
    }
    handleUrlInput = () => {
        console.log("url input changing")
    }
    handleShowInput = () => {
        console.log("show input changing")
    }
    render() {
        const { options } = this.state;
        let allOptions = options.map((op) => {
            return (
                <option key={op.id} value={op.id}>{op.genre_name}</option>
            )
        })
        return (
            <div>
                <form onSubmit={this.handleNewShow} className="new-show-form">
                    <h2> Add Show Form</h2>
                    <p><b>Show Image URL:</b></p>
                    <input type="text" placeholder="Image URL" onChange={this.handleUrlInput}></input><br />
                    <p><b>Show Name:</b></p>
                    <input type="text" placeholder="Show Name" onChange={this.handleShowInput}></input>
                    <br /><br />
                    <select className="select-genres">
                        {allOptions}
                    </select>
                    <br/><br/>
                    <button type="submit" onSubmit={this.handleShowInput}>Submit</button>
                </form>
            </div>
        )
    }
}
export default AddShowForm;




// Shows a form where the logged in user can add a new show. Should be able to submit to the Database. These changes are reflected app wide. Selecting the genre is a drop down. This data should be reflecting the genres in the database.